# 🚀 OAT Pedro APIs - CRUD com Arrays

Esse é um repositório para uma atividade avaliativa de Professor Pedro.

**Curso:** Sistemas de Informação  
**Disciplina:** Desenvolvimento de API's  
**Professor:** Pedro Borges  
**Atividade:** OAT1 - Projeto de CRUD com Arrays

## 📋 Descrição

Este projeto implementa um sistema CRUD (Create, Read, Update, Delete) completo utilizando **Arrays como estrutura de armazenamento de dados**. O sistema inclui:

- ✅ API RESTful com Node.js e Express
- ✅ Funções reutilizáveis para operações CRUD
- ✅ Interface web moderna para demonstração
- ✅ Validação de dados e tratamento de erros
- ✅ Testes automatizados das funções

## 🛠️ Tecnologias Utilizadas

- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Estrutura de Dados:** Arrays (conforme solicitado)
- **Estilo:** CSS moderno com gradientes e responsividade

## 🚀 Como Executar

### 1. Instalação das Dependências
```bash
npm install
```

### 2. Executar o Servidor
```bash
npm start
```

### 3. Executar em Modo de Desenvolvimento
```bash
npm run dev
```

### 4. Executar Testes
```bash
npm test
```

## 📡 Endpoints da API

### **GET** `/api/users`
Lista todos os usuários cadastrados.

**Resposta:**
```json
{
  "success": true,
  "data": [...],
  "count": 3
}
```

### **GET** `/api/users/:id`
Busca um usuário específico por ID.

**Resposta:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "age": 25,
    "createdAt": "2024-01-01T10:00:00.000Z"
  }
}
```

### **POST** `/api/users`
Cria um novo usuário.

**Body:**
```json
{
  "name": "Nome do Usuário",
  "email": "email@exemplo.com",
  "age": 25
}
```

### **PUT** `/api/users/:id`
Atualiza um usuário existente.

**Body:**
```json
{
  "name": "Nome Atualizado",
  "email": "novo@email.com",
  "age": 30
}
```

### **DELETE** `/api/users/:id`
Remove um usuário do sistema.

## 🔧 Funções CRUD Reutilizáveis

O sistema implementa 4 funções principais que podem ser reutilizadas:

### `createItem(array, item)`
Adiciona um novo item ao array com ID automático e timestamp.

### `readItems(array, id?)`
Busca itens no array. Se ID for fornecido, retorna item específico.

### `updateItem(array, id, updates)`
Atualiza um item existente no array.

### `deleteItem(array, id)`
Remove um item do array por ID.

## 🌐 Interface Web

Acesse `http://localhost:3000` para usar a interface web que permite:

- ➕ Criar novos usuários
- 📋 Listar todos os usuários
- ✏️ Editar usuários existentes
- 🗑️ Deletar usuários
- 🧪 Testar todos os endpoints da API

## 📁 Estrutura do Projeto

```
oat-pedro-apis/
├── server.js          # Servidor Express com API
├── test.js            # Testes das funções CRUD
├── package.json       # Configurações do projeto
├── public/            # Arquivos da interface web
│   ├── index.html     # Página principal
│   ├── style.css      # Estilos CSS
│   └── script.js      # JavaScript da interface
└── README.md          # Esta documentação
```

## 🎯 Funcionalidades Implementadas

- [x] **CRUD completo** com arrays como estrutura de dados
- [x] **API RESTful** com todos os endpoints
- [x] **Interface web moderna** e responsiva
- [x] **Validação de dados** no backend
- [x] **Tratamento de erros** adequado
- [x] **Timestamps** automáticos (criação/atualização)
- [x] **Testes automatizados** das funções
- [x] **Documentação completa** da API

## 🧪 Exemplo de Uso das Funções

```javascript
// Exemplo de uso das funções CRUD
let users = [];

// CREATE
const newUser = createItem(users, {
  name: 'João Silva',
  email: 'joao@email.com',
  age: 25
});

// READ
const allUsers = readItems(users);
const specificUser = readItems(users, 1);

// UPDATE
const updatedUser = updateItem(users, 1, {
  name: 'João Silva Santos',
  age: 26
});

// DELETE
const deleted = deleteItem(users, 1);
```

## 🎓 Objetivos da Atividade

Este projeto atende aos requisitos da OAT1:

✅ **Utiliza Arrays como estrutura de armazenamento**  
✅ **Implementa funções reutilizáveis para CRUD**  
✅ **Pode ser reutilizado para implementar APIs**  
✅ **Está disponível em repositório Git**  
✅ **Inclui interface para demonstração**

---

**Desenvolvido para:** OAT1 - Desenvolvimento de APIs - Professor Pedro Borges  
**Curso:** Sistemas de Informação
