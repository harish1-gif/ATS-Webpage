import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type News = {
  id?: string;
  title: string;
  description: string;
  category: "AI & ML" | "Cloud Ops" | "Security" | "Web Engineering";
  author: string;
  date: string;
  readTime: string;
  source: "manual" | "devto";
  devtoUrl?: string;
  createdAt?: string;
  lastUpdated?: string;
};
