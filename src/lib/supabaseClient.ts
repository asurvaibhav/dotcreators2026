import { createClient } from "@supabase/supabase-js";

const serverEnv = typeof process !== "undefined" ? process.env : {};
const exampleEnv = {
  VITE_SUPABASE_URL: "",
  VITE_SUPABASE_ANON_KEY: "",
} as Record<string, string>;

const supabaseUrl = (
  import.meta.env.VITE_SUPABASE_URL ||
  serverEnv.VITE_SUPABASE_URL ||
  exampleEnv.VITE_SUPABASE_URL ||
  ""
).trim();

const supabaseAnonKey = (
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  serverEnv.VITE_SUPABASE_ANON_KEY ||
  exampleEnv.VITE_SUPABASE_ANON_KEY ||
  ""
).trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  !supabaseUrl.includes("placeholder.supabase.co") &&
  supabaseAnonKey &&
  supabaseAnonKey !== "placeholder"
);

const isPlaceholder = !isSupabaseConfigured;

export const supabase = createClient(
  isPlaceholder ? "https://placeholder.supabase.co" : supabaseUrl,
  isPlaceholder ? "placeholder" : supabaseAnonKey,
  {
    auth: {
      persistSession: typeof window !== "undefined",
      detectSessionInUrl: typeof window !== "undefined",
    },
    global: {
      // Prevents the Node server execution environment from throwing an unhandled HTTPError
      fetch: (...args) => {
        if (typeof window === "undefined") {
          return Promise.resolve(new Response(JSON.stringify({}), { status: 200 }));
        }
        return fetch(...args);
      },
    },
  }
);