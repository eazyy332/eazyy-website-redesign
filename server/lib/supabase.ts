import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment from .env.local first (dev), then fallback to .env
dotenv.config({ path: ".env.local" });
dotenv.config();

const supabaseUrl = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL) as
  | string
  | undefined;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string | undefined;

if (!supabaseUrl) {
  throw new Error("SUPABASE_URL (or VITE_SUPABASE_URL) is required in env");
}
if (!supabaseServiceKey) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY is required in env");
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});


