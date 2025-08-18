import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment from .env.local first (dev), then fallback to .env
dotenv.config({ path: ".env.local" });
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("VITE_SUPABASE_URL is required. Please connect to Supabase first.");
}

if (!supabaseServiceKey && !supabaseAnonKey) {
  throw new Error("Either SUPABASE_SERVICE_ROLE_KEY or VITE_SUPABASE_ANON_KEY is required. Please connect to Supabase first.");
}

export const supabaseAdmin = (() => {
  if (supabaseServiceKey) {
    // Use service role key for admin operations
    return createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } else if (supabaseAnonKey) {
    // Fallback to anon key for development
    console.warn("SUPABASE_SERVICE_ROLE_KEY not configured - using anon key");
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } else {
    throw new Error("No valid Supabase configuration found. Please connect to Supabase first.");
  }
})();