# 🎮 Portfólio Profissional Estilo Steam (Desktop Client)

Documento vivo de arquitetura, visão do produto, status de implementação e roadmap para o desenvolvimento do portfólio profissional interativo inspirado na interface e experiência do aplicativo desktop da **Steam** (Valve).

---

## 📌 1. Visão Geral e Proposta de Valor

- **Objetivo**: Criar um portfólio profissional dinâmico, moderno e imersivo, fugindo da monotonia dos portfólios convencionais.
- **Conceito**: Simular a interface e a experiência de usuário do **aplicativo de desktop da Steam**, adaptando os elementos clássicos da plataforma para apresentar a carreira do desenvolvedor:
  - **Jogos / Títulos da Loja**: Projetos autorais de desenvolvimento (Web, Games, Mobile, Backend, etc.).
  - **Biblioteca (Library)**: Seção interativa onde o visitante pode "iniciar" projetos (Live Demo), inspecionar código-fonte (GitHub), ver histórico de versões e métricas.
  - **Conquistas (Achievements)**: Certificações, habilidades técnicas e metas de carreira desbloqueadas.
  - **Análises de Usuários (Steam Reviews)**: Recomendações e depoimentos de colegas, clientes e recrutadores.
  - **Perfil Steam**: Resumo profissional, nível de experiência, insígnias de tecnologias e links para contato.
- **Stack Tecnológica Principal**:
  - **Frontend**: React 18 + Vite
  - **Estilização**: CSS Modular puro (Vanilla CSS com Design Tokens da Steam)
  - **Ícones**: Lucide React + SVGs personalizados oficiais da Valve
  - **Backend / BaaS**: Firebase (Authentication para visitantes/recrutadores e Firestore Database para dados dinâmicos, avaliações e comentários)
  - **Padrão Arquitetural**: Clean Architecture adaptada ao ecossistema React

---

## 🔍 2. Análise: Especificado vs. Implementado

### ✅ O que já está implementado no código:
1. **Réplica Visual de Alta Fidelidade da Loja (Steam Store)**:
   - **`SteamHeader.jsx`**: Barra superior com logotipo oficial Steam (SVG vetorizado), abas de navegação principais (Loja, Comunidade, Sobre, Suporte), botão de download ("Instalar o Steam"), sino de notificações interativo com badge e widget de perfil ("GamerDeveloper") com saldo fictício na carteira.
   - **`StoreNavbar.jsx`**: Sub-barra azul escura com itens de navegação ("Sua Loja", "Novidades e Destaques", "Categorias", etc.) e barra de busca integrada.
   - **`FeaturedCarousel.jsx`**: Carrossel de destaque principal funcional, exibindo capas de jogos, alternância automática/manual de screenshots no hover, tags de gênero, status de lançamento e preço/desconto.
   - **`SpecialOffers.jsx`**: Seção em grid de ofertas especiais com banners promocionais e tags de desconto em porcentagem (-50%, -20%).
   - **`CategoryCards.jsx`**: Carrossel/cards rápidos de navegação por categorias de destaque.
   - **`BrowseTabs.jsx`**: Abas interativas ("Novidades", "Mais Vendidos", "Mais Jogados", etc.) com lista detalhada de itens, preços e compatibilidade de plataformas.
   - **`LeftSidebar.jsx`**: Barra lateral esquerda com atalhos de cartões de presente, marcadores recomendados e navegação rápida por tags.
   - **`SteamFooter.jsx`**: Rodapé institucional estilizado com links legais, copyright e aviso de responsabilidade do portfólio.
2. **Sistema de Estilos Base da Steam**:
   - `variables.css`: Paleta de cores oficial (#171a21, #1b2838, #2a475e, #66c0f4, #c7d5e0, etc.), sombras, bordas e gradientes característicos da Valve.
   - `global.css`, `header.css`, `carousel.css`, `sections.css`: Folhas de estilo modularizadas com scrollbars customizadas e tipografia via Google Fonts (Inter / Noto Sans).
3. **Base de Dados Mockada**:
   - `src/core/mock/steamData.js`: Dados iniciais com imagens e capturas da CDN oficial da Steam.

---

### ⏳ O que está pendente de implementação:
1. **Conversão dos Dados para o Portfólio Pessoal**:
   - Substituir os jogos mockados comerciais (Cyberpunk, Baldur's Gate, etc.) pelos **projetos e jogos reais do desenvolvedor**, mantendo o estilo de apresentação visual da Steam (screenshots reais, tags de tecnologias: React, Node.js, C#, Unity, etc.).
2. **Interface da Biblioteca (Steam Library UI)**:
   - Implementar a aba da **Biblioteca**:
     - Barra lateral esquerda com lista de projetos/jogos agrupados por categoria/status.
     - Painel central com imagem de fundo, botão verde vibrante **"JOGAR"** (ou **"ABRIR PROJETO"**), link para **Repositório GitHub**, estatísticas de tempo de desenvolvimento e conquistas do projeto.
3. **Integração com Firebase (Auth & Database)**:
   - Configuração do SDK do Firebase (`src/infrastructure/firebase`).
   - Autenticação (Google / GitHub / Anônimo) para que recrutadores possam curtir projetos e deixar "Análises de Usuários" (Steam Reviews).
   - Firestore para armazenar análises, projetos dinâmicos e métricas.
4. **Navegação de Telas e Abas**:
   - Mecanismo de alternância entre as visões da Steam: **Loja** (vitrine), **Biblioteca** (meus projetos/demos), **Comunidade** (posts/artigos) e **Perfil** (currículo, bio e conquistas).
5. **Ajuste para Clean Architecture Completa**:
   - Reestruturar pastas separando regras de domínio, casos de uso, repositórios e componentes de apresentação.

---

## 🏛️ 3. Estrutura Arquitetural (Clean Architecture)

A estrutura de diretórios foi planejada para desacoplar as regras de negócio e fontes de dados da interface do React:

```
src/
├── core/                       # Domínio e regras centrais do negócio
│   ├── entities/               # Entidades de dados tipadas (Projeto, Conquista, Review, Perfil)
│   │   ├── Project.js
│   │   ├── Achievement.js
│   │   ├── Review.js
│   │   └── UserProfile.js
│   ├── useCases/               # Casos de uso da aplicação
│   │   ├── getFeaturedProjects.js
│   │   ├── getProjectDetails.js
│   │   ├── submitProjectReview.js
│   │   └── unlockAchievement.js
│   └── mock/                   # Mocks para desenvolvimento offline
│       ├── projectsData.js     # Projetos e jogos do desenvolvedor
│       └── profileData.js      # Dados de conquistas, badges e perfil
│
├── infrastructure/             # Serviços externos, APIs e persistência
│   ├── firebase/
│   │   ├── firebaseConfig.js   # Inicialização do Firebase
│   │   ├── authService.js      # Login via Google/GitHub
│   │   └── firestoreService.js # Operações do Firestore (reviews, projetos)
│   └── repositories/           # Implementação dos repositórios
│       ├── ProjectRepository.js
│       └── ReviewRepository.js
│
├── presentation/ (ou components/)
│   ├── layout/                 # Estruturas globais de layout
│   │   ├── SteamHeader.jsx     # Header global da Steam
│   │   ├── StoreNavbar.jsx     # Subnav da Loja
│   │   ├── LeftSidebar.jsx     # Sidebar de filtros da Loja
│   │   └── SteamFooter.jsx     # Rodapé Valve
│   ├── store/                  # Telas e componentes da Loja (Home)
│   │   ├── FeaturedCarousel.jsx
│   │   ├── SpecialOffers.jsx
│   │   ├── CategoryCards.jsx
│   │   └── BrowseTabs.jsx
│   ├── library/                # Componentes da Biblioteca Steam (Desktop UI)
│   │   ├── LibrarySidebar.jsx  # Lista de jogos na esquerda com busca
│   │   ├── GameDetailView.jsx  # Tela do jogo selecionado (Hero, Botão Jogar)
│   │   └── GameAchievements.jsx
│   ├── profile/                # Página de Perfil estilo Steam
│   │   ├── ProfileHeader.jsx   # Avatar, nível Steam, badge de destaque
│   │   ├── ShowcaseWidget.jsx  # Vitrine de projetos favoritos
│   │   └── AchievementsList.jsx# Lista de conquistas desbloqueadas
│   └── shared/                 # Componentes reutilizáveis
│       ├── Button.jsx
│       ├── Modal.jsx
│       └── SteamBadge.jsx
│
├── context/                    # Estado global da aplicação
│   ├── AuthContext.jsx         # Estado de autenticação do usuário
│   └── NavigationContext.jsx   # Controle da tela ativa (Loja / Biblioteca / Perfil)
│
└── styles/                     # Sistema de estilos Vanilla CSS
    ├── variables.css           # Tokens de cores, sombras e fontes
    ├── global.css              # Reset e utilitários
    ├── header.css              # Estilos de cabeçalho e navegação
    ├── carousel.css            # Estilos de carrossel de destaque
    ├── library.css             # Estilos dedicados à biblioteca Steam
    └── profile.css             # Estilos do perfil e conquistas
```

---

## 🎯 4. Funcionalidades Detalhadas

### 4.1. Aba LOJA (Store - Vitrine do Desenvolvedor)
- **Destaques e Recomendados**: Carrossel com os projetos mais impressionantes (screenshots em alta resolução, tecnologias usadas como "tags", links diretos e status).
- **Categorias**: Filtros rápidos por área de atuação (ex: *Frontend*, *Fullstack*, *Game Dev*, *Mobile*, *APIs & Backend*).
- **Lista de Títulos (Novidades / Mais Populares)**: Lista dinâmica dos repositórios e projetos com número de estrelas no GitHub simulando "avaliações extremamente positivas".
- **Página de Detalhes do Projeto (Store Page)**:
  - Galeria de mídias e vídeos/GIFs do projeto funcionando.
  - Requisitos do sistema (ex: Node.js 18+, Docker, Navegador moderno).
  - Seção de "Análises de Usuários": feedback de visitantes autenticados.

### 4.2. Aba BIBLIOTECA (Library - Experiência Desktop Steam)
- Layout clássico com **Sidebar lateral esquerdo** com lista de projetos/jogos instalados e ícones.
- **Painel Principal do Projeto**:
  - Banner hero dinâmico com arte do projeto.
  - Botão grande verde **"JOGAR"**: abre o Live Demo do projeto em nova aba (ou modal incorporado).
  - Botão secundário **"CÓDIGO FONTE"**: redireciona para o GitHub.
  - Bloco de **Tempo de Desenvolvimento** (ex: *120 horas registradas*).
  - Bloco de **Conquistas do Projeto** (ex: *100% de cobertura de testes*, *Deploy CI/CD automatizado*).

### 4.3. Aba PERFIL (Steam Profile & Conquistas)
- **Nível Steam**: Calculado com base em anos de experiência ou número de projetos concluídos.
- **Insígnias (Badges)**: Ícones temáticos para cada stack dominante (ex: *Mestre do JavaScript*, *Arquiteto React*, *Firebase Wizard*).
- **Conquistas Desbloqueadas**: Grade de conquistas com data de desbloqueio (ex: *Primeiro commit*, *Formação acadêmica*, *Hackathon participado*).
- **Links Sociais**: GitHub, LinkedIn, E-mail, Currículo PDF para download rápido estilizado como documento Steam.

### 4.4. Backend e Gamificação com Firebase
- **Firebase Auth**: Login rápido com Google/GitHub para que recrutadores possam interagir.
- **Firestore Database**:
  - Salvar comentários e avaliações (Positiva / Negativa) nas páginas de projetos.
  - Contador de curtidas e favoritos ("Adicionar à Lista de Desejos").

---

## 🚀 5. Roadmap de Próximos Passos

| Fase | Descrição | Status |
| :--- | :--- | :---: |
| **Fase 1** | Criação da interface inicial da Home da Loja Steam (Header, Carousel, Seções, Footer) | Concluído ✅ |
| **Fase 2** | Gerenciamento de estado de navegação (Loja vs. Biblioteca vs. Perfil) e Navbar funcional | Próximo 🔄 |
| **Fase 3** | Criação dos dados reais do portfólio (projetos, screenshots, tags de techs e links) | Pendente ⏳ |
| **Fase 4** | Implementação da UI da **Biblioteca Steam** (Sidebar + Painel de Ação/Demo) | Pendente ⏳ |
| **Fase 5** | Implementação da página de **Perfil Steam** com Conquistas e Insígnias | Pendente ⏳ |
| **Fase 6** | Configuração do Firebase (Auth para visitantes e Firestore para reviews) | Pendente ⏳ |
| **Fase 7** | Refatoração de pastas para conformidade estrita com Clean Architecture | Pendente ⏳ |
| **Fase 8** | Polimento de responsividade mobile e efeitos sonoros opcionais da Steam | Pendente ⏳ |