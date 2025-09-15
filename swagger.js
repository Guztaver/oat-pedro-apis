const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API CRUD com Arrays - OAT1 Pedro Borges',
      version: '1.0.0',
      description: 'API REST completa com operações CRUD utilizando Arrays como estrutura de armazenamento',
      contact: {
        name: 'Gustavo',
        email: 'gustavo@exemplo.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento'
      },
      {
        url: 'https://your-api-url.com',
        description: 'Servidor de Produção'
      }
    ],
    components: {
      schemas: {
        Item: {
          type: 'object',
          required: ['name', 'description'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do item (gerado automaticamente)',
              example: 1
            },
            name: {
              type: 'string',
              description: 'Nome do item',
              example: 'Notebook Dell'
            },
            description: {
              type: 'string',
              description: 'Descrição detalhada do item',
              example: 'Notebook Dell Inspiron 15 com 8GB RAM'
            },
            category: {
              type: 'string',
              description: 'Categoria do item',
              example: 'Eletrônicos',
              default: 'Geral'
            },
            price: {
              type: 'number',
              description: 'Preço do item',
              example: 2500.00,
              default: 0
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do item',
              example: '2024-01-15T10:00:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data da última atualização',
              example: '2024-01-15T10:00:00.000Z'
            }
          }
        },
        ItemInput: {
          type: 'object',
          required: ['name', 'description'],
          properties: {
            name: {
              type: 'string',
              description: 'Nome do item',
              example: 'Notebook Dell'
            },
            description: {
              type: 'string',
              description: 'Descrição detalhada do item',
              example: 'Notebook Dell Inspiron 15 com 8GB RAM'
            },
            category: {
              type: 'string',
              description: 'Categoria do item',
              example: 'Eletrônicos'
            },
            price: {
              type: 'number',
              description: 'Preço do item',
              example: 2500.00
            }
          }
        },
        ItemUpdate: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Nome do item',
              example: 'Notebook Dell Atualizado'
            },
            description: {
              type: 'string',
              description: 'Descrição detalhada do item',
              example: 'Notebook Dell Inspiron 15 com 16GB RAM'
            },
            category: {
              type: 'string',
              description: 'Categoria do item',
              example: 'Eletrônicos'
            },
            price: {
              type: 'number',
              description: 'Preço do item',
              example: 3000.00
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro',
              example: 'Item não encontrado'
            },
            details: {
              type: 'string',
              description: 'Detalhes adicionais do erro',
              example: 'O item com ID 999 não existe'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de sucesso',
              example: 'Item criado com sucesso'
            },
            item: {
              $ref: '#/components/schemas/Item'
            }
          }
        },
        ItemsList: {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Item'
              }
            },
            pagination: {
              type: 'object',
              properties: {
                currentPage: {
                  type: 'integer',
                  example: 1
                },
                totalItems: {
                  type: 'integer',
                  example: 25
                },
                totalPages: {
                  type: 'integer',
                  example: 3
                },
                hasNext: {
                  type: 'boolean',
                  example: true
                },
                hasPrev: {
                  type: 'boolean',
                  example: false
                }
              }
            }
          }
        }
      }
    }
  },
  apis: ['./index.js'] // Caminho para os arquivos com anotações JSDoc
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};