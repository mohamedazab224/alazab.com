
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hvnxhovwbvphynuxlqnj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2bnhob3Z3YnZwaHludXhscW5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4Mjg2ODAsImV4cCI6MjA1OTQwNDY4MH0.i59NYbHj1aJixQMmXh61gPV5SpqoXwxjr85-5pUl-9U';

export const supabase = createClient(supabaseUrl, supabaseKey);
