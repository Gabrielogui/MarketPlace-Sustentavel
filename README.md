# Omarket — Marketplace de Produtos Orgânicos

[![Java](https://img.shields.io/badge/Java-21-blue.svg?style=for-the-badge&logo=java)](https://www.java.com/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.4.5-green.svg?style=for-the-badge&logo=spring)](https://spring.io/projects/spring-boot)
[![Next.js](https://img.shields.io/badge/Next.js-15.3-black.svg?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13-blue.svg?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-latest-red.svg?style=for-the-badge&logo=redis)](https://redis.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

O Omarket é um marketplace robusto e escalável focado em produtos orgânicos, conectando produtores locais a consumidores conscientes. A plataforma foi projetada com uma arquitetura moderna, utilizando as melhores práticas de desenvolvimento para garantir performance, segurança e manutenibilidade.

![Protótipo do Omarket](docs/prototipo/Prototipo.png)

## 🎯 Visão Geral do Projeto

O objetivo do Omarket é criar um ecossistema digital que facilite o acesso a produtos orgânicos de qualidade, fortalecendo a agricultura local e promovendo um estilo de vida mais saudável e sustentável.

-   **Backend:** Uma API RESTful segura e eficiente construída com **Java e Spring Boot**. A arquitetura segue os princípios **SOLID** e utiliza padrões de projeto como DTO (Data Transfer Object) e Factory para garantir um código limpo e desacoplado. A segurança é gerenciada com **Spring Security e JWT**, e a performance é otimizada com cache em **Redis**.
-   **Frontend:** Uma interface de usuário dinâmica e responsiva desenvolvida com **Next.js (React)** e **TypeScript**. A estilização é feita com **Tailwind CSS**, e a interface é construída sobre um sistema de componentes reutilizáveis (shadcn) para garantir consistência e agilidade no desenvolvimento.
-   **Infraestrutura:** O ambiente de desenvolvimento é containerizado com **Docker**, simplificando a configuração e a execução do banco de dados **PostgreSQL** e do cache **Redis**.

## ✨ Funcionalidades Principais

-   **Autenticação e Perfis de Usuário:** Sistema de login e cadastro com diferentes perfis (Cliente, Fornecedor, Administrador).
-   **Catálogo de Produtos:** Fornecedores podem gerenciar seus produtos (criar, editar, inativar).
-   **Busca e Filtros:** Clientes podem buscar produtos por nome, categoria e outros filtros.
-   **Carrinho de Compras:** Funcionalidade completa para adicionar, remover e atualizar itens no carrinho.
-   **Gestão de Pedidos e Pagamentos:** Fluxo de checkout com cálculo de frete (simulado) e integração com API de pagamento.
-   **Avaliações de Produtos:** Clientes podem avaliar os produtos que compraram.
-   **Lista de Favoritos:** Os usuários podem salvar seus produtos preferidos.

## 🛠️ Tecnologias e Ferramentas

| Categoria      | Tecnologias                                                                                                |
| :------------- | :--------------------------------------------------------------------------------------------------------- |
| **Backend** | Java 21, Spring Boot 3.4.5, Spring Security (JWT), Spring Data JPA, Hibernate, Maven, Lombok                |
| **Frontend** | Next.js 15.3, React 19, TypeScript, Tailwind CSS, shadcn/ui, Lucide Icons, Axios, Zod                        |
| **Banco de Dados** | PostgreSQL 13                                                                                            |
| **Cache** | Redis                                                                                                      |
| **Infraestrutura** | Docker, Docker Compose                                                                                   |
| **Testes de API** | Bruno (Coleção de requisições disponível em `docs/omarket-bruno`)                                          |

## 🚀 Como Executar o Projeto Localmente

Para rodar o projeto em seu ambiente local, siga os passos abaixo.

### Pré-requisitos

-   [Java JDK 21](https://www.oracle.com/java/technologies/downloads/#java21)
-   [Apache Maven 3.8+](https://maven.apache.org/download.cgi)
-   [Node.js 20+](https://nodejs.org/)
-   [Docker](https://www.docker.com/products/docker-desktop/) e [Docker Compose](https://docs.docker.com/compose/install/)

### 1. Clonar o Repositório

```bash
git clone [https://github.com/seu-usuario/marketplace-sustentavel.git](https://github.com/seu-usuario/marketplace-sustentavel.git)
cd marketplace-sustentavel
```

### 2. Configurar a Infraestrutura com Docker

O PostgreSQL e o Redis podem ser iniciados facilmente com um único comando a partir da pasta `docker/`.

```bash
cd docker/
docker-compose up -d
```

Isso irá iniciar os containers do banco de dados na porta 5433 e do Redis na porta 6379.

### 3. Configurar e Rodar o Backend

1.  Navegue até a pasta do backend:
    ```bash
    cd backend/omarket/
    ```

2.  Instale as dependências do Maven:
    ```bash
    mvn clean install
    ```

3.  Execute a aplicação Spring Boot:
    ```bash
    mvn spring-boot:run
    ```

A API estará disponível em `http://localhost:8080`.

### 4. Configurar e Rodar o Frontend

1.  Navegue até a pasta do frontend em um novo terminal:
    ```bash
    cd frontend/omarket-frontend/
    ```

2.  Instale as dependências do Node.js:
    ```bash
    npm install
    ```

3.  Execute a aplicação Next.js em modo de desenvolvimento:
    ```bash
    npm run dev
    ```

A aplicação estará disponível em `http://localhost:3000`.

## 🏛️ Arquitetura do Software

O projeto é organizado em monorepo com duas pastas principais: `backend` e `frontend`.

### Estrutura do Backend

O backend segue uma arquitetura em camadas para separar as responsabilidades:

-   `src/main/java/com/omarket/`
    -   `controller/`: Camada de entrada da API, responsável por receber as requisições HTTP e direcioná-las.
    -   `service/`: Contém a lógica de negócio da aplicação.
    -   `repository/`: Camada de acesso a dados, utilizando Spring Data JPA para interagir com o PostgreSQL.
    -   `entity/`: Mapeamento das tabelas do banco de dados em objetos Java (JPA Entities).
    -   `dto/`: Objetos de Transferência de Dados para comunicação entre as camadas.
    -   `security/`: Configurações de segurança, filtros e serviços relacionados ao JWT.
    -   `config/`: Configurações de Beans do Spring, como Cache e Segurança.

### Estrutura do Frontend

O frontend utiliza a estrutura de diretórios do Next.js (App Router):

-   `src/`
    -   `app/`: Definição das rotas, páginas e layouts da aplicação.
    -   `components/`: Componentes React reutilizáveis (ex: botões, cards, modais).
    -   `service/`: Funções para realizar chamadas à API do backend.
    -   `context/`: Contextos globais da aplicação (ex: autenticação).
    -   `core/`: Definições de tipos e interfaces TypeScript.
    -   `hooks/`: Hooks personalizados do React para lógicas reutilizáveis.

## 🤝 Colaboradores

Este projeto foi desenvolvido com dedicação por:

| [<img src="https://avatars.githubusercontent.com/u/108970349?v=4" width="100px;"/><br /><sub><b>Gabriel Rodrigues</b></sub>](https://github.com/Gabrielogui) | [<img src="https://avatars.githubusercontent.com/u/89662369?v=4" width="100px;"/><br /><sub><b>Luiz Vinícius</b></sub>](https://github.com/luizvn) |
| :---: | :---: |
| [GitHub](https://github.com/Gabrielogui) <br /> [LinkedIn](https://www.linkedin.com/in/gabriel-rodrigues-a551012a2/) | [GitHub](https://github.com/luizvn) <br /> [LinkedIn](https://www.linkedin.com/in/luizvn/) |
