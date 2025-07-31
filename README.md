# 🥤 Sistema de Fidelidade - Açaí Shop

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

**Sistema completo de gerenciamento de clientes com programa de fidelidade para loja de açaí**

[🚀 Como usar](#-como-usar) • [✨ Funcionalidades](#-funcionalidades) • [🛠️ Tecnologias](#️-tecnologias) • [📦 Instalação](#-instalação)

</div>

---

## 📋 Sobre o Projeto

Este é um sistema completo de gerenciamento de clientes para uma loja de açaí, desenvolvido com **React** no frontend e **Node.js** no backend. O sistema inclui um programa de fidelidade onde os clientes ganham estrelas a cada compra e recebem um açaí grátis ao completar 5 estrelas.

### 🎯 Principais Características

- ✅ **Cadastro de clientes** com validação de dados
- ⭐ **Sistema de fidelidade** com estrelas
- 🔍 **Busca em tempo real** por nome, email ou telefone
- 🗑️ **Gerenciamento completo** (criar, visualizar, deletar)
- 🎉 **Recompensas automáticas** ao completar 5 estrelas
- 📱 **Interface responsiva** e intuitiva

---

## ✨ Funcionalidades

### 👥 Gerenciamento de Clientes
- **Cadastro completo**: Nome, email e telefone
- **Validação de dados**: Email único e telefone único
- **Listagem dinâmica**: Todos os clientes em cards organizados
- **Exclusão segura**: Remoção de clientes com confirmação

### ⭐ Sistema de Fidelidade
- **Acumulação de estrelas**: +1 estrela por compra
- **Contador visual**: Exibição das estrelas atuais
- **Recompensa automática**: Açaí grátis ao completar 5 estrelas
- **Reset automático**: Estrelas voltam para 0 após ganhar o prêmio

### 🔍 Sistema de Busca
- **Busca em tempo real**: Resultados instantâneos
- **Múltiplos critérios**: Nome, email ou telefone
- **Case-insensitive**: Não diferencia maiúsculas/minúsculas
- **Feedback visual**: Mensagens quando não encontra resultados

### 🎨 Interface do Usuário
- **Design moderno**: Interface limpa e profissional
- **Ícones intuitivos**: Botões com ícones SVG
- **Responsividade**: Funciona em desktop e mobile
- **Feedback visual**: Alertas e mensagens informativas

---

## 🛠️ Tecnologias

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool e servidor de desenvolvimento
- **CSS Modules** - Estilização modular e organizada
- **Axios** - Cliente HTTP para comunicação com API

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web para APIs
- **Prisma** - ORM moderno para banco de dados
- **PostgreSQL** - Banco de dados relacional robusto

### Ferramentas
- **npm** - Gerenciador de pacotes
- **Git** - Controle de versão
- **CORS** - Cross-origin resource sharing

---

## 📦 Instalação

### Pré-requisitos
- Node.js (versão 16 ou superior)
- PostgreSQL instalado e configurado
- npm ou yarn

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/projeto-acai.git
cd projeto-acai
```

### 2. Configure o Backend
```bash
cd backend
npm install
```

### 3. Configure o Banco de Dados
```bash
# Configure as variáveis de ambiente (crie um arquivo .env)
cp .env.example .env

# Execute as migrações do Prisma
npx prisma migrate dev

# Gere o cliente Prisma
npx prisma generate
```

### 4. Configure o Frontend
```bash
cd ../frontend
npm install
```

### 5. Execute o Projeto

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 6. Acesse a Aplicação
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

---

## 🚀 Como Usar

### Cadastrando um Cliente
1. Preencha o formulário com nome, email e telefone
2. Clique em "Cadastrar"
3. O cliente aparecerá na lista automaticamente

### Adicionando Estrelas
1. Localize o cliente na lista
2. Clique no botão ➕ ao lado do nome
3. A estrela será adicionada instantaneamente

### Sistema de Recompensas
- **0-4 estrelas**: Acumulação normal
- **5 estrelas**: Cliente ganha açaí grátis automaticamente
- **Após 5 estrelas**: Contador reseta para 0

### Buscando Clientes
1. Digite no campo de busca
2. A pesquisa funciona por:
   - Nome (ex: "João")
   - Email (ex: "@gmail")
   - Telefone (ex: "123")

### Deletando Clientes
1. Clique no botão 🗑️ ao lado do cliente
2. O cliente será removido da lista

---

## 📁 Estrutura do Projeto

```
projeto-acai/
├── frontend/                 # Aplicação React
│   ├── src/
│   │   ├── pages/Home/      # Página principal
│   │   ├── services/        # Configuração da API
│   │   ├── assets/          # Ícones e imagens
│   │   └── main.jsx         # Ponto de entrada
│   └── package.json
│
├── backend/                  # API Node.js
│   ├── server.js            # Servidor Express
│   ├── prisma/              # Configuração do banco
│   └── package.json
│
└── README.md                # Este arquivo
```

---

## 🔌 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/usuarios` | Criar novo cliente |
| `GET` | `/usuarios` | Listar todos os clientes |
| `PUT` | `/usuarios/:id` | Adicionar estrela |
| `PUT` | `/usuarios/:id/reset-stars` | Resetar estrelas para 0 |
| `DELETE` | `/usuarios/:id` | Deletar cliente |

---

## 🎨 Screenshots

### Tela Principal
![Tela Principal](/frontend/public/images-project/tela-principal.jpg)

### Sistema de Estrelas
![Sistema de Estrelas](/frontend/public//images-project/estrelas.jpg)

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 👨‍💻 Autor

**Seu Nome**
- GitHub: [@micas-tsx](https://github.com/micas-tsx)
- LinkedIn: [micael abud](https://linkedin.com/in/micael-abud)

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela! ⭐**

</div> 