import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment from .env.local first (dev), then fallback to .env
dotenv.config({ path: ".env.local" });
dotenv.config();

const supabaseUrl = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL) as
  | string
  | undefined;
const supabaseServiceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_service_role_key_for_development') as string;

let supabaseAdmin: any;

if (!supabaseUrl) {
  throw new Error("SUPABASE_URL (or VITE_SUPABASE_URL) is required in env");
}
if (!supabaseServiceKey || supabaseServiceKey === 'placeholder_service_role_key_for_development') {
  console.warn("SUPABASE_SERVICE_ROLE_KEY not configured - using anon key for development");
  // Fallback to anon key for development
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY as string;
  supabaseAdmin = createClient(supabaseUrl, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
} else {
  supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
