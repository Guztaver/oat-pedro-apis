# API CRUD com Arrays - OAT1 Pedro Borges

Este projeto implementa uma API REST completa com operações CRUD (Create, Read, Update, Delete) utilizando Arrays como estrutura de armazenamento dos dados, desenvolvido para a disciplina de Desenvolvimento de APIs do Professor Pedro Borges.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web para Node.js
- **CORS** - Middleware para Cross-Origin Resource Sharing
- **Nodemon** - Ferramenta para desenvolvimento (auto-restart)

## 📋 Funcionalidades

### Operações CRUD Implementadas:
- ✅ **C**reate - Criar novos itens
- ✅ **R**ead - Listar e buscar itens
- ✅ **U**pdate - Atualizar itens (completo e parcial)
- ✅ **D**elete - Deletar itens

### Recursos Adicionais:
- Validação de dados de entrada
- Paginação de resultados
- Filtros por categoria
- Timestamps automáticos (createdAt, updatedAt)
- Middleware de validação de ID
- Logs de requisições
- Tratamento de erros
- Documentação automática na rota raiz

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js versão 14 ou superior
- npm ou yarn

### Passos para executar:

1. **Clone o repositório:**
```bash
git clone https://github.com/Guztaver/oat-pedro-apis.git
cd oat-pedro-apis
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute o servidor:**
```bash
# Desenvolvimento (com auto-restart)
npm run dev

# Produção
npm start
```

4. **Acesse a API:**
- Servidor local: `http://localhost:3000`
- Documentação: `http://localhost:3000/`

## 📚 Documentação da API

### Estrutura do Item
```json
{
  "id": 1,
  "name": "string (obrigatório)",
  "description": "string (obrigatório)",
  "category": "string (opcional, padrão: 'Geral')",
  "price": "number (opcional, padrão: 0)",
  "createdAt": "ISO Date string",
  "updatedAt": "ISO Date string"
}
```

### Endpoints Disponíveis

#### 📖 Informações da API
```
GET /
```
Retorna informações sobre a API e lista de endpoints disponíveis.

#### 📝 Criar Item (CREATE)
```
POST /items
```
**Body (JSON):**
```json
{
  "name": "Produto Exemplo",
  "description": "Descrição do produto",
  "category": "Categoria", // opcional
  "price": 99.99 // opcional
}
```

#### 📋 Listar Itens (READ)
```
GET /items
```
**Query Parameters:**
- `category` - Filtrar por categoria
- `page` - Número da página (padrão: 1)
- `limit` - Itens por página (padrão: 10)

**Exemplo:**
```
GET /items?category=eletrônicos&page=1&limit=5
```

#### 🔍 Buscar Item por ID (READ)
```
GET /items/:id
```
**Exemplo:**
```
GET /items/1
```

#### ✏️ Atualizar Item Completo (UPDATE)
```
PUT /items/:id
```
**Body (JSON):**
```json
{
  "name": "Nome Atualizado",
  "description": "Nova descrição",
  "category": "Nova Categoria",
  "price": 199.99
}
```

#### 🔧 Atualizar Item Parcial (UPDATE)
```
PATCH /items/:id
```
**Body (JSON) - Apenas campos que deseja atualizar:**
```json
{
  "price": 299.99
}
```

#### 🗑️ Deletar Item (DELETE)
```
DELETE /items/:id
```

#### 🧹 Limpar Todos os Itens (UTILITÁRIO)
```
DELETE /items
```

### 📊 Exemplos de Resposta

#### Sucesso (Criar Item):
```json
{
  "message": "Item criado com sucesso",
  "item": {
    "id": 1,
    "name": "Produto Exemplo",
    "description": "Descrição do produto",
    "category": "Geral",
    "price": 99.99,
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
}
```

#### Listar com Paginação:
```json
{
  "items": [...],
  "pagination": {
    "currentPage": 1,
    "totalItems": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

#### Erro:
```json
{
  "error": "Item não encontrado"
}
```

## 🧪 Testando a API

### Usando cURL:

1. **Criar um item:**
```bash
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","description":"Item de teste","price":100}'
```

2. **Listar itens:**
```bash
curl http://localhost:3000/items
```

3. **Buscar item por ID:**
```bash
curl http://localhost:3000/items/1
```

4. **Atualizar item:**
```bash
curl -X PUT http://localhost:3000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Atualizado","description":"Descrição atualizada","price":150}'
```

5. **Deletar item:**
```bash
curl -X DELETE http://localhost:3000/items/1
```

### Usando Postman, Insomnia ou Thunder Client:
Importe a collection ou configure manualmente os endpoints acima.

## 🏗️ Estrutura do Projeto

```
oat-pedro-apis/
├── index.js          # Arquivo principal do servidor
├── package.json      # Dependências e scripts
├── example-data.js   # Dados de exemplo
├── README.md        # Documentação
└── node_modules/    # Dependências instaladas
```

## 💾 Armazenamento de Dados

Os dados são armazenados em um **Array em memória**, conforme especificado no projeto. Isso significa que:
- Os dados são perdidos quando o servidor é reiniciado
- Não há persistência em banco de dados
- Ideal para desenvolvimento e testes
- Simples e direto para demonstrar as operações CRUD

## 🚦 Status Codes

- `200` - OK (Sucesso)
- `201` - Created (Item criado)
- `400` - Bad Request (Dados inválidos)
- `404` - Not Found (Item não encontrado)
- `500` - Internal Server Error (Erro do servidor)

## 👨‍💻 Autor

- **Nome:** Gustavo
- **Curso:** Sistemas de Informação
- **Disciplina:** Desenvolvimento de APIs
- **Professor:** Pedro Borges
- **Projeto:** OAT1 - CRUD com Arrays

## 📝 Licença

Este projeto está sob a licença MIT.
