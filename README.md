# E-commerce Node.js - Apep Store

Este projeto é um **sistema de e-commerce** desenvolvido em **Node.js**, utilizando **Express**, **Prisma ORM** e **JWT** para autenticação de usuários e administradores.  
Ele permite gerenciar produtos, usuários, carrinho de compras e autenticação, incluindo funcionalidades de CRUD tanto para usuários quanto para o admin.

---

## Tecnologias Utilizadas

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT (Json Web Token)
- Bcrypt (para hashing de senhas)
- Multer (para upload de imagens)
- EJS / HTML (para renderização das páginas)
- dotenv (para variáveis de ambiente)

---

## Estrutura do Projeto

├─ controllers/  
│ ├─ authController.js # Login, registro e autenticação de usuários  
│ ├─ produtosController.js # Renderização de páginas de produtos  
│ ├─ adminController.js # CRUD de produtos e usuários pelo admin  
│ ├─ carrinhoController.js # Carrinho de compras  
│ └─ accountController.js # Gerenciamento da conta do usuário  
├─ models/  
│ ├─ usuariosModel.js # Funções relacionadas aos usuários  
│ └─ produtosModel.js # Funções relacionadas aos produtos  
├─ public/ # Arquivos públicos (imagens, CSS, JS)  
├─ views/ # Templates EJS ou HTML  
├─ .env # Variáveis de ambiente  
└─ server.js # Configuração do servidor Express  

---

## Funcionalidades

### Usuário

- Cadastro e login de usuários
- Logout
- Visualizar conta e dados pessoais
- Deletar conta
- Adicionar produtos ao carrinho

### Produtos

- Listar todos os produtos
- Filtrar produtos por categoria
- Visualizar detalhes de cada produto

### Admin

- Login de administrador
- Criar, atualizar e deletar produtos
- Visualizar todos os usuários
- Deletar usuários
- Upload seguro de imagens de produtos

---

## Modelagem de Dados (Prisma)

**Usuários (`usuarios`)**

| Campo       | Tipo          | Descrição                    |
|------------ |--------------|------------------------------|
| id          | Int (PK)     | ID do usuário               |
| nome        | String       | Nome completo               |
| email       | String       | Email (único)               |
| senha       | String       | Senha criptografada         |
| carrinho    | Array[Int]   | IDs dos produtos no carrinho|

**Produtos (`produtos`)**

| Campo          | Tipo          | Descrição                     |
|----------------|--------------|-------------------------------|
| id_produto     | Int (PK)     | ID do produto                |
| nome_produto   | String       | Nome do produto              |
| descricao      | String       | Descrição detalhada          |
| categoria      | String       | Categoria (camisetas, sapatos etc.) |
| preco          | Float        | Preço do produto             |
| img            | String       | Nome da imagem               |
| cores          | Array        | Array de cores {nome, hex}  |
| tamanhos       | Array        | Array de tamanhos disponíveis|
| material       | String       | Material do produto          |

---

## Variáveis de Ambiente (.env)

```dotenv
SECRET=<chave_jwt_secreta>
USUARIO_ADMIN=<usuario_admin>
PASSWORD_ADMIN=<senha_admin>
DATABASE_URL=<url_do_banco_postgres>

```

## Endpoints Principais

### Usuário

| Método | Endpoint          | Descrição                   |  
|--------|-------------------|-----------------------------|  
| GET    | /login            | Página de login             |  
| GET    | /register         | Página de cadastro          |  
| POST   | /login            | Autenticação do usuário     |  
| POST   | /register         | Criação de novo usuário     |  
| GET    | /account          | Página da conta do usuário  |  
| GET   | /account/delete    | Deletar conta do usuário    |  
| GET   | /account/logout    | Sai da conta do usuário     |  

### Produtos

| Método | Endpoint                         | Descrição                           |  
|--------|----------------------------------|-------------------------------------|  
| GET    | /produtos                        | Lista todos os produtos             |  
| GET    | /produto-single/:id                    | Página de um produto específico     |  
| GET    | /camisetas   | Lista todas as camisetas        |  
| GET    | /sapatos   | Lista todos os sapatos        |  
| GET    | /roupas-femininas   | Lista todas as roupas femininas        |  

### Carrinho  

| Método | Endpoint             | Descrição                     |  
|--------|----------------------|-------------------------------|  
| GET    | /carrinho            | Página do carrinho            |  
| POST   | /add-carrinho    | Adiciona produto ao carrinho  |  
| POST   | /carrinho/update-qtd    | Atualiza quantidade do produto no carrinho  |  
| POST   | /carrinho/remove    | Remove produto do carrinho  |  

### Rotas de Administração (Admin)

#### Autenticação

| Método | Endpoint        | Descrição                         |
|--------|-----------------|-----------------------------------|
| GET    | /admin          | Renderiza a página de login admin |
| POST   | /admin          | Autentica o administrador         |

---

#### Usuários

| Método | Endpoint                     | Descrição                                  |
|--------|------------------------------|--------------------------------------------|
| GET    | /admin/getAllUsers           | Lista todos os usuários (HTML / body)      |
| GET    | /admin/getAllUsersJSON       | Lista todos os usuários em formato JSON    |
| POST   | /admin/getAllUsers/delete    | Deleta um usuário                          |

---

#### Produtos

| Método | Endpoint                    | Descrição                                   |
|--------|-----------------------------|---------------------------------------------|
| GET    | /admin/getProdutos          | Lista todos os produtos (HTML / body)       |
| GET    | /admin/getProdutosJSON      | Lista todos os produtos em formato JSON     |
| GET    | /admin/createProduct        | Renderiza página de criação de produto      |
| POST   | /admin/createProduct        | Cria um novo produto (com upload de imagem) |
| POST   | /admin/getProdutos/delete   | Deleta um produto existente                 |
| POST   | /admin/getProdutos/update   | Atualiza um produto existente               |




## Instalação

1. Clone o repositório:
```bash
git clone <repo_url>
cd <repo_folder>
```
2. Instale as dependências:
```bash
npm install
```
3. Configure o **.env** com suas variáveis de ambiente.
4. Inicialize o Prisma e o banco de dados:
```bash
npx prisma migrate dev --name init
```
5. Inicie o servidor: 
```bash
npm run dev
```
5. Acesse o navegador: 
```bash
http://localhost:3000
```

## Autor

Mateus Barbosa

## Contato

**Email:** mateusbarbosadev@gmail.com  
**Telefone:** (81) 99762-6344  
**Linkedin:** https://www.linkedin.com/in/devmateusbarbosa/
