import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://eksqgnocujdvztlhrjkq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrc3Fnbm9jdWpkdnp0bGhyamtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgwNDM1ODYsImV4cCI6MjAzMzYxOTU4Nn0.bRTAZWxYrHAkjyfkOKpLdGBaS-4pnSE9N3DKOEXQ46Q'
);
