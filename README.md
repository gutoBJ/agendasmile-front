# AgendaSmile

Sistema web para gerenciamento de consultas odontológicas desenvolvido com Angular, consumindo a API REST do AgendaSmile.

## Sobre o Projeto

O AgendaSmile é uma aplicação web desenvolvida para facilitar o gerenciamento de clínicas odontológicas. A plataforma permite o controle de pacientes, dentistas, especialidades e consultas, oferecendo uma interface intuitiva para administradores e profissionais.

Este projeto corresponde ao frontend da aplicação, responsável pela interface do usuário e comunicação com a API REST desenvolvida em Spring Boot.

## Tecnologias

### Frontend

* Angular 20
* TypeScript
* Angular Router
* Angular Material
* RxJS
* HTML5
* SCSS
* CSS3

## Arquitetura

```text
Usuário
    │
    ▼
AgendaSmile (Angular)
    │ HTTP/REST
    ▼
AgendaSmile API (Spring Boot)
    │
    ▼
PostgreSQL
```

## Funcionalidades

### Autenticação

* Login com JWT
* Controle de acesso por perfil
* Proteção de rotas

### Dashboard

* Visão geral das consultas
* Indicadores do sistema
* Resumo de atividades

### Gerenciamento de Usuários

* Listar usuários
* Cadastrar usuários
* Editar usuários
* Excluir usuários

### Gerenciamento de Pacientes

* Listar pacientes
* Cadastrar pacientes
* Editar pacientes

### Gerenciamento de Dentistas

* Listar dentistas
* Cadastrar dentistas
* Editar dentistas
* Desativar dentistas

### Gerenciamento de Especialidades

* Listar especialidades
* Cadastrar especialidades

### Gerenciamento de Consultas

* Listar consultas
* Agendar consultas
* Editar consultas
* Cancelar consultas

### Relatórios

* Consultas por paciente
* Consultas por dentista
* Consultas por especialidade
* Consultas por período
* Consultas por usuário

## Layout e Design

### Conceitos Utilizados

* Mobile First
* Design Responsivo
* Componentização
* Interface moderna e intuitiva

### Tipografia

* Poppins (texto geral)
* Inter (texto principal)

### Paleta de Cores

| Elemento   | Cor     |
| ---------- | ------- |
| Primária   | #2563EB |
| Secundária | #1E40AF |
| Sucesso    | #22C55E |
| Erro       | #EF4444 |
| Fundo      | #F8FAFC |
| Card       | #FFFFFF |

## Estrutura do Projeto

```text
src
├── app
│   ├── core
│   ├── shared
│   ├── pages
│   ├── services
│   ├── guards
│   ├── interceptors
│   └── models
│
├── assets
│
├── environments
│
└── styles
```

## Pré-requisitos

* Node.js 22+
* npm 10+
* Angular CLI 20+

## Instalação

### Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

### Entrar na pasta do projeto

```bash
cd frontend
```

### Instalar dependências

```bash
npm install
```

## Configuração

Arquivo:

```text
src/environments/environment.ts
```

```typescript
export const environment = {
  apiUrl: 'http://localhost:8080/api'
};
```

## Executando a Aplicação

```bash
ng serve
```

A aplicação estará disponível em:

```text
http://localhost:4200
```

## Fluxo de Navegação

### 1. Login

O usuário realiza autenticação utilizando e-mail e senha.

### 2. Dashboard

Após o login, o usuário é direcionado para o painel principal do sistema.

### 3. Gerenciamento

O usuário pode navegar entre:

* Usuários
* Pacientes
* Dentistas
* Especialidades
* Consultas
* Relatórios

### 4. Consultas

Permite:

* Agendar
* Editar
* Visualizar
* Cancelar consultas

## Integração com a API

A aplicação utiliza requisições HTTP para comunicação com a API REST.

### Principais recursos consumidos

* Autenticação
* Usuários
* Pacientes
* Dentistas
* Especialidades
* Consultas
* Relatórios

## Responsividade

A interface foi desenvolvida para funcionar em:

* Smartphones
* Tablets
* Notebooks
* Desktops

## Autor

**Augusto Chupernate**

Projeto desenvolvido como requisito do Projeto Final do programa Wise Start.
