import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleContact } from "./routes/contact";
import { supabaseAdmin } from "./lib/supabase";
import { createOrder } from "./routes/orders";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/contact", handleContact);

  app.get("/api/messages", async (_req, res) => {
    try {
      const { data, error } = await supabaseAdmin
        .from("contact_messages")
        .select("id, first_name, last_name, email, phone, subject, message, created_at")
        .order("created_at", { ascending: false })
        .limit(50);
      
      if (error) throw error;
      res.json({ ok: true, data: data || [] });
    } catch (error: any) {
      res.status(500).json({ ok: false, error: error.message || "Failed to fetch messages" });
    }
  });

  app.post('/api/orders', createOrder);

  app.get('/api/orders', async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ ok: false, error: "Authentication required" });
      }
      
      const token = authHeader.substring(7);
      
      // Use the anon client to verify the user token, then use admin client for data access
      const { createClient } = await import("@supabase/supabase-js");
      const supabaseAnon = createClient(
        process.env.VITE_SUPABASE_URL as string,
        process.env.VITE_SUPABASE_ANON_KEY as string
      );
      
      const { data: { user }, error: userError } = await supabaseAnon.auth.getUser(token);
      
      if (userError || !user) {
        return res.status(401).json({ ok: false, error: "Invalid authentication" });
      }

      // Use admin client to bypass RLS for this specific query
      const { data, error } = await supabaseAdmin
        .from("orders")
        .select(`
          *,
          order_items (*)
        `)
        .eq('user_id', user.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      res.json({ ok: true, data: data || [] });
    } catch (error: any) {
      res.status(500).json({ ok: false, error: error.message || "Failed to fetch orders" });
    }
  });

  return app;
}
