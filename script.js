// Conectando ao seu projeto Supabase
const supabaseUrl = 'https://tqsfsbtvnwgkgyguyfqo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxc2ZzYnR2bndna2d5Z3V5ZnFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5Njk5NDksImV4cCI6MjA2NjU0NTk0OX0.TZ28xSp6kn2a7B-FVtKVFoxRCY5I218xRi45ZxIE-Qk';

// A CORREÇÃO ESTÁ AQUI!
// A 'caixa de ferramentas' global já se chama 'supabase'.
// Vamos criar nosso cliente com um nome um pouco diferente para não dar conflito.
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Mensagem de teste para o console do navegador
console.log('Conexão com o Supabase estabelecida com sucesso!', supabaseClient);