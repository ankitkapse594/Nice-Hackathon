// Optional Supabase Client with graceful fallback
import { createClient } from "@supabase/supabase-js";

// Load from environment or localStorage for runtime dynamic configuration
const getSupabaseConfig = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const localUrl = localStorage.getItem("kyc_supabase_url");
  const localKey = localStorage.getItem("kyc_supabase_key");

  return {
    url: localUrl || envUrl || "",
    key: localKey || envKey || ""
  };
};

export const getSupabaseClient = () => {
  const { url, key } = getSupabaseConfig();
  if (url && key && url.startsWith("https://")) {
    try {
      return createClient(url, key);
    } catch (e) {
      console.warn("Failed to initialize Supabase client:", e);
      return null;
    }
  }
  return null;
};

export const isSupabaseConfigured = () => {
  const { url, key } = getSupabaseConfig();
  return Boolean(url && key && url.startsWith("https://"));
};

export const saveSupabaseConfig = (url, key) => {
  if (url) localStorage.setItem("kyc_supabase_url", url.trim());
  if (key) localStorage.setItem("kyc_supabase_key", key.trim());
};
