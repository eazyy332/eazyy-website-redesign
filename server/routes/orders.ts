import type { Request, Response } from "express";
import { supabaseAdmin } from "../lib/supabase";
import { createClient } from "@supabase/supabase-js";

// Helper to get user from Authorization header
async function getUserFromRequest(req: Request) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  
  const token = authHeader.substring(7);
  
  // Use anon client to verify user token
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  
  const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);
  const { data: { user }, error } = await supabaseAnon.auth.getUser(token);
  
  if (error || !user) {
    return null;
  }
  
  return user;
}

type OrderItemInput = {
  id: string; // item id from catalog
  name: string;
  price: number;
  quantity: number;
  serviceCategory: string;
};

export async function createOrder(req: Request, res: Response) {
  try {
    // Verify user is authenticated
    const user = await getUserFromRequest(req);
    if (!user) {
      return res.status(401).json({ ok: false, error: "Authentication required" });
    }

    const {
      selectedServices,
      totalPrice,
      schedule,
      address,
      paymentMethod,
    }: {
      selectedServices: OrderItemInput[];
      totalPrice: number;
      schedule?: any;
      address?: any;
      paymentMethod?: { id: string; name: string } | null;
    } = req.body ?? {};

    if (!Array.isArray(selectedServices) || selectedServices.length === 0) {
      return res.status(400).json({ ok: false, error: "No items provided" });
    }

    // Insert order
    const { data: order, error: orderErr } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: user.id,
        status: "confirmed",
        total_amount: totalPrice ?? 0,
        schedule,
        address,
        payment_method: paymentMethod?.id ?? null,
        payment_method_label: paymentMethod?.name ?? null,
        contact_first_name: user.user_metadata?.first_name ?? null,
        contact_last_name: user.user_metadata?.last_name ?? null,
        contact_email: user.email ?? null,
        contact_phone: user.user_metadata?.phone ?? null,
      })
      .select("id")
      .single();

    if (orderErr || !order) {
      return res.status(500).json({ ok: false, error: orderErr?.message || "Failed to create order" });
    }

    const orderId = order.id as string;

    // Insert items
    const itemsPayload = selectedServices.map((s) => ({
      order_id: orderId,
      item_id: s.id,
      name: s.name,
      service_category: s.serviceCategory,
      unit_price: s.price,
      quantity: s.quantity,
      line_total: s.price * s.quantity,
    }));

    const { error: itemsErr } = await supabaseAdmin
      .from("order_items")
      .insert(itemsPayload);

    if (itemsErr) {
      return res.status(500).json({ ok: false, error: itemsErr.message });
    }

    return res.json({ ok: true, orderId });
  } catch (e: any) {
    return res.status(500).json({ ok: false, error: e?.message || "Unexpected error" });
  }
}


