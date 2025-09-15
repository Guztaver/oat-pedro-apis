const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Array-based data storage
let users = [
  { id: 1, name: 'João Silva', email: 'joao@email.com', age: 25 },
  { id: 2, name: 'Maria Santos', email: 'maria@email.com', age: 30 },
  { id: 3, name: 'Pedro Oliveira', email: 'pedro@email.com', age: 28 }
];

let nextId = 4;

// CRUD Functions for Array Management

/**
 * CREATE - Adiciona um novo item ao array
 * @param {Array} array - Array de destino
 * @param {Object} item - Item a ser adicionado
 * @returns {Object} Item criado com ID
 */
function createItem(array, item) {
  const newItem = {
    id: nextId++,
    ...item,
    createdAt: new Date().toISOString()
  };
  array.push(newItem);
  return newItem;
}

/**
 * READ - Busca itens no array
 * @param {Array} array - Array de origem
 * @param {number} id - ID do item (opcional)
 * @returns {Array|Object} Lista de itens ou item específico
 */
function readItems(array, id = null) {
  if (id) {
    return array.find(item => item.id === parseInt(id));
  }
  return array;
}

/**
 * UPDATE - Atualiza um item no array
 * @param {Array} array - Array de destino
 * @param {number} id - ID do item
 * @param {Object} updates - Dados para atualização
 * @returns {Object|null} Item atualizado ou null se não encontrado
 */
function updateItem(array, id, updates) {
  const index = array.findIndex(item => item.id === parseInt(id));
  if (index === -1) return null;
  
  array[index] = {
    ...array[index],
    ...updates,
    id: parseInt(id), // Preservar o ID original
    updatedAt: new Date().toISOString()
  };
  return array[index];
}

/**
 * DELETE - Remove um item do array
 * @param {Array} array - Array de destino
 * @param {number} id - ID do item
 * @returns {boolean} true se removido, false se não encontrado
 */
function deleteItem(array, id) {
  const index = array.findIndex(item => item.id === parseInt(id));
  if (index === -1) return false;
  
  array.splice(index, 1);
  return true;
}

// API Endpoints

// GET /api/users - Listar todos os usuários
app.get('/api/users', (req, res) => {
  try {
    const allUsers = readItems(users);
    res.json({
      success: true,
      data: allUsers,
      count: allUsers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
});

// GET /api/users/:id - Buscar usuário por ID
app.get('/api/users/:id', (req, res) => {
  try {
    const user = readItems(users, req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
});

// POST /api/users - Criar novo usuário
app.post('/api/users', (req, res) => {
  try {
    const { name, email, age } = req.body;
    
    // Validação básica
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Nome e email são obrigatórios'
      });
    }
    
    // Verificar se email já existe
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email já cadastrado'
      });
    }
    
    const newUser = createItem(users, { name, email, age: parseInt(age) || 0 });
    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
});

// PUT /api/users/:id - Atualizar usuário
app.put('/api/users/:id', (req, res) => {
  try {
    const { name, email, age } = req.body;
    
    // Verificar se email já existe em outro usuário
    if (email) {
      const existingUser = users.find(user => user.email === email && user.id !== parseInt(req.params.id));
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Email já cadastrado para outro usuário'
        });
      }
    }
    
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (age !== undefined) updates.age = parseInt(age);
    
    const updatedUser = updateItem(users, req.params.id, updates);
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Usuário atualizado com sucesso',
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
});

// DELETE /api/users/:id - Deletar usuário
app.delete('/api/users/:id', (req, res) => {
  try {
    const deleted = deleteItem(users, req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado'
      });
    }
    
    res.json({
      success: true,
      message: 'Usuário deletado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
});

// Rota para servir a página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware de tratamento de erro 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 API disponível em: http://localhost:${PORT}/api/users`);
  console.log(`🌐 Interface web em: http://localhost:${PORT}`);
});

module.exports = app;