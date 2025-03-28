# Documentação da API Cyclebox

## Sobre a API
a API do Cyclebox gerencia os produtos disponíveis na plataforma permitindo listar buscar criar atualizar e deletar produtos também inclui funcionalidades para autenticação de usuários e controle de permissões o projeto foi realizado durante o módulo avançado do curso de Fullstack do Capacita Brasil C-Jovem

## Índice
- [Base URL](#base-url)
- [Rotas Protegidas](#rotas-protegidas-apenas-administradores)
  - [Criar um Novo Produto](#criar-um-novo-produto)
  - [Atualizar um Produto](#atualizar-um-produto)
  - [Deletar um Produto](#deletar-um-produto)
- [Gerenciamento de Usuários](#gerenciamento-de-usuários-se-aplicável)
  - [Criar um Usuário](#criar-um-usuário)
  - [Atualizar um Usuário](#atualizar-um-usuário)
  - [Deletar um Usuário](#deletar-um-usuário)
- [Rotas Públicas](#rotas-públicas-abertas-para-todos)
  - [Listar Todos os Produtos](#listar-todos-os-produtos)
  - [Buscar um Produto Específico](#buscar-um-produto-específico)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Observações](#observações)


## Rotas Protegidas (Apenas Administradores)

### Criar um Novo Produto
- Método POST
- Rota /api/products
- Apenas administradores podem cadastrar novos produtos
- Middlewares authMiddleware adminMiddleware

Exemplo de Requisição
```json
{
  "nome": "Tênis Branco",
  "descricao": "Tênis confortável tamanho 42",
  "preco": 129.90,
  "imagem": "https://linkdaimagem.com/tenis.jpg"
}
```

### Atualizar um Produto
- Método PUT
- Rota /api/products/:id
- Apenas administradores podem alterar nome preço e categoria de produtos
- Middlewares authMiddleware adminMiddleware

Exemplo de Requisição
```json
{
  "preco": 99.90
}
```

### Deletar um Produto
- Método DELETE
- Rota /api/products/:id
- Apenas administradores podem remover produtos
- Middlewares authMiddleware adminMiddleware

Exemplo de Resposta
```json
{}
```

## Gerenciamento de Usuários (Se Aplicável)

### Criar um Usuário
- Método POST
- Rota /api/users
- Apenas administradores podem criar novos usuários
- Middlewares authMiddleware adminMiddleware

### Atualizar um Usuário
- Método PUT
- Rota /api/users/:id
- Apenas administradores podem editar dados de usuários
- Middlewares authMiddleware adminMiddleware

### Deletar um Usuário
- Método DELETE
- Rota /api/users/:id
- Apenas administradores podem remover usuários
- Middlewares authMiddleware adminMiddleware

## Rotas Públicas (Abertas para Todos)

### Listar Todos os Produtos
- Método GET
- Rota /api/products
- Todos podem visualizar os produtos disponíveis

Exemplo de Resposta
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
- Método GET
- Rota /api/products/:id
- Todos podem visualizar detalhes de um produto

Exemplo de Resposta
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
- Node.js como ambiente de execução
- Express.js para gerenciar as rotas
- Prisma ORM para manipulação do banco de dados
- PostgreSQL como banco de dados principal
- Tembo.io para hospedagem do banco de dados na nuvem
- Axios para requisições HTTP
- JWT Json Web Token para autenticação de usuários
- Bcrypt.js para criptografia de senhas
- dotenv para gerenciamento de variáveis de ambiente
- express-validator para validação de dados nas requisições
- cors para habilitar compartilhamento de recursos entre origens diferentes
- pg cliente PostgreSQL para Node.js
- nodemon para reiniciar automaticamente o servidor durante o desenvolvimento

## Observações
- As rotas protegidas precisam de autenticação e permissão de administrador
- Os dados podem ser alterados ou removidos a qualquer momento
- Se um produto não for encontrado a API retorna erro 404

### Acessando a documentação do Swagger

Após o servidor estar rodando, a documentação da API estará disponível através do Swagger. Para acessá-la, abra seu navegador e vá para a URL:

[http://localhost:4000/api-docs](http://localhost:4000/api-docs)

## Colaboradores

- Megue Ellen Andrade De Souza - [Github](https://github.com/MegEllenAS) | [LinkedIn](https://www.linkedin.com/in/megueellen)
- Cláudia Ysla de Sousa Martins - [Github](https://github.com/yslamartins) | [LinkedIn](https://www.linkedin.com/in/ysla-martins-dev)
- Teresa Campos - [Github](https://github.com/teresaccampos) | [LinkedIn](https://www.linkedin.com/in/teresacamposdev)
- Jhonatan Gonçalves Pereira - [Github](https://github.com/jhonatan-goncalves-pereira) | [LinkedIn](https://www.linkedin.com/in/jhonatan-goncalves-pereira/)
- Bia Torres Da Costa - [Github](https://github.com/biatorresdacosta) | [LinkedIn](https://www.linkedin.com/in/biatorresdacosta/)
