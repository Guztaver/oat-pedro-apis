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
- **GitHub Pages (Online):** `https://guztaver.github.io/oat-pedro-apis/`
- **Servidor local:** `http://localhost:3000`
- **Documentação:** `http://localhost:3000/`

## 🤖 **IMPORTAÇÃO AUTOMÁTICA NO POSTMAN** 

### ✨ **SIM! O Postman pode descobrir automaticamente todas as rotas!**

Existem **3 maneiras** de fazer isso:

#### **🎯 Método 1: Swagger/OpenAPI (MAIS FÁCIL)**
```
1. Abra o Postman
2. Import → Link → Cole: http://localhost:3000/api-docs
3. ✅ TODAS as rotas importadas automaticamente!
```

#### **📁 Método 2: Arquivo de Coleção**
```
1. Baixe: postman-collection.json
2. Import → Upload Files
3. ✅ Collection completa com exemplos!
```

#### **🔗 Método 3: URL da API**
```
1. Cole a URL base no Postman: http://localhost:3000
2. O Postman detecta automaticamente os endpoints
3. ✅ Descoberta automática ativada!
```

**🚀 Resultado:** Todas as operações CRUD estarão disponíveis sem configuração manual!

---

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

### 🚀 **IMPORTAÇÃO AUTOMÁTICA NO POSTMAN** (Recomendado)

#### **Opção 1: Swagger/OpenAPI (Mais Fácil)**
1. Abra o Postman
2. Clique em **"Import"** (botão no canto superior esquerdo)
3. Selecione **"Link"** 
4. Cole: `http://localhost:3000/api-docs`
5. Clique **"Continue"** → **"Import"**
6. ✅ **Pronto!** Todas as rotas serão importadas automaticamente com exemplos!

#### **Opção 2: Arquivo de Coleção JSON**
1. Baixe o arquivo: [`postman-collection.json`](./postman-collection.json)
2. No Postman: **Import** → **"Upload Files"** → Selecione o arquivo
3. Importe também: [`postman-environment.json`](./postman-environment.json)
4. ✅ **Pronto!** Collection completa com testes de erro incluídos!

#### **Opção 3: Descoberta Automática por URL**
- **Swagger UI:** `http://localhost:3000/api-docs`
- **OpenAPI JSON:** `http://localhost:3000/api-docs-json` (se configurado)

### 📖 **Documentação Interativa**
- **Swagger UI:** `http://localhost:3000/api-docs`
  - Interface visual para testar todos os endpoints
  - Exemplos de requisições e respostas
  - Validação automática de esquemas

### 🔧 **Usando cURL (Linha de Comando):**

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

### 🎯 **Script de Teste Automatizado:**
```bash
# Execute o script completo de testes
./test-api.sh
```

### 🛠️ **Outras Ferramentas:**
- **Insomnia:** Importe via OpenAPI URL ou arquivo JSON
- **Thunder Client (VS Code):** Importe a collection JSON
- **Bruno:** Suporta importação de OpenAPI
- **Hoppscotch:** Cole a URL do Swagger para importação automática

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

## 🌐 Deploy e Acesso

### **🚀 GitHub Pages (ONLINE)**
- **URL:** https://guztaver.github.io/oat-pedro-apis/
- **Status:** ✅ Automaticamente atualizado a cada commit
- **Recursos:** Documentação completa, downloads, exemplos

### **💻 Servidor Local (DESENVOLVIMENTO)**
- **URL:** http://localhost:3000
- **Swagger:** http://localhost:3000/api-docs
- **Para desenvolvedores:** Execute `npm run dev`

### **📤 Para o Professor Pedro:**
**Link para Entrega:** https://guztaver.github.io/oat-pedro-apis/

## 👨‍💻 Autor

- **Nome:** Gustavo
- **Curso:** Sistemas de Informação
- **Disciplina:** Desenvolvimento de APIs
- **Professor:** Pedro Borges
- **Projeto:** OAT1 - CRUD com Arrays
- **GitHub:** https://github.com/Guztaver/oat-pedro-apis

## 📝 Licença

Este projeto está sob a licença MIT.
