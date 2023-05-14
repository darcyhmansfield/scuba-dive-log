import { createClient } from '@supabase/supabase-js'

const supabaseURL = "https://wgpigjfrywpnomybyqqj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndncGlnamZyeXdwbm9teWJ5cXFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM4NjI2MzcsImV4cCI6MTk5OTQzODYzN30.NIcn8d3rC_BbdqKM65LNufeAUWIPzeJJgvB7JDKA5ZU"

export const supabase = createClient(supabaseURL, supabaseAnonKey)

