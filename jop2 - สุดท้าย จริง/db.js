const SUPABASE_URL = "https://pylcaxljttivamphvkkx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5bGNheGxqdHRpdmFtcGh2a2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4NTgxMjEsImV4cCI6MjA4MzQzNDEyMX0.Ssx-HOIJO6dpESkfvLzzOK1rZE6A_FVm7OZ2K8uosTg";

window.supabase = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

