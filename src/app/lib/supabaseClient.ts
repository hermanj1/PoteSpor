import { createClient } from "@supabase/supabase-js";

const NEXT_PUBLIC_SUPABASE_URL= "https://nspnnnrxgofutsztyzze.supabase.co";
const NEXT_PUBLIC_SUPABASE_ANON_KEY= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zcG5ubnJ4Z29mdXRzenR5enplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMTk3NTAsImV4cCI6MjA3OTg5NTc1MH0.faUBd00ZQmnH-ovMr990WrI2W0g-oP4HCiQI4_6oMQI";
;

export const supabase = createClient( NEXT_PUBLIC_SUPABASE_URL ,NEXT_PUBLIC_SUPABASE_ANON_KEY);