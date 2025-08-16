import type { Request, Response } from "express";
import { supabaseAdmin } from "../lib/supabase";

type OrderItemInput = {
  id: string; // item id from catalog
  name: string;
  price: number;
  quantity: number;
  serviceCategory: string;
};

export async function createOrder(req: Request, res: Response) {
  try {
    const {
      selectedServices,
      totalPrice,
      schedule,
      address,
      paymentMethod,
      contact,
    }: {
      selectedServices: OrderItemInput[];
      totalPrice: number;
      schedule?: any;
      address?: any;
      paymentMethod?: { id: string; name: string } | null;
      contact?: { firstName?: string; lastName?: string; email?: string; phone?: string };
    } = req.body ?? {};

    if (!Array.isArray(selectedServices) || selectedServices.length === 0) {
      return res.status(400).json({ ok: false, error: "No items provided" });
    }

    // Insert order
    const { data: order, error: orderErr } = await supabaseAdmin
      .from("orders")
      .insert({
        status: "confirmed",
        total_amount: totalPrice ?? 0,
        schedule,
        address,
        payment_method: paymentMethod?.id ?? null,
        payment_method_label: paymentMethod?.name ?? null,
        contact_first_name: contact?.firstName ?? null,
        contact_last_name: contact?.lastName ?? null,
        contact_email: contact?.email ?? null,
        contact_phone: contact?.phone ?? null,
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


