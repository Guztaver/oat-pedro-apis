// Configuração da API
const API_BASE_URL = window.location.origin + '/api';

// Elementos DOM
const userForm = document.getElementById('userForm');
const usersList = document.getElementById('usersList');
const userCount = document.getElementById('userCount');
const submitBtn = document.getElementById('submitBtn');
const apiResults = document.getElementById('apiResults');

// Estado da aplicação
let isEditing = false;
let currentEditId = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Aplicação inicializada');
    loadUsers();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    userForm.addEventListener('submit', handleFormSubmit);
}

// Manipulação do formulário
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        age: parseInt(document.getElementById('age').value) || 0
    };
    
    try {
        if (isEditing) {
            await updateUser(currentEditId, formData);
        } else {
            await createUser(formData);
        }
        clearForm();
        loadUsers();
    } catch (error) {
        showMessage('Erro ao processar formulário: ' + error.message, 'error');
    }
}

// Funções CRUD
async function createUser(userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Erro ao criar usuário');
        }
        
        showMessage('✅ Usuário criado com sucesso!', 'success');
        return result.data;
    } catch (error) {
        showMessage('❌ Erro ao criar usuário: ' + error.message, 'error');
        throw error;
    }
}

async function loadUsers() {
    try {
        showLoading();
        
        const response = await fetch(`${API_BASE_URL}/users`);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Erro ao carregar usuários');
        }
        
        displayUsers(result.data);
        updateUserCount(result.count);
        
    } catch (error) {
        showMessage('❌ Erro ao carregar usuários: ' + error.message, 'error');
        usersList.innerHTML = '<div class="loading">Erro ao carregar dados</div>';
    }
}

async function updateUser(id, userData) {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Erro ao atualizar usuário');
        }
        
        showMessage('✅ Usuário atualizado com sucesso!', 'success');
        return result.data;
    } catch (error) {
        showMessage('❌ Erro ao atualizar usuário: ' + error.message, 'error');
        throw error;
    }
}

async function deleteUser(id) {
    if (!confirm('Tem certeza que deseja deletar este usuário?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Erro ao deletar usuário');
        }
        
        showMessage('✅ Usuário deletado com sucesso!', 'success');
        loadUsers();
    } catch (error) {
        showMessage('❌ Erro ao deletar usuário: ' + error.message, 'error');
    }
}

// Funções de interface
function displayUsers(users) {
    if (!users || users.length === 0) {
        usersList.innerHTML = '<div class="loading">Nenhum usuário encontrado</div>';
        return;
    }
    
    const usersHTML = users.map(user => `
        <div class="user-card">
            <div class="user-info">
                <h3>👤 ${user.name}</h3>
                <p><strong>📧 Email:</strong> ${user.email}</p>
                <p><strong>🎂 Idade:</strong> ${user.age} anos</p>
                <p><strong>🆔 ID:</strong> ${user.id}</p>
                ${user.createdAt ? `<p><strong>📅 Criado:</strong> ${formatDate(user.createdAt)}</p>` : ''}
                ${user.updatedAt ? `<p><strong>🔄 Atualizado:</strong> ${formatDate(user.updatedAt)}</p>` : ''}
            </div>
            <div class="user-actions">
                <button class="edit-btn" onclick="editUser(${user.id})">✏️ Editar</button>
                <button class="delete-btn" onclick="deleteUser(${user.id})">🗑️ Deletar</button>
            </div>
        </div>
    `).join('');
    
    usersList.innerHTML = usersHTML;
}

function editUser(id) {
    // Buscar usuário por ID
    fetch(`${API_BASE_URL}/users/${id}`)
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                const user = result.data;
                
                // Preencher formulário
                document.getElementById('userId').value = user.id;
                document.getElementById('name').value = user.name;
                document.getElementById('email').value = user.email;
                document.getElementById('age').value = user.age;
                
                // Atualizar estado
                isEditing = true;
                currentEditId = id;
                submitBtn.textContent = 'Atualizar Usuário';
                
                // Scroll para o formulário
                document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
            }
        })
        .catch(error => {
            showMessage('❌ Erro ao buscar usuário: ' + error.message, 'error');
        });
}

function clearForm() {
    userForm.reset();
    document.getElementById('userId').value = '';
    isEditing = false;
    currentEditId = null;
    submitBtn.textContent = 'Criar Usuário';
}

function updateUserCount(count) {
    userCount.textContent = `Total: ${count} usuário${count !== 1 ? 's' : ''}`;
}

function showLoading() {
    usersList.innerHTML = '<div class="loading">🔄 Carregando usuários...</div>';
}

function showMessage(message, type) {
    // Remove mensagens antigas
    const oldMessage = document.querySelector('.message');
    if (oldMessage) {
        oldMessage.remove();
    }
    
    // Criar nova mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Inserir no topo do container
    const container = document.querySelector('.container');
    container.insertBefore(messageDiv, container.firstChild);
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
}

// Função de teste da API
async function testAPI() {
    const results = [];
    
    try {
        results.push('🧪 Iniciando testes da API...\n');
        
        // Teste 1: GET /api/users
        results.push('1️⃣ Teste GET /api/users:');
        const getUsersResponse = await fetch(`${API_BASE_URL}/users`);
        const getUsersResult = await getUsersResponse.json();
        results.push(`Status: ${getUsersResponse.status}`);
        results.push(`Resposta: ${JSON.stringify(getUsersResult, null, 2)}\n`);
        
        // Teste 2: POST /api/users (criar usuário de teste)
        results.push('2️⃣ Teste POST /api/users (criar usuário):');
        const testUser = {
            name: 'Teste API',
            email: `teste.api.${Date.now()}@email.com`,
            age: 25
        };
        
        const createResponse = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });
        const createResult = await createResponse.json();
        results.push(`Status: ${createResponse.status}`);
        results.push(`Resposta: ${JSON.stringify(createResult, null, 2)}\n`);
        
        if (createResult.success && createResult.data) {
            const testUserId = createResult.data.id;
            
            // Teste 3: GET /api/users/:id
            results.push(`3️⃣ Teste GET /api/users/${testUserId}:`);
            const getUserResponse = await fetch(`${API_BASE_URL}/users/${testUserId}`);
            const getUserResult = await getUserResponse.json();
            results.push(`Status: ${getUserResponse.status}`);
            results.push(`Resposta: ${JSON.stringify(getUserResult, null, 2)}\n`);
            
            // Teste 4: PUT /api/users/:id
            results.push(`4️⃣ Teste PUT /api/users/${testUserId}:`);
            const updateData = { name: 'Teste API Atualizado', age: 30 };
            const updateResponse = await fetch(`${API_BASE_URL}/users/${testUserId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            });
            const updateResult = await updateResponse.json();
            results.push(`Status: ${updateResponse.status}`);
            results.push(`Resposta: ${JSON.stringify(updateResult, null, 2)}\n`);
            
            // Teste 5: DELETE /api/users/:id
            results.push(`5️⃣ Teste DELETE /api/users/${testUserId}:`);
            const deleteResponse = await fetch(`${API_BASE_URL}/users/${testUserId}`, {
                method: 'DELETE'
            });
            const deleteResult = await deleteResponse.json();
            results.push(`Status: ${deleteResponse.status}`);
            results.push(`Resposta: ${JSON.stringify(deleteResult, null, 2)}\n`);
        }
        
        results.push('✅ Testes concluídos com sucesso!');
        
    } catch (error) {
        results.push(`❌ Erro durante os testes: ${error.message}`);
    }
    
    // Exibir resultados
    apiResults.textContent = results.join('\n');
    
    // Recarregar lista de usuários
    loadUsers();
}

// Exportar funções para uso global
window.loadUsers = loadUsers;
window.editUser = editUser;
window.deleteUser = deleteUser;
window.clearForm = clearForm;
window.testAPI = testAPI;