// =================== CÓDIGO COMPLETO E CORRIGIDO ===================

// --- CONEXÃO COM O SUPABASE ---
const supabaseUrl = 'https://tqsfsbtvnwgkgyguyfqo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxc2ZzYnR2bndna2d5Z3V5ZnFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5Njk5NDksImV4cCI6MjA2NjU0NTk0OX0.TZ28xSp6kn2a7B-FVtKVFoxRCY5I218xRi45ZxIE-Qk';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
console.log('Conexão com o Supabase estabelecida com sucesso!');


// --- FUNÇÃO PARA LER E EXIBIR OS DADOS ---
async function buscarPerfis() {
    console.log('Iniciando busca de perfis...');
    const { data, error } = await supabaseClient
        .from('profiles')
        .select('*');

    if (error) {
        console.error('Erro ao buscar perfis:', error);
    } else {
        const lista = document.querySelector('#lista-perfis');
        lista.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

        data.forEach(perfil => {
            const itemLista = document.createElement('li');
            itemLista.textContent = `Nome: ${perfil.nome} - Email: ${perfil.email}`;
            lista.appendChild(itemLista);
        });
    }
}
// Chama a função para que ela seja executada assim que a página carregar
buscarPerfis();


// --- LÓGICA DO FORMULÁRIO DE CADASTRO ---
const formCadastro = document.querySelector('#form-cadastro');

formCadastro.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede que a página recarregue

    const nomeUsuario = formCadastro.nome.value;
    const emailUsuario = formCadastro.email.value;
    const senhaUsuario = formCadastro.senha.value;

    console.log('Cadastrando usuário:', nomeUsuario, emailUsuario);

    const { data, error } = await supabaseClient
        .from('profiles')
        .insert([
            { nome: nomeUsuario, email: emailUsuario, senha: senhaUsuario },
        ]);

    if (error) {
        alert('Erro no cadastro: ' + error.message);
    } else {
        alert('Usuário cadastrado com sucesso!');
        formCadastro.reset(); // Limpa o formulário
        buscarPerfis(); // Atualiza a lista de perfis na tela!
    }
});