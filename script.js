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
// --- LÓGICA DO FORMULÁRIO DE CADASTRO ---

// Passo 1: "Pegar" o nosso formulário do HTML pelo seu 'id'
const formCadastro = document.querySelector('#form-cadastro');

// Passo 2: "Ouvir" o evento de envio (submit) do formulário
formCadastro.addEventListener('submit', async (event) => {
    // Isso impede que a página recarregue, que é o comportamento padrão de um formulário
    event.preventDefault(); 

    // Passo 3: Pegar os valores que o usuário digitou em cada campo
    const nomeUsuario = formCadastro.nome.value;
    const emailUsuario = formCadastro.email.value;
    const senhaUsuario = formCadastro.senha.value;

    console.log('Cadastrando usuário:', nomeUsuario, emailUsuario);

    // Passo 4: Enviar os dados para a tabela 'profiles' no Supabase
    const { data, error } = await supabaseClient
        .from('profiles')
        .insert([
            { nome: nomeUsuario, email: emailUsuario, senha: senhaUsuario },
        ]);

    // Passo 5: Verificar o resultado
    if (error) {
        alert('Erro no cadastro: ' + error.message);
    } else {
        alert('Usuário cadastrado com sucesso!');
        formCadastro.reset(); // Limpa o formulário
        buscarPerfis(); // Atualiza a lista de perfis na tela na hora!
    }
});
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
// --- LENDO E EXIBINDO OS DADOS ---

// Passo 1: Criar uma função para buscar e mostrar os perfis na tela
async function buscarPerfis() {
    console.log('Iniciando busca de perfis...');

    // Passo 2: Usar o Supabase para LER os dados da tabela 'profiles'
    // O .select('*') significa "selecione todas as colunas"
    const { data, error } = await supabaseClient
        .from('profiles')
        .select('*');

    // Passo 3: Verificar se a busca deu certo ou deu erro
    if (error) {
        console.error('Erro ao buscar perfis:', error);
    } else {
        console.log('Perfis encontrados:', data); // Para vermos os dados no console

        // Passo 4: Encontrar a lista vazia no HTML pelo seu 'id'
        const lista = document.querySelector('#lista-perfis');
        lista.innerHTML = ''; // Limpa a lista antes de adicionar os itens

        // Passo 5: Para cada perfil encontrado, criar um item na lista
        data.forEach(perfil => {
            const itemLista = document.createElement('li');
            itemLista.textContent = `Nome: ${perfil.nome} - Email: ${perfil.email}`;
            lista.appendChild(itemLista);
        });
    }
}

// Passo 6: Chamar a função para que ela seja executada assim que a página carregar
buscarPerfis();