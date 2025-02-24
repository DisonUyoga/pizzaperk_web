import { Database } from "@/database.types";
import { createBrowserClient } from "@supabase/ssr";

// Create a supabase client on the browser with project's credentials
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
