// Conectando ao seu projeto Supabase
const supabaseUrl = 'https://tqsfsbtvnwgkgyguyfqo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxc2ZzYnR2bndna2d5Z3V5ZnFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5Njk5NDksImV4cCI6MjA2NjU0NTk0OX0.TZ28xSp6kn2a7B-FVtKVFoxRCY5I218xRi45ZxIE-Qk';

// A CORREÇÃO ESTÁ AQUI!
// A 'caixa de ferramentas' global já se chama 'supabase'.
// Vamos criar nosso cliente com um nome um pouco diferente para não dar conflito.
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Mensagem de teste para o console do navegador
console.log('Conexão com o Supabase estabelecida com sucesso!', supabaseClient);
// --- FAZENDO O BOTÃO FUNCIONAR ---

// Passo 1: "Pegar" o botão que está no nosso HTML
const botao = document.querySelector('button');

// Passo 2: Adicionar um "ouvinte" para ficar esperando o clique no botão
botao.addEventListener('click', async () => {
    // Quando o botão for clicado, o código aqui dentro será executado

    console.log('Botão clicado!'); // Um teste para vermos no console

    // Passo 3: Tentar inserir uma nova linha de dados no Supabase
    const { data, error } = await supabaseClient
        .from('profiles') // Dizendo em qual tabela queremos inserir
        .insert([
            // Os dados que queremos inserir
            { nome: 'Primeiro Usuário', email: 'contato@exemplo.com' },
        ]);

    // Passo 4: Verificar se deu certo ou se deu erro
    if (error) {
        // Se deu erro, mostra um alerta com a mensagem de erro
        alert('Ocorreu um erro ao salvar: ' + error.message);
        console.error('Detalhes do erro:', error);
    } else {
        // Se deu certo, mostra um alerta de sucesso
        alert('DADOS SALVOS COM SUCESSO! Vá no Supabase conferir!');
        console.log('Dados que foram salvos:', data);
    }
});