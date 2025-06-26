// Conectando ao seu projeto Supabase
const supabaseUrl = 'https://tqsfsbtvnwgkgyguyfqo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxc2ZzYnR2bndna2d5Z3V5ZnFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5Njk5NDksImV4cCI6MjA2NjU0NTk0OX0.TZ28xSp6kn2a7B-FVtKVFoxRCY5I218xRi45ZxIE-Qk';

// Inicializando o cliente Supabase. É a nossa ferramenta para conversar com o banco de dados.
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Mensagem de teste para o console do navegador, para a gente ter certeza que conectou.
console.log('Conexão com o Supabase estabelecida com sucesso!', supabase);