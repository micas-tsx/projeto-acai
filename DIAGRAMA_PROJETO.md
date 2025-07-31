# Diagrama Completo do Projeto Açaí

## 📋 Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                        PROJETO AÇAÍ                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    HTTP/API    ┌─────────────────┐        │
│  │   FRONTEND      │ ◄────────────► │    BACKEND      │        │
│  │   (React)       │                │   (Node.js)     │        │
│  │                 │                │                 │        │
│  │  • Vite         │                │  • Express      │        │
│  │  • React        │                │  • Prisma       │        │
│  │  • CSS Modules  │                │  • PostgreSQL   │        │
│  └─────────────────┘                │  • CORS         │        │
│                                     └─────────────────┘        │
│                                              │                  │
│                                              │ Prisma Client    │
│                                              ▼                  │
│                                     ┌─────────────────┐        │
│                                     │   DATABASE      │        │
│                                     │  PostgreSQL     │        │
│                                     │                 │        │
│                                     │  • Users Table  │        │
│                                     │  • Migrations   │        │
│                                     └─────────────────┘        │
└─────────────────────────────────────────────────────────────────┘
```

## 🗂️ Estrutura de Arquivos

```
projeto-acai/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home/
│   │   │       ├── Index.jsx          # Componente principal
│   │   │       └── Index.css          # Estilos do componente
│   │   ├── services/
│   │   │   └── api.js                 # Configuração da API
│   │   ├── assets/
│   │   │   ├── plus.svg               # Ícone de adicionar estrela
│   │   │   └── trash.svg              # Ícone de deletar
│   │   ├── main.jsx                   # Ponto de entrada
│   │   └── index.css                  # Estilos globais
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── server.js                      # Servidor Express
    ├── package.json
    └── prisma/
        ├── schema.prisma              # Schema do banco
        └── migrations/                # Migrações do banco
```

## 🗄️ Modelo de Dados (Database Schema)

```sql
-- Tabela: User
CREATE TABLE "User" (
    id    SERIAL PRIMARY KEY,
    name  VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    stars INTEGER DEFAULT 0,
    tel   VARCHAR UNIQUE
);
```

## 🔄 Fluxo de Dados

### 1. Cadastro de Usuário
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Formulário│───►│   Frontend  │───►│   Backend   │───►│   Database  │
│   (React)   │    │   (API)     │    │  (Express)  │    │ (PostgreSQL)│
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │ POST /usuarios    │ POST /usuarios    │ Prisma.create()   │
       │ {name,email,tel}  │ {name,email,tel}  │ User.create()     │
       │                   │                   │                   │
       │                   │                   │ 201 Created       │
       │                   │ ◄─────────────────│ ◄─────────────────│
       │ ◄─────────────────│                   │                   │
       │ Sucesso/Erro      │                   │                   │
```

### 2. Listagem de Usuários
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Frontend  │───►│   Backend   │───►│   Database  │    │   Frontend  │
│   (useEffect)│   │  (Express)  │    │ (PostgreSQL)│    │   (useState) │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │ GET /usuarios     │ GET /usuarios     │ Prisma.findMany() │
       │                   │                   │                   │
       │                   │                   │ [{users: [...]}]  │
       │                   │ ◄─────────────────│ ◄─────────────────│
       │ ◄─────────────────│                   │                   │
       │ setUsers(data)    │                   │                   │
```

### 3. Adicionar Estrela
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Frontend  │───►│   Backend   │───►│   Database  │    │   Frontend  │
│   (Button)  │    │  (Express)  │    │ (PostgreSQL)│    │   (Refresh) │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │ PUT /usuarios/:id │ PUT /usuarios/:id │ Prisma.update()   │
       │                   │                   │ stars++           │
       │                   │                   │                   │
       │                   │                   │ 200 OK            │
       │                   │ ◄─────────────────│ ◄─────────────────│
       │ ◄─────────────────│                   │                   │
       │ getUsers()        │                   │                   │
```

### 4. Deletar Usuário
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Frontend  │───►│   Backend   │───►│   Database  │    │   Frontend  │
│   (Button)  │    │  (Express)  │    │ (PostgreSQL)│    │   (Refresh) │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │ DELETE /usuarios/:id│ DELETE /usuarios/:id│ Prisma.delete() │
       │                   │                   │ User.delete()     │
       │                   │                   │                   │
       │                   │                   │ 200 OK            │
       │                   │ ◄─────────────────│ ◄─────────────────│
       │ ◄─────────────────│                   │                   │
       │ getUsers()        │                   │                   │
```

## 🔌 Endpoints da API

| Método | Endpoint | Descrição | Request Body | Response |
|--------|----------|-----------|--------------|----------|
| POST | `/usuarios` | Criar usuário | `{name, email, tel}` | `{user}` |
| GET | `/usuarios` | Listar usuários | - | `{users: [...]}` |
| PUT | `/usuarios/:id` | Adicionar estrela | `{stars}` | 200 OK |
| DELETE | `/usuarios/:id` | Deletar usuário | - | 200 OK |

## 🎨 Componentes React

```
Home (Index.jsx)
├── State Management
│   ├── users (useState) - Lista de usuários
│   └── Refs para inputs (useRef)
│
├── Functions
│   ├── getUsers() - Buscar usuários da API
│   ├── createUsers() - Criar novo usuário
│   ├── deleteUser(id) - Deletar usuário
│   └── addStar(id) - Adicionar estrela
│
├── UI Components
│   ├── Form de Cadastro
│   │   ├── Input Nome
│   │   ├── Input Email
│   │   ├── Input Telefone
│   │   └── Button Cadastrar
│   │
│   └── Lista de Usuários
│       └── User Card
│           ├── Info do Usuário
│           │   ├── Nome
│           │   ├── Email
│           │   ├── Telefone
│           │   └── Estrelas
│           └── Action Buttons
│               ├── Button + (addStar)
│               └── Button 🗑️ (deleteUser)
```

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React** - Biblioteca JavaScript para UI
- **Vite** - Build tool e dev server
- **CSS Modules** - Estilização modular
- **Axios** - Cliente HTTP (via api.js)

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **CORS** - Cross-origin resource sharing

### Ferramentas
- **npm** - Gerenciador de pacotes
- **Git** - Controle de versão

## 🔧 Configurações Importantes

### Frontend (Vite)
- Porta: 5173 (padrão Vite)
- Hot reload habilitado
- Build otimizado para produção

### Backend (Express)
- Porta: 3000
- CORS habilitado para frontend
- JSON parsing habilitado

### Database (PostgreSQL)
- Conectado via Prisma
- Migrations automáticas
- Schema versionado

## 🚀 Fluxo de Desenvolvimento

1. **Desenvolvimento**
   - Frontend: `npm run dev` (porta 5173)
   - Backend: `node server.js` (porta 3000)
   - Database: PostgreSQL rodando

2. **Deploy**
   - Frontend: Build com Vite
   - Backend: Node.js em produção
   - Database: PostgreSQL em produção

## 📊 Métricas e Monitoramento

- **Performance**: Vite para build rápido
- **Erro Handling**: Try/catch em todas as operações
- **Logging**: Console.log para debug
- **Validation**: Validação de email e campos obrigatórios

---

*Este diagrama serve como documentação completa do projeto e pode ser usado como referência para desenvolvimento, manutenção e onboarding de novos desenvolvedores.* 