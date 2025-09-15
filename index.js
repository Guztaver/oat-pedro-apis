const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Middleware para log das requisições
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Array para armazenar os dados (substituindo um banco de dados)
let items = [];
let nextId = 1;

// Função para gerar próximo ID
const getNextId = () => {
  return nextId++;
};

// Função para encontrar item por ID
const findItemById = (id) => {
  return items.find(item => item.id === parseInt(id));
};

// Função para encontrar índice do item por ID
const findItemIndexById = (id) => {
  return items.findIndex(item => item.id === parseInt(id));
};

// Middleware de validação de ID
const validateId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id) || id <= 0) {
    return res.status(400).json({
      error: 'ID deve ser um número inteiro positivo'
    });
  }
  next();
};

// Rota raiz - informações sobre a API
app.get('/', (_req, res) => {
  res.json({
    message: 'API CRUD com Arrays - OAT1 Pedro Borges',
    version: '1.0.0',
    endpoints: {
      'GET /': 'Informações da API',
      'GET /items': 'Listar todos os itens',
      'GET /items/:id': 'Buscar item por ID',
      'POST /items': 'Criar novo item',
      'PUT /items/:id': 'Atualizar item completo',
      'PATCH /items/:id': 'Atualizar item parcial',
      'DELETE /items/:id': 'Deletar item'
    },
    totalItems: items.length
  });
});

// ==================== OPERAÇÕES CRUD ====================

// CREATE - Criar novo item
app.post('/items', (req, res) => {
  try {
    const { name, description, category, price } = req.body;
    
    // Validação básica
    if (!name || !description) {
      return res.status(400).json({
        error: 'Campos obrigatórios: name, description'
      });
    }

    // Criar novo item
    const newItem = {
      id: getNextId(),
      name: name.trim(),
      description: description.trim(),
      category: category?.trim() || 'Geral',
      price: price || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Adicionar ao array
    items.push(newItem);

    res.status(201).json({
      message: 'Item criado com sucesso',
      item: newItem
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro interno do servidor',
      details: error.message
    });
  }
});

// READ - Listar todos os itens
app.get('/items', (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    
    let filteredItems = items;
    
    // Filtrar por categoria se fornecida
    if (category) {
      filteredItems = items.filter(item => 
        item.category.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    // Paginação
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedItems = filteredItems.slice(startIndex, endIndex);
    
    res.json({
      items: paginatedItems,
      pagination: {
        currentPage: parseInt(page),
        totalItems: filteredItems.length,
        totalPages: Math.ceil(filteredItems.length / limit),
        hasNext: endIndex < filteredItems.length,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro interno do servidor',
      details: error.message
    });
  }
});

// READ - Buscar item por ID
app.get('/items/:id', validateId, (req, res) => {
  try {
    const item = findItemById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        error: 'Item não encontrado'
      });
    }
    
    res.json({
      item: item
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro interno do servidor',
      details: error.message
    });
  }
});

// UPDATE - Atualizar item completo (PUT)
app.put('/items/:id', validateId, (req, res) => {
  try {
    const itemIndex = findItemIndexById(req.params.id);
    
    if (itemIndex === -1) {
      return res.status(404).json({
        error: 'Item não encontrado'
      });
    }
    
    const { name, description, category, price } = req.body;
    
    // Validação básica
    if (!name || !description) {
      return res.status(400).json({
        error: 'Campos obrigatórios: name, description'
      });
    }
    
    // Atualizar item mantendo ID e createdAt
    const updatedItem = {
      ...items[itemIndex],
      name: name.trim(),
      description: description.trim(),
      category: category?.trim() || 'Geral',
      price: price || 0,
      updatedAt: new Date().toISOString()
    };
    
    items[itemIndex] = updatedItem;
    
    res.json({
      message: 'Item atualizado com sucesso',
      item: updatedItem
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro interno do servidor',
      details: error.message
    });
  }
});

// UPDATE - Atualizar item parcial (PATCH)
app.patch('/items/:id', validateId, (req, res) => {
  try {
    const itemIndex = findItemIndexById(req.params.id);
    
    if (itemIndex === -1) {
      return res.status(404).json({
        error: 'Item não encontrado'
      });
    }
    
    const updates = req.body;
    
    // Remover campos que não devem ser atualizados
    delete updates.id;
    delete updates.createdAt;
    
    // Limpar strings se fornecidas
    if (updates.name) updates.name = updates.name.trim();
    if (updates.description) updates.description = updates.description.trim();
    if (updates.category) updates.category = updates.category.trim();
    
    // Atualizar item
    const updatedItem = {
      ...items[itemIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    items[itemIndex] = updatedItem;
    
    res.json({
      message: 'Item atualizado com sucesso',
      item: updatedItem
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro interno do servidor',
      details: error.message
    });
  }
});

// DELETE - Deletar item
app.delete('/items/:id', validateId, (req, res) => {
  try {
    const itemIndex = findItemIndexById(req.params.id);
    
    if (itemIndex === -1) {
      return res.status(404).json({
        error: 'Item não encontrado'
      });
    }
    
    const deletedItem = items[itemIndex];
    items.splice(itemIndex, 1);
    
    res.json({
      message: 'Item deletado com sucesso',
      item: deletedItem
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro interno do servidor',
      details: error.message
    });
  }
});

// Rota para limpar todos os itens (útil para testes)
app.delete('/items', (_req, res) => {
  try {
    const count = items.length;
    items.length = 0; // Limpar array
    nextId = 1; // Resetar contador de ID
    
    res.json({
      message: `Todos os ${count} itens foram deletados`,
      totalDeleted: count
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro interno do servidor',
      details: error.message
    });
  }
});

// Middleware para rotas não encontradas
app.use('*', (_req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    message: 'Verifique a documentação em GET /'
  });
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📖 Acesse http://localhost:${PORT} para ver a documentação`);
});

module.exports = app;