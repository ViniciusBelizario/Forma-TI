# Forma-TI

Sistema web com **frontend** (HTML/CSS/JS) e **backend** (API REST em Node.js), preparado para rodar **localmente** ou via **Docker Compose**.

## 📌 Objetivo do projeto
Aplicação para **gestão de cadastros e autenticação de usuários da Forma-TI**.  
Inclui:
- Camada de API para regras de negócio e persistência.
- Interface web para interação do usuário.
- Orquestração via Docker para desenvolvimento simplificado.

## 🏗️ Arquitetura
Forma-TI/
├── backend/ # API REST (Node.js/Express)
├── frontend/ # Interface web (HTML/CSS/JS ou templates)
└── docker-compose.yml # Orquestração dos serviços

### Backend
- **Node.js + Express** (API REST)
- Organização sugerida: `routes/`, `controllers/`, `services/`, `models/`, `middlewares/`
- Integração com banco via ORM/driver (Sequelize/Prisma/pg/mysql2 etc.)
- JWT para autenticação

### Frontend
- **HTML, CSS, JavaScript** (puro) ou templating (ex.: EJS)
- Páginas consumindo a API do backend

### Banco de dados
- Definido no `docker-compose.yml` (ex.: MySQL ou PostgreSQL) e por variáveis de ambiente do `backend`:
  - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`

## 🚀 Como executar

### Opção A) Docker Compose (recomendado)
1. Crie um arquivo `.env` em `backend/` com as variáveis mínimas (exemplo abaixo).  
2. No diretório raiz do projeto:
   ```bash
   docker compose up -d --build
Acesse:

API: http://localhost:3000

Frontend: http://localhost:5173
 ou http://localhost:8080

Exemplo de .env do backend

# App
PORT=3000
JWT_SECRET=troque_isto

# DB (ex.: MySQL)
DB_DIALECT=mysql
DB_HOST=db
DB_PORT=3306
DB_USER=forma_user
DB_PASS=forma_pass
DB_NAME=forma_db

# CORS
CORS_ORIGIN=http://localhost:5173


Opção B) Local (sem Docker)

Backend

cd backend
npm install
npm run dev    # ou npm start


cd frontend
npm install
npm run dev    # se usar bundler (ex.: Vite)


| Variável      | Descrição                           | Exemplo                 |
| ------------- | ----------------------------------- | ----------------------- |
| `PORT`        | Porta da API                        | `3000`                  |
| `JWT_SECRET`  | Chave para tokens JWT               | `minha_chave_segura`    |
| `DB_DIALECT`  | Tipo de banco (`mysql`, `postgres`) | `mysql`                 |
| `DB_HOST`     | Host do banco                       | `db`                    |
| `DB_PORT`     | Porta do banco                      | `3306`                  |
| `DB_USER`     | Usuário do banco                    | `forma_user`            |
| `DB_PASS`     | Senha do banco                      | `forma_pass`            |
| `DB_NAME`     | Nome do banco                       | `forma_db`              |
| `CORS_ORIGIN` | Origem permitida para o frontend    | `http://localhost:5173` |



🔗 Rotas (exemplo)

Auth

POST /auth/register – cria usuário

POST /auth/login – retorna JWT

GET /auth/me – dados do usuário logado

Entidades

GET /items – lista

POST /items – cria

PUT /items/:id – atualiza

DELETE /items/:id – remove
