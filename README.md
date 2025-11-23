# ApepStore

**ApepStore** é uma loja virtual de roupas desenvolvida em Node.js com Express, Prisma ORM e PostgreSQL. Esta aplicação serve como um sistema de backend para gerenciar usuários, produtos e pedidos de forma simples e escalável.

---

## 🚀 Funcionalidades

- Gerenciamento de usuários (cadastro, login, perfil)  
- CRUD de produtos (criação, leitura, atualização, exclusão)  
- Persistência de dados com PostgreSQL via ORM Prisma  
- Rotas organizadas com Express  
- Front-end simples usando EJS (templates)  
- Suporte a testes automatizados com Jest  

---

## 🧱 Arquitetura e Estrutura de Pastas

/  
├── controllers/  
├── infra/  
├── models/  
├── prisma/  
├── routes/  
├── public/  
├── views/   
├── tests/  
├── .env.developer  
├── server.js  
└── package.json  

---

## 📦 Tecnologias Utilizadas

- **Node.js** — servidor backend  
- **Express** — framework para criação de rotas e APIs  
- **Prisma ORM** — para mapeamento objeto-relacional com PostgreSQL  
- **PostgreSQL** — banco de dados relacional  
- **EJS** — para renderização de páginas no servidor  
- **Jest** — para testes unitários e de integração  
- **dotenv** — para gerenciamento de variáveis de ambiente  

---

## 🛠️ Pré-requisitos

- Node.js (versão LTS recomendada)  
- PostgreSQL rodando localmente ou em servidor acessível  
- Variáveis de ambiente configuradas (`.env`)  

---

## ⚙️ Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/MateusBarbosa1/ApepStore.git
   cd ApepStore

2. Instale as dependências:

    ```bash
    npm install

3. Configure o banco de dados:

- Crie um banco no PostgreSQL
- Renomeie .env.developer para .env (ou crie seu arquivo .env)
- Preencha as variáveis de ambiente necessárias (como DATABASE_URL)

4. Gere o cliente Prisma:

    ```
    npx prisma generate

5. Execute as migrations:

    ```
    npx prisma migrate dev --name init
    
6. Inicie a aplicação:

    ```
    npm run dev
    
## ✅ Como usar a aplicação

- Acesse http://localhost:3000 (ou a porta configurada) no navegador
- Cadastre novos usuários
- Crie, edite e exclua produtos (se a interface permitir)
- Use as rotas da API para operações CRUD (via Postman, Insomnia ou frontend)

## 📄 Licença

Este projeto está licenciado sob a MIT License.

## 🙋 Autor

- **Mateus Barbosa** — Desenvolvedor principal

## 🧭 Próximos Passos / Roadmap

- [ ] Implementar autenticação e autorização (login, logout, permissões)
- [ ] Painel de Gestão /admin
- [ ] Adicionar upload de imagens para produtos
- [ ] Adicionar carrinho de compras e sistema de pedidos
- [ ] Adicionar CI/CD (testes automatizados, deploy)