# Omarket — Marketplace (Java + Spring Boot | Next.js | PostgreSQL)

O Omarket é um MarketPlace para produtos orgânicos. O sistema foi pensado para ser modular, escalável e fácil de manter — usando boas práticas (SOLID), padrões de projeto (ex.: Factory), cache com Redis, autenticação
por JWT e configuração centralizada com Spring Config. No frontend usamos Next.js com Tailwind CSS e componentes reutilizáveis; no backend, Spring Boot com PostgreSQL como banco relacional.

## Visão Geral

- __Backend:__ API REST em Java + Spring Boot — autenticação JWT, cache Redis, SpringConfig para centralização de configurações, uso de padrões (Factory, DTO,  etc.) e princípios SOLID.
- __Frontend:__ Interface com Next.js(React), organização em componentes, Tailwind CSS e integração com APIs externas.
- __Banco de dacos:__ PostgreSQL (relacional) — modelo e DER na pasta docs/
- __Cache/Session:__ Redis (rodando via Docker em desenvolvimento).

## Tecnologias

- __Backend:__ Java, Spring Boot, Spring Security (JWT), Spring Data JPA, Hibernate, Spring Config
- __Frontend:__ Next.js (React), Tailwind CSS, componentes reutilizáveis
- __Banco de dados:__ PostgreSQL + Hibernate de ORM
- __Cache:__ Redis (Docker)
- __Infra/Dev:__ Docker (para Redis — e opcionalmente Postgres), Maven/Gradle
- __ThunderClient:__ Teste das rotas no backend
- __Outras:__ API de frete integrada (consumo via serviço no backend)

## Estrutura do projeto

- __docs/__: Pasta onde se encontra todos as modelagnes UML, DER, documento de requisitos e protótipo de média fidelidade
- __backend/__: Pasta onde se encontra o código do backend (Java + SpringBoot)
- __frontend/__: Pasta onde se encontra o código do front (Next.js)

### Backend:

Dentro de  /backend/omarket/src/main/java/com/omarket/ :
- __config/__: Arquivo de configuração do cache o segurança
- __controller__: Código de todas as rotas do sistema, cada um em seu arquivo (ProdutoController.java, PedidoController.java, etc..)
- __service__: Camada com as regra de negócio + implementação (ProdutoService.java, PedidoService.java, etc..)
- __entity__: Entidades do sistema, tratados pelo ORM (Usuario.java, Produto.java, etc..)
- __dto__: Camada do padrão DTO para comunicação entre as camadas do sistema (ProdutoDTO.java, CategoriaDTO.java, etc..)
- __repository__: Camada que conversa com o banco de dados a partir do Spring Data JPA (UsuarioRepository.java, ProdutoRepository.java, etc..)
- __security__: Arquivos de segurança da autenticação JWT do usuário

> [!NOTE]
> Está sendo seguido os princípios SOLID, incluindo padrão de projetos

### Frontend:

- __public/__: Arquivos públicos como imagens
- __src/app__: Páginas, layouts e páginas do sistema
- __src/components__: Componentes que são reutilizáveis no sistema
- __src/context__: Pasta para contextos (autenticação, ...)
- __src/core__: Interfaces dos objetos utilizados
- __src/hooks__: Principais hooks personalizados do sistema
- __src/service__: Chamadas à API do backend(Comunicação com as rotas do backend)

> [!NOTE]
> Componentes organizados por pastas referentes à sua reuzabilidade
