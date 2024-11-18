// URL base da API
const API_URL = ''; // Vazio porque o frontend e o backend compartilham a mesma origem

// Elementos do DOM
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');
const twitForm = document.getElementById('twit-form');
const logoutButton = document.getElementById('logout-button');
const twitsContainer = document.getElementById('twits-container');
const registerSection = document.getElementById('register-section');
const loginSection = document.getElementById('login-section');
const twitsSection = document.getElementById('twits-section');
const showLoginLink = document.getElementById('show-login');
const showRegisterLink = document.getElementById('show-register');
const userNameDisplay = document.getElementById('user-name');

// Verifica se o usuário está logado ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token) {
        showTwitsSection();
        fetchTwits();
    } else {
        showAuthSections();
    }
});

// Manipuladores para alternar entre os formulários
showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerSection.style.display = 'none';
    loginSection.style.display = 'block';
});

showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginSection.style.display = 'none';
    registerSection.style.display = 'block';
});

// Manipulador do formulário de registro
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            registerForm.reset();
            registerSection.style.display = 'none';
            loginSection.style.display = 'block';
        } else {
            const errorMsg = data.message || data.errors[0].msg;
            alert(`Erro: ${errorMsg}`);
        }
    } catch (error) {
        console.error('Erro ao registrar:', error);
    }
});

// Manipulador do formulário de login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            localStorage.setItem('token', data.token);
            showTwitsSection();
            fetchTwits();
        } else {
            alert(`Erro: ${data.message}`);
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
    }
});

// Manipulador do formulário de criação de twit
twitForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const content = document.getElementById('twit-content').value;
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/twits`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ content })
        });

        const data = await response.json();

        if (response.ok) {
            twitForm.reset();

            // Criar o elemento do novo twit
            const twitElement = document.createElement('div');
            twitElement.classList.add('twit');

            const author = document.createElement('p');
            author.classList.add('author');

            if (data.User && data.User.username) {
                author.textContent = data.User.username;
            } else {
                author.textContent = 'Usuário desconhecido';
            }

            const contentElement = document.createElement('p');
            contentElement.textContent = data.content;

            twitElement.appendChild(author);
            twitElement.appendChild(contentElement);

            // Adicionar o novo twit no topo da lista
            twitsContainer.insertBefore(twitElement, twitsContainer.firstChild);
        } else {
            alert(`Erro: ${data.message}`);
        }
    } catch (error) {
        console.error('Erro ao criar twit:', error);
    }
});

// Botão de logout
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('token');
    showAuthSections();
});

// Funções auxiliares
function showTwitsSection() {
    registerSection.style.display = 'none';
    loginSection.style.display = 'none';
    twitsSection.style.display = 'block';

    // Decodificar o token JWT para obter o nome de usuário
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1]));
    userNameDisplay.textContent = payload.username;
}

function showAuthSections() {
    registerSection.style.display = 'block';
    loginSection.style.display = 'none';
    twitsSection.style.display = 'none';
}

async function fetchTwits() {
    try {
        const response = await fetch(`${API_URL}/twits`);
        const data = await response.json();

        console.log('Twits recebidos:', data); // Log para depuração

        // Limpa o container de twits
        twitsContainer.innerHTML = '';

        data.forEach(twit => {
            const twitElement = document.createElement('div');
            twitElement.classList.add('twit');

            const author = document.createElement('p');
            author.classList.add('author');

            // Verifica se 'User' e 'username' existem
            if (twit.User && twit.User.username) {
                author.textContent = twit.User.username;
            } else {
                author.textContent = 'Usuário desconhecido';
            }

            const content = document.createElement('p');
            content.textContent = twit.content;

            twitElement.appendChild(author);
            twitElement.appendChild(content);

            twitsContainer.appendChild(twitElement);
        });
    } catch (error) {
        console.error('Erro ao obter twits:', error);
    }
}
