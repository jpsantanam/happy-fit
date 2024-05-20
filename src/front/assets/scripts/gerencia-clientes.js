// módulo de atendimentos, todas as funções que são necessárias para obter e exibir os atndimentos de um nuticionista
const Atendimento = (function () {
    // renderizar os usuários na lista de atendimento
    function renderizarAtendimentos(clientes) {
        const atendimentosContainer = document.querySelector('.atendimento');
        atendimentosContainer.innerHTML = ''; // Limpar o conteúdo anterior
    
        clientes.forEach(cliente => {
            const atendimentoUsuario = document.createElement('div');
            atendimentoUsuario.classList.add('d-flex', 'align-items-center', 'justify-content-between', 'mb-3');
    
            const nomeUsuario = document.createElement('p');
            nomeUsuario.classList.add('atendimento-usuario');
            nomeUsuario.textContent = cliente.name;
    
            const dropdown = document.createElement('div');
            dropdown.classList.add('dropdown');
    
            const botaoDropdown = document.createElement('button');
            botaoDropdown.classList.add('btn', 'btn-secondary', 'dropdown-toggle');
            botaoDropdown.setAttribute('type', 'button');
            botaoDropdown.setAttribute('id', `dropdownMenuButton-${cliente.id}`);
            botaoDropdown.setAttribute('data-bs-toggle', 'dropdown');
            botaoDropdown.setAttribute('aria-expanded', 'false');
            botaoDropdown.innerHTML = '<i class="fa-solid fa-plus"></i>';
    
            const dropdownMenu = document.createElement('ul');
            dropdownMenu.classList.add('dropdown-menu');
            dropdownMenu.setAttribute('aria-labelledby', `dropdownMenuButton-${cliente.id}`);
    
            if (cliente.profile !== null) {
                const verPerfilItem = document.createElement('li');
                const verPerfilLink = document.createElement('a');
                verPerfilLink.classList.add('dropdown-item');
                verPerfilLink.href = `dieta.html?userId=${cliente.id}`;
                verPerfilLink.textContent = 'Ver Perfil';
                verPerfilItem.appendChild(verPerfilLink);
                dropdownMenu.appendChild(verPerfilItem);
    
                const editarPerfilItem = document.createElement('li');
                const editarPerfilLink = document.createElement('a');
                editarPerfilLink.classList.add('dropdown-item');
                editarPerfilLink.href = `editar-perfil.html?userId=${cliente.id}`;
                editarPerfilLink.textContent = 'Editar Perfil';
                editarPerfilItem.appendChild(editarPerfilLink);
                dropdownMenu.appendChild(editarPerfilItem);
            } else {
                const criarPerfilItem = document.createElement('li');
                const criarPerfilLink = document.createElement('a');
                criarPerfilLink.classList.add('dropdown-item');
                criarPerfilLink.href = '#';
                criarPerfilLink.textContent = 'Criar Perfil';
                criarPerfilLink.addEventListener('click', function (event) {
                    event.preventDefault();
                    localStorage.setItem('selectedUserId', cliente.id);
                    const modal = document.getElementById('temPerfil');
                    const modalInstance = new bootstrap.Modal(modal);
                    modalInstance.show();
                });
                criarPerfilItem.appendChild(criarPerfilLink);
                dropdownMenu.appendChild(criarPerfilItem);
            }
    
            dropdown.appendChild(botaoDropdown);
            dropdown.appendChild(dropdownMenu);
    
            atendimentoUsuario.appendChild(nomeUsuario);
            atendimentoUsuario.appendChild(dropdown);
            atendimentosContainer.appendChild(atendimentoUsuario);
        });
    }


    // obter usuários associados ao nutricionista
    async function obterUsuarios(nutricionistaId) {
        try {
            // obter os usuários associados ao nutricionista
            const response = await fetch(`${API_URL}/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Erro ao obter usuários associados ao nutricionista.');
            }
    
            const nutricionista = await response.json();
            const clientes = nutricionista.clients;
            console.log("Clientes:", clientes);
            renderizarAtendimentos(clientes);
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    // funções pra chamar em outra área do código
    return {
        obterUsuarios: obterUsuarios
    };
})();

async function adicionaCliente(userId, nutricionistaId) {
    const requestBody = {
        "nutritionistId": nutricionistaId
    }

    try {
        const response = await fetch(`${API_URL}/user/${userId}/nutritionist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar cliente.');
        }

        // Atualizar a lista de clientes
        Atendimento.obterUsuarios(nutricionistaId);

        // Fechar o modal programaticamente
        const modal = document.getElementById('addAtendimento');
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
    } catch (error) {
        console.error('Erro:', error);
    }
}

// verificar se email é valido
function validarEmail(email) {
    // Expressão regular para validar o formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// requisição POST para verificar existencia de email no DB
async function verificaEmailExistente(email) {
    try {
        const userIdResponse = await fetch(`${API_URL}/user?email=${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!userIdResponse.ok) {
            throw new Error('Erro ao obter o ID do usuário.');
        }

        const userIdData = await userIdResponse.json();
        return userIdData.id;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}


// adicionando um event listener para o evento 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', async function () {
    const usuarioString = localStorage.getItem('loggedUser');
    if (usuarioString) {
        const usuario = JSON.parse(usuarioString);
        Atendimento.obterUsuarios(usuario.id);
    } else {
        console.error('Informações do usuário não encontradas.');
    }

    const botaoVerificaEmail = document.getElementById('adicionar');

    botaoVerificaEmail.addEventListener('click', async function () {

        const emailInput = document.getElementById('emailInput');
        const email = emailInput.value.trim();

        if (validarEmail(email)) {
            try {
                const userId = await verificaEmailExistente(email); // espera verificar se existe o email no bd
                console.log(userId);
                const usuarioString = localStorage.getItem('loggedUser');
                console.log(usuarioString);
                // se encontrar o usuário no localStorage
                if (usuarioString) {
                    const usuario = JSON.parse(usuarioString);
                    const nutricionistaId = usuario.id;
                    adicionaCliente(userId, nutricionistaId); // para renderizar os usuários associados ao nutricionista
                    Atendimento.obterUsuarios(userId, nutricionistaId);
                } else {
                    console.error('Informações do usuário não encontradas.');
                }
            } catch (error) {
                alert('Erro ao verificar o email:', error.message);
            }
        } else {
            alert('Por favor, insira um endereço de email válido.');
        }
    });

    const fazerPerfilBtn = document.getElementById('fazerPerfil');
    fazerPerfilBtn.addEventListener('click', function () {
        const selectedUserId = localStorage.getItem('selectedUserId');
        const perfilAlimentarURL = `perfil-alimentar.html?userId=${selectedUserId}`;
        window.location.href = perfilAlimentarURL;
    });

});