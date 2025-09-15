const express = require('express');
const cors = require('cors');
const { swaggerUi, specs } = require('./swagger');

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

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "API CRUD - OAT1 Pedro Borges"
}));

// Array para armazenar os dados (substituindo um banco de dados)
const items = [];
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

/**
 * @swagger
 * /:
 *   get:
 *     summary: Informações da API
 *     description: Retorna informações gerais sobre a API e lista de endpoints disponíveis
 *     tags: [Info]
 *     responses:
 *       200:
 *         description: Informações da API retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "API CRUD com Arrays - OAT1 Pedro Borges"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 *                 endpoints:
 *                   type: object
 *                 totalItems:
 *                   type: integer
 *                   example: 0
 */
app.get('/', (_req, res) => {
  res.json({
    message: 'API CRUD com Arrays - OAT1 Pedro Borges',
    version: '1.0.0',
    endpoints: {
      'GET /': 'Informações da API',
      'GET /api-docs': 'Documentação Swagger',
      'GET /items': 'Listar todos os itens',
      'GET /items/:id': 'Buscar item por ID',
      'POST /items': 'Criar novo item',
      'PUT /items/:id': 'Atualizar item completo',
      'PATCH /items/:id': 'Atualizar item parcial',
      'DELETE /items/:id': 'Deletar item'
    },
    totalItems: items.length,
    swaggerDocs: 'http://localhost:3000/api-docs'
  });
});

// ==================== OPERAÇÕES CRUD ====================

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Criar novo item (CREATE)
 *     description: Cria um novo item no array de dados
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemInput'
 *     responses:
 *       201:
 *         description: Item criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: Dados de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Listar todos os itens (READ)
 *     description: Retorna uma lista paginada de todos os itens, com opções de filtro
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrar itens por categoria
 *         example: "Eletrônicos"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número da página para paginação
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Número de itens por página
 *     responses:
 *       200:
 *         description: Lista de itens retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemsList'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Buscar item por ID (READ)
 *     description: Retorna um item específico baseado no ID fornecido
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID único do item
 *         example: 1
 *     responses:
 *       200:
 *         description: Item encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 item:
 *                   $ref: '#/components/schemas/Item'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Item não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Atualizar item completo (UPDATE)
 *     description: Atualiza completamente um item existente. Todos os campos são obrigatórios.
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID único do item
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemInput'
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: ID inválido ou dados de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Item não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /items/{id}:
 *   patch:
 *     summary: Atualizar item parcial (UPDATE)
 *     description: Atualiza parcialmente um item existente. Apenas os campos fornecidos serão atualizados.
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID único do item
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemUpdate'
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Item não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Deletar item (DELETE)
 *     description: Remove um item específico do array baseado no ID fornecido
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID único do item a ser deletado
 *         example: 1
 *     responses:
 *       200:
 *         description: Item deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item deletado com sucesso"
 *                 item:
 *                   $ref: '#/components/schemas/Item'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Item não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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

/**
 * @swagger
 * /items:
 *   delete:
 *     summary: Limpar todos os itens (UTILITÁRIO)
 *     description: Remove todos os itens do array. Útil para testes e desenvolvimento.
 *     tags: [Utilities]
 *     responses:
 *       200:
 *         description: Todos os itens foram deletados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Todos os 5 itens foram deletados"
 *                 totalDeleted:
 *                   type: integer
 *                   example: 5
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
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
    message: 'Verifique a documentação em GET / ou /api-docs'
  });
});

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📖 Acesse http://localhost:${PORT} para ver a documentação`);
  console.log(`📚 Swagger UI disponível em http://localhost:${PORT}/api-docs`);
});

module.exports = app;