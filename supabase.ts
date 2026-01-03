
import { createClient } from 'https://esm.sh/@supabase/supabase-js@^2.48.1';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://zrwrucwlrvqiaemczsbp.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyd3J1Y3dscnZxaWFlbWN6c2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NDQ3MTUsImV4cCI6MjA4MzAyMDcxNX0.tQ_mBECfsOMMrmMcV4jmaLTJSlnDNcTCvWy_VTirEB0';

/**
 * Safely initialize the Supabase client.
 * If credentials are missing, we return null to prevent the app from crashing on load.
 * Components using this should check for its existence before making calls.
 */
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
