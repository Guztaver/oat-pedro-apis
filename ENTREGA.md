# 📋 ENTREGA - OAT1 Pedro Borges

## 🎯 **LINK PARA ACESSO (FRONT-END)**
**👉 https://guztaver.github.io/oat-pedro-apis/**

---

## ✅ **REQUISITOS ATENDIDOS**

### **📚 Projeto CRUD com Arrays**
- ✅ **C**reate - Função de criação implementada
- ✅ **R**ead - Funções de leitura (listar e buscar por ID)
- ✅ **U**pdate - Funções de atualização (completa e parcial)
- ✅ **D**elete - Função de deleção implementada

### **💾 Armazenamento em Arrays**
- ✅ Dados armazenados em Arrays JavaScript (memória)
- ✅ Sem uso de banco de dados
- ✅ Funções reutilizáveis para todas as operações

### **🌐 Publicação no GitHub Pages**
- ✅ Back-end publicado e acessível online
- ✅ Front-end (documentação) no GitHub Pages
- ✅ Deploy automatizado via GitHub Actions

---

## 🔗 **LINKS IMPORTANTES**

| Recurso | URL |
|---------|-----|
| **🎯 Entrega Principal** | https://guztaver.github.io/oat-pedro-apis/ |
| **💻 Código Fonte** | https://github.com/Guztaver/oat-pedro-apis |
| **📮 Collection Postman** | [Download](https://guztaver.github.io/oat-pedro-apis/postman-collection.json) |
| **🌍 Environment Postman** | [Download](https://guztaver.github.io/oat-pedro-apis/postman-environment.json) |

---

## 🧪 **COMO TESTAR A API**

### **Opção 1: Postman (Recomendado)**
1. Acesse: https://guztaver.github.io/oat-pedro-apis/
2. Baixe os arquivos de Collection e Environment
3. Importe no Postman
4. Execute os testes

### **Opção 2: Swagger (Mais Fácil)**
1. Execute localmente: `npm run dev`
2. Acesse: http://localhost:3000/api-docs
3. Teste diretamente na interface Swagger

### **Opção 3: cURL**
```bash
# Listar itens
curl https://sua-api-online.com/items

# Criar item
curl -X POST https://sua-api-online.com/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","description":"Item de teste"}'
```

---

## 📊 **ESTRUTURA DO PROJETO**

```
oat-pedro-apis/
├── index.js              # Servidor principal com CRUD
├── swagger.js            # Configuração OpenAPI/Swagger
├── postman-collection.json # Collection completa do Postman
├── test-api.sh           # Script de testes automatizados
├── README.md             # Documentação completa
└── .github/workflows/    # Deploy automático GitHub Pages
    └── deploy.yml
```

---

## 🎓 **INFORMAÇÕES ACADÊMICAS**

- **Disciplina:** Desenvolvimento de APIs
- **Professor:** Pedro Borges
- **Aluno:** Gustavo
- **Curso:** Sistemas de Informação
- **Projeto:** OAT1 - CRUD com Arrays
- **Data:** Setembro 2025

---

## 📞 **CONTATO**

Para dúvidas ou esclarecimentos:
- **GitHub:** [@Guztaver](https://github.com/Guztaver)
- **Repositório:** https://github.com/Guztaver/oat-pedro-apis

---

**🚀 Projeto entregue com sucesso! Todas as funcionalidades CRUD implementadas e testadas.**