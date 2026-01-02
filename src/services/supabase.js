import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://tppgusakbpaaclxsoiew.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwcGd1c2FrYnBhYWNseHNvaWV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MzA3NjksImV4cCI6MjA4MjQwNjc2OX0.rfk_tFpUzLUI3BvWJNwjwV2auSIFa4HOGTJXVFV6IQ4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
