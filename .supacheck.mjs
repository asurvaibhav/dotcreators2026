import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://cdfoywrqdkthegksvsrh.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkZm95d3JxZGt0aGVna3N2c3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NDgwNTIsImV4cCI6MjA5NzUyNDA1Mn0.Z8Zv-bmtfjShHCin6YHjMXanxcU2sdC4qdDxMNJ5qRM');
const email = 'desaishreyash506@gmail.com';
(async () => {
  const { data, error } = await supabase.from('registrations').select('*').eq('email', email).maybeSingle();
  console.log('EQ', { data, error });
  const { data: data2, error: error2 } = await supabase.from('registrations').select('*').ilike('email', email);
  console.log('ILIKE', { data2, error2 });
})();
