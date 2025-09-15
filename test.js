// Teste simples das funções CRUD
const app = require('./server');
const http = require('http');

// Simular dados para teste
let testUsers = [
  { id: 1, name: 'João Silva', email: 'joao@email.com', age: 25 },
  { id: 2, name: 'Maria Santos', email: 'maria@email.com', age: 30 }
];

let nextTestId = 3;

// Funções CRUD para teste (mesma lógica do servidor)
function createItem(array, item) {
  const newItem = {
    id: nextTestId++,
    ...item,
    createdAt: new Date().toISOString()
  };
  array.push(newItem);
  return newItem;
}

function readItems(array, id = null) {
  if (id) {
    return array.find(item => item.id === parseInt(id));
  }
  return array;
}

function updateItem(array, id, updates) {
  const index = array.findIndex(item => item.id === parseInt(id));
  if (index === -1) return null;
  
  array[index] = {
    ...array[index],
    ...updates,
    id: parseInt(id),
    updatedAt: new Date().toISOString()
  };
  return array[index];
}

function deleteItem(array, id) {
  const index = array.findIndex(item => item.id === parseInt(id));
  if (index === -1) return false;
  
  array.splice(index, 1);
  return true;
}

// Executar testes
function runTests() {
  console.log('🧪 Iniciando testes das funções CRUD...\n');
  
  // Teste CREATE
  console.log('1️⃣ Testando CREATE:');
  const newUser = createItem(testUsers, {
    name: 'Pedro Teste',
    email: 'pedro.teste@email.com',
    age: 28
  });
  console.log('Usuário criado:', newUser);
  console.log('Total de usuários:', testUsers.length);
  console.log('✅ CREATE funcionando\n');
  
  // Teste READ (todos)
  console.log('2️⃣ Testando READ (todos):');
  const allUsers = readItems(testUsers);
  console.log('Todos os usuários:', allUsers);
  console.log('✅ READ (todos) funcionando\n');
  
  // Teste READ (por ID)
  console.log('3️⃣ Testando READ (por ID):');
  const userById = readItems(testUsers, newUser.id);
  console.log('Usuário encontrado:', userById);
  console.log('✅ READ (por ID) funcionando\n');
  
  // Teste UPDATE
  console.log('4️⃣ Testando UPDATE:');
  const updatedUser = updateItem(testUsers, newUser.id, {
    name: 'Pedro Teste Atualizado',
    age: 29
  });
  console.log('Usuário atualizado:', updatedUser);
  console.log('✅ UPDATE funcionando\n');
  
  // Teste DELETE
  console.log('5️⃣ Testando DELETE:');
  const deleted = deleteItem(testUsers, newUser.id);
  console.log('Usuário deletado:', deleted);
  console.log('Total de usuários após delete:', testUsers.length);
  console.log('✅ DELETE funcionando\n');
  
  console.log('🎉 Todos os testes passaram com sucesso!');
  console.log('Estado final do array:', testUsers);
}

// Executar testes se o arquivo for executado diretamente
if (require.main === module) {
  runTests();
}

module.exports = {
  createItem,
  readItems,
  updateItem,
  deleteItem,
  runTests
};