# Documentação da API Cyclebox

## Sobre a API
Esta API gerencia os produtos da plataforma, permitindo listar, buscar, criar, atualizar e deletar produtos, além de gerenciar usuários. Algumas rotas precisam de autenticação e permissão de administrador.

## Base URL
```
https://679027cc49875e5a1a947d3c.mockapi.io/produtos
```

## Rotas Protegidas (Apenas Administradores)

### Criar um Novo Produto
- Método: POST
- Rota: /api/products
- Apenas administradores podem cadastrar novos produtos
- Middlewares: authMiddleware, adminMiddleware

Exemplo de Requisição:
```json
{
  "nome": "Tênis Branco",
  "descricao": "Tênis confortável, tamanho 42",
  "preco": 129.90,
  "imagem": "https://linkdaimagem.com/tenis.jpg"
}
```

### Atualizar um Produto
- Método: PUT
- Rota: /api/products/:id
- Apenas administradores podem alterar nome, preço e categoria de produtos
- Middlewares: authMiddleware, adminMiddleware

Exemplo de Requisição:
```json
{
  "preco": 99.90
}
```

### Deletar um Produto
- Método: DELETE
- Rota: /api/products/:id
- Apenas administradores podem remover produtos
- Middlewares: authMiddleware, adminMiddleware

Exemplo de Resposta:
```json
{}
```

## Gerenciamento de Usuários (Se Aplicável)

### Criar um Usuário
- Método: POST
- Rota: /api/users
- Apenas administradores podem criar novos usuários
- Middlewares: authMiddleware, adminMiddleware

### Atualizar um Usuário
- Método: PUT
- Rota: /api/users/:id
- Apenas administradores podem editar dados de usuários
- Middlewares: authMiddleware, adminMiddleware

### Deletar um Usuário
- Método: DELETE
- Rota: /api/users/:id
- Apenas administradores podem remover usuários
- Middlewares: authMiddleware, adminMiddleware

## Rotas Públicas (Abertas para Todos)

### Listar Todos os Produtos
- Método: GET
- Rota: /api/products
- Todos podem visualizar os produtos disponíveis

Exemplo de Resposta:
```json
[
  {
    "id": "1",
    "nome": "Blusa Vintage",
    "descricao": "Blusa de algodão estilo retrô",
    "preco": 39.90,
    "imagem": "https://linkdaimagem.com/blusa.jpg"
  }
]
```

### Buscar um Produto Específico
- Método: GET
- Rota: /api/products/:id
- Todos podem visualizar detalhes de um produto

Exemplo de Resposta:
```json
{
  "id": "1",
  "nome": "Blusa Vintage",
  "descricao": "Blusa de algodão estilo retrô",
  "preco": 39.90,
  "imagem": "https://linkdaimagem.com/blusa.jpg"
}
```

## Tecnologias Utilizadas
- Axios para requisições HTTP
- Node.js como ambiente de execução
- Express para gerenciar as rotas
- PostgreSQL como banco de dados
- Tengo.io para hospedar o banco

## Gerenciamento de Branches no Projeto

### Verificar a Branch Atual
```bash
git branch
```

### Criar uma Nova Branch
```bash
git checkout -b feature/nome-da-funcionalidade
```
Ou
```bash
git switch -c feature/nome-da-funcionalidade
```

### Adicionar Alterações e Fazer Commit
```bash
git add .
git commit -m "Mensagem explicando a alteração"
```

### Enviar a Branch para o Repositório Remoto
```bash
git push origin feature/nome-da-funcionalidade
```

### Atualizar sua Branch Local
```bash
git pull origin nome-da-branch
```

### Mudar para a Branch Develop e Fazer Merge
```bash
git checkout develop
git merge feature/nome-da-funcionalidade
```

### Enviar Alterações para o Repositório Remoto
```bash
git push origin develop
```

### Excluir a Branch Depois do Merge
```bash
git branch -d feature/nome-da-funcionalidade
git push origin --delete feature/nome-da-funcionalidade
```

### Criar um Pull Request no GitHub ou GitLab
Acesse o repositório, clique em "Create Pull Request" e siga os passos.

## Observações
- As rotas protegidas precisam de autenticação e permissão de administrador.
- Os dados podem ser alterados ou removidos a qualquer momento.
- Se um produto não for encontrado, a API retorna erro 404.



