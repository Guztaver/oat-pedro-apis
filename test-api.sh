#!/bin/bash

# Script de teste para a API CRUD
# Execute: chmod +x test-api.sh && ./test-api.sh

BASE_URL="http://localhost:3000"

echo "🚀 Testando API CRUD com Arrays - OAT1 Pedro Borges"
echo "=================================================="

echo ""
echo "📋 1. Informações da API:"
curl -s "$BASE_URL/" | jq '.' 2>/dev/null || curl -s "$BASE_URL/"

echo ""
echo ""
echo "➕ 2. Criando itens (CREATE):"
echo "Creating Notebook..."
curl -s -X POST "$BASE_URL/items" \
  -H "Content-Type: application/json" \
  -d '{"name":"Notebook Dell","description":"Notebook Dell Inspiron 15 com 8GB RAM","category":"Eletrônicos","price":2500}' | jq '.' 2>/dev/null || curl -s -X POST "$BASE_URL/items" -H "Content-Type: application/json" -d '{"name":"Notebook Dell","description":"Notebook Dell Inspiron 15 com 8GB RAM","category":"Eletrônicos","price":2500}'

echo ""
echo "Creating Mouse..."
curl -s -X POST "$BASE_URL/items" \
  -H "Content-Type: application/json" \
  -d '{"name":"Mouse Gamer","description":"Mouse óptico gamer com RGB","category":"Periféricos","price":150}' | jq '.' 2>/dev/null || curl -s -X POST "$BASE_URL/items" -H "Content-Type: application/json" -d '{"name":"Mouse Gamer","description":"Mouse óptico gamer com RGB","category":"Periféricos","price":150}'

echo ""
echo "Creating Teclado..."
curl -s -X POST "$BASE_URL/items" \
  -H "Content-Type: application/json" \
  -d '{"name":"Teclado Mecânico","description":"Teclado mecânico com switches blue","category":"Periféricos","price":250}' | jq '.' 2>/dev/null || curl -s -X POST "$BASE_URL/items" -H "Content-Type: application/json" -d '{"name":"Teclado Mecânico","description":"Teclado mecânico com switches blue","category":"Periféricos","price":250}'

echo ""
echo ""
echo "📖 3. Listando todos os itens (READ):"
curl -s "$BASE_URL/items" | jq '.' 2>/dev/null || curl -s "$BASE_URL/items"

echo ""
echo ""
echo "🔍 4. Buscando item por ID (READ):"
curl -s "$BASE_URL/items/1" | jq '.' 2>/dev/null || curl -s "$BASE_URL/items/1"

echo ""
echo ""
echo "🔄 5. Atualizando item completo (UPDATE PUT):"
curl -s -X PUT "$BASE_URL/items/1" \
  -H "Content-Type: application/json" \
  -d '{"name":"Notebook Dell Premium","description":"Notebook Dell Inspiron 15 com 16GB RAM e SSD","category":"Eletrônicos","price":3200}' | jq '.' 2>/dev/null || curl -s -X PUT "$BASE_URL/items/1" -H "Content-Type: application/json" -d '{"name":"Notebook Dell Premium","description":"Notebook Dell Inspiron 15 com 16GB RAM e SSD","category":"Eletrônicos","price":3200}'

echo ""
echo ""
echo "🔧 6. Atualizando item parcial (UPDATE PATCH):"
curl -s -X PATCH "$BASE_URL/items/2" \
  -H "Content-Type: application/json" \
  -d '{"price":180}' | jq '.' 2>/dev/null || curl -s -X PATCH "$BASE_URL/items/2" -H "Content-Type: application/json" -d '{"price":180}'

echo ""
echo ""
echo "🏷️ 7. Filtrando por categoria:"
curl -s "$BASE_URL/items?category=Periféricos" | jq '.' 2>/dev/null || curl -s "$BASE_URL/items?category=Periféricos"

echo ""
echo ""
echo "📄 8. Testando paginação:"
curl -s "$BASE_URL/items?page=1&limit=2" | jq '.' 2>/dev/null || curl -s "$BASE_URL/items?page=1&limit=2"

echo ""
echo ""
echo "🗑️ 9. Deletando item (DELETE):"
curl -s -X DELETE "$BASE_URL/items/3" | jq '.' 2>/dev/null || curl -s -X DELETE "$BASE_URL/items/3"

echo ""
echo ""
echo "📋 10. Lista final:"
curl -s "$BASE_URL/items" | jq '.' 2>/dev/null || curl -s "$BASE_URL/items"

echo ""
echo ""
echo "❌ 11. Testando erro (item não encontrado):"
curl -s "$BASE_URL/items/999" | jq '.' 2>/dev/null || curl -s "$BASE_URL/items/999"

echo ""
echo ""
echo "✅ Teste concluído! Todas as operações CRUD foram testadas."