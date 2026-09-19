# 🎮 Portfólio Profissional Estilo Steam (Desktop Client)

Documento vivo de arquitetura, visão do produto, status real de implementação e roadmap para o desenvolvimento do portfólio profissional interativo inspirado na interface e experiência do aplicativo desktop da **Steam** (Valve).

---

## 📌 1. Visão Geral e Proposta de Valor

- **Objetivo**: Criar um portfólio profissional dinâmico, moderno e de alta fidelidade visual, fugindo da monotonia dos portfólios convencionais.
- **Conceito**: Simular a interface e a experiência de usuário do **aplicativo de desktop da Steam**, adaptando os elementos clássicos da plataforma para apresentar a carreira do desenvolvedor (**Rafael Fagnin / GamerDeveloper**):
  - **Jogos / Títulos da Loja (Store)**: Projetos autorais de desenvolvimento (Web, Games, Mobile, Backend, etc.) apresentados com banners, galerias de capturas, requisitos e tags técnicas.
  - **Biblioteca (Library)**: Seção interativa onde o visitante pode gerenciar projetos instalados, "iniciar" projetos (Live Demo interativo), inspecionar código-fonte (GitHub), registrar tempo de uso (playtime) e acompanhar conquistas técnicas.
  - **Página do Produto (Game Page)**: Página detalhada de cada projeto com simulação de download progressivo e adição direta à biblioteca.
  - **Perfil Steam**: Perfil social gamer completo com nível Steam, insígnias de tecnologia, vitrines de destaques, estatísticas, atividade recente e mural de comentários (+rep) interativo.
  - **Conquistas (Achievements)**: Certificações, habilidades técnicas e marcos de carreira desbloqueados.
- **Stack Tecnológica Principal**:
  - **Frontend**: React 18.3 + Vite 5.4
  - **Estilização**: CSS Modular puro (Vanilla CSS com Design Tokens oficiais da Valve/Steam, sem dependência de frameworks utilitários externos)
  - **Ícones**: Lucide React + SVGs vetorizados oficiais da Valve
  - **Backend / BaaS**: Firebase 12.19 (Authentication para login anônimo/visitante e contas de recrutadores; Firestore Database para persistência de biblioteca, perfis e comentários)
  - **Arquitetura**: Component-based React desacoplado com serviços de infraestrutura resilientes (com fallbacks locais automáticos no `localStorage` para funcionamento offline total).

---

## 🔍 2. Análise: Especificado vs. Implementado

### ✅ O que já está implementado no código:

#### 1. Réplica Visual de Alta Fidelidade da Loja (Steam Store):
- **`SteamHeader.jsx`**: Cabeçalho global com logotipo oficial Steam vetorizado, navegação por abas ativas (**LOJA**, **BIBLIOTECA**, **PERFIL**, **COMUNIDADE**, **SOBRE**), botão "Instalar o Steam", sino de notificações com badge, widget de perfil do usuário ("GamerDeveloper") com avatar, status de carteira e menu dropdown interativo com ações de login, perfil e encerramento de sessão.
- **`StoreNavbar.jsx`**: Sub-barra azul escura com categorias de navegação ("Sua Loja", "Novidades e Destaques", "Categorias", "Pontos", "Notícias") e campo de busca integrado com ícone de lupa.
- **`FeaturedCarousel.jsx`**: Carrossel hero principal funcional, exibindo capas de destaque, alternância dinâmica de screenshots ao passar o mouse (hover), tags de tecnologias/gêneros, status de lançamento e preços/descontos.
- **`SpecialOffers.jsx`**: Grid de ofertas promocionais em destaque com tags em porcentagem (-50%, -75%).
- **`CategoryCards.jsx`**: Navegação rápida por categorias visuais temáticas.
- **`BrowseTabs.jsx`**: Abas interativas ("Novidades", "Mais Vendidos", "Mais Jogados", "Ofertas") com badges de plataformas compatíveis e avaliações dos usuários.
- **`TopPlayedDeck.jsx` & `EventBanner.jsx`**: Carrossel dedicado aos jogos otimizados para Steam Deck e banner institucional de eventos e festivais Steam.
- **`LeftSidebar.jsx`**: Barra lateral esquerda com atalhos de cartões-presente, marcadores recomendados e navegação rápida por tags/gêneros.
- **`SteamFooter.jsx`**: Rodapé institucional estilizado com aviso de direitos e responsabilidade do portfólio.

#### 2. Página de Produto / Detalhes da Loja (`GameStorePage.jsx`):
- Visualização completa da página individual de um jogo/projeto:
  - Hero banner imersivo com gradiente sobreposto e status do título.
  - Galeria de capturas de tela (screenshots) com miniaturas alternáveis.
  - Painel de ação com simulação realista de download progressivo (barra de porcentagem animada).
  - Adição e sincronização automática com a Biblioteca do usuário após a conclusão do download.
  - Detalhes técnicos, tags, desenvolvedor, distribuidora e lista de conquistas vinculadas.

#### 3. Interface Completa da Biblioteca Steam (`LibraryView.jsx`):
- **`LibrarySidebar.jsx`**: Barra lateral esquerda da biblioteca com busca em tempo real, contador dinâmico de projetos na coleção, ordenação alfabética e indicação visual do item selecionado.
- **`GameDetailPanel.jsx`**: Painel principal do jogo/projeto:
  - Arte de fundo em alta resolução (Hero Banner).
  - Botão de ação principal verde vibrante **"▶ JOGAR"**: ativa estado de execução imediato ("EXECUTANDO...") e contabiliza tempo jogado (playtime) persistido.
  - Botão secundário de atalho rápido para **"Código Fonte"** (GitHub).
  - Botão de gerenciamento para **"Desinstalar Jogo"** da biblioteca com confirmação.
  - Barra de progresso de conquistas desbloqueadas (ex: 71% concluído).
  - Estatísticas de última sessão jogada e total de horas registradas.
  - Grade de conquistas com ícones visuais e descrições.

#### 4. Página Oficial de Perfil Steam (`ProfileView.jsx`):
- **`ProfileHeader.jsx`**: Avatar oficial com moldura temática, status online interativo, insígnia de nível Steam em destaque (Nível 42 com barra de XP calculada), resumo de anos de serviço e botão interativo "Editar Perfil".
- **`ProfileShowcases.jsx`**: Vitrine oficial Steam (Showcase) com exibição de projetos favoritos, estatísticas acumuladas e conquistas raras.
- **`ProfileRecentActivity.jsx`**: Histórico recente de atividades de desenvolvimento e projetos executados nas últimas semanas.
- **`ProfileSidebar.jsx`**: Barra lateral com lista de amigos, status de conexão (online/jogando/ausente), links sociais (GitHub, LinkedIn, E-mail, Currículo) e insígnias conquistadas.
- **`ProfileComments.jsx`**: Mural social de comentários (+rep) no estilo clássico da comunidade Steam, com formulário de novo comentário e persistência de mensagens.
- **`EditProfileModal.jsx`**: Modal completo para edição de informações de perfil (nome de exibição, país, cidade, biografia e seleção de moldura de avatar).

#### 5. Sistema de Navegação Global (`NavigationContext.jsx` & `App.jsx`):
- Controle reativo centralizado de abas e telas (`loja`, `biblioteca`, `perfil`).
- Suporte a subvisões dentro da loja (`gamepage` para projetos individuais).
- Scroll restoration suave para o topo nas trocas de tela.

#### 6. Integração BaaS com Firebase & Resiliência Offline:
- **`firebaseConfig.js`**: Conexão com Firebase via variáveis de ambiente Vite (`.env`).
- **`authService.js`**:
  - Login anônimo automático transparente para visitantes (criação instantânea de UID sem barreiras).
  - Login e registro por e-mail e senha para visitantes frequentes e recrutadores.
  - Tradução e tratamento de erros do Firebase Auth para português amigável.
  - Fallback automático para `localStorage` caso o Firebase esteja indisponível ou sem credenciais configuradas.
- **`libraryService.js`**: Persistência de jogos salvos na coleção do usuário no Firestore (`users/{uid}/library`), com sincronização bidirecional e cache local.
- **`profileService.js`**: Persistência de personalizações do perfil e mural de comentários da comunidade (`users/{uid}/comments`).
- **`AuthModal.jsx`**: Modal estilizado com abas de autenticação (Login / Cadastro) integradas aos fluxos de usuário.

#### 7. Sistema de Design e Estilização Vanilla CSS:
- 9 folhas de estilo CSS modulares e polidas:
  - `variables.css`: Paleta oficial da Steam (`#171a21`, `#1b2838`, `#2a475e`, `#66c0f4`, `#c7d5e0`, etc.), sombras e fontes.
  - `global.css`, `header.css`, `carousel.css`, `sections.css`, `gamepage.css`, `library.css`, `profile.css`, `auth.css`.

---

### ⏳ O que está pendente de implementação:

1. **Substituição dos Dados Comerciais por Projetos Reais do Desenvolvedor**:
   - Atualmente, `src/core/mock/steamData.js` ainda utiliza dados de jogos comerciais da Valve (Cyberpunk 2077, Black Myth: Wukong, Baldur's Gate 3, Elden Ring, CS2, etc.).
   - **Ação necessária**: Substituir pelos **projetos autorais reais de desenvolvimento de Rafael Fagnin** (projetos Web, Full Stack, Mobile, Jogos), inserindo:
     - Títulos reais e descrições técnicas detalhadas.
     - Screenshots reais das aplicações em funcionamento.
     - Tags técnicas reais (ex: *React*, *TypeScript*, *Node.js*, *Next.js*, *Firebase*, *C#*, *Unity*, *Docker*).
     - Links reais de **Live Demo** acionados pelo botão "▶ JOGAR".
     - Links reais dos **Repositórios GitHub** acionados pelo botão "Código Fonte".
2. **Abas Secundárias da Navegação Global ("Comunidade" e "Sobre")**:
   - Atualmente, as abas "Comunidade" e "Sobre" mantêm a visualização básica ou redirecionam.
   - **Ação necessária**:
     - **Aba Comunidade**: Hub de artigos técnicos, postagens de blog (Dev.to / Medium / LinkedIn) e discussões da comunidade.
     - **Aba Sobre**: Página sobre o desenvolvedor (trajetória profissional, stack detalhada, setup de trabalho e download direto de currículo).
3. **Evolução Arquitetural para Clean Architecture Formal**:
   - Atualmente, a pasta `src/core/` possui apenas `mock/steamData.js`. As chamadas aos serviços de Firebase/LocalStorage são feitas diretamente a partir do `NavigationContext`.
   - **Ação necessária**: Criar formalmente as camadas de Domínio (`core/entities/` e `core/useCases/`) e Repositórios (`infrastructure/repositories/`) para desacoplar as regras de negócio dos componentes React.
4. **Refinamento Responsivo Mobile e Efeitos Sonoros Opcionais**:
   - Ajustar o layout da Biblioteca e Perfil para dispositivos móveis com telas menores.
   - Implementar efeitos sonoros característicos da interface Steam (clique de botão, som de conquista desbloqueada, início de download).

---

## 🏛️ 3. Estrutura de Diretórios Atual vs. Alvo

### 📁 Estrutura Real Atual do Projeto:

```
src/
├── components/
│   ├── auth/
│   │   └── AuthModal.jsx             # Modal de Login e Cadastro estilo Steam
│   ├── home/
│   │   ├── BrowseTabs.jsx            # Abas de navegação (Novidades, Mais Vendidos)
│   │   ├── CategoryCards.jsx         # Cards de categorias visuais
│   │   ├── EventBanner.jsx           # Banner temático de eventos Steam
│   │   ├── FeaturedCarousel.jsx      # Carrossel hero de projetos em destaque
│   │   ├── GameStorePage.jsx         # Página de detalhes do produto/jogo com download
│   │   ├── SpecialOffers.jsx         # Seção de ofertas promocionais
│   │   └── TopPlayedDeck.jsx         # Carrossel de destaques Steam Deck
│   ├── layout/
│   │   ├── LeftSidebar.jsx           # Sidebar de filtros e atalhos da loja
│   │   ├── SteamFooter.jsx           # Rodapé institucional Steam
│   │   ├── SteamHeader.jsx           # Cabeçalho principal com abas e usuário
│   │   └── StoreNavbar.jsx           # Subnav azul escuro com busca
│   ├── library/
│   │   ├── GameDetailPanel.jsx       # Painel do jogo selecionado (Hero, Jogar, Código)
│   │   ├── LibrarySidebar.jsx        # Lista lateral de jogos instalados com busca
│   │   └── LibraryView.jsx           # Container principal da visão de Biblioteca
│   └── profile/
│       ├── EditProfileModal.jsx      # Modal de personalização do perfil
│       ├── ProfileComments.jsx       # Mural de comentários estilo comunidade (+rep)
│       ├── ProfileHeader.jsx         # Header do perfil (Avatar, Nível Steam, Status)
│       ├── ProfileRecentActivity.jsx  # Histórico recente de atividades
│       ├── ProfileShowcases.jsx      # Vitrines de projetos e conquistas
│       ├── ProfileSidebar.jsx        # Sidebar do perfil (Amigos, Conquistas, Links)
│       └── ProfileView.jsx           # Container da visão de Perfil
│
├── context/
│   └── NavigationContext.jsx         # Provedor global de estado de navegação, auth e biblioteca
│
├── core/
│   └── mock/
│       └── steamData.js              # Base de dados de jogos, ofertas e categorias
│
├── infrastructure/
│   └── firebase/
│       ├── authService.js            # Serviços de autenticação (Google/Email/Anônimo)
│       ├── firebaseConfig.js         # Inicialização do app Firebase com variáveis de ambiente
│       ├── libraryService.js         # Gerenciamento de biblioteca no Firestore/LocalStorage
│       └── profileService.js         # Gerenciamento de perfil e comentários
│
├── styles/
│   ├── auth.css                      # Estilos do modal de login/cadastro
│   ├── carousel.css                  # Estilos do carrossel principal
│   ├── gamepage.css                  # Estilos da página de detalhes do produto
│   ├── global.css                    # Reset, scrollbars e fontes globais
│   ├── header.css                    # Estilos do cabeçalho e subnavs
│   ├── library.css                   # Estilos da interface da biblioteca Steam
│   ├── profile.css                   # Estilos da página de perfil e mural
│   ├── sections.css                  # Estilos das seções da loja
│   └── variables.css                 # Design tokens (cores, bordas e sombras)
│
├── App.jsx                           # Roteador reativo das visões principais
└── main.jsx                          # Ponto de entrada do React
```

---

## 🎯 4. Funcionalidades Detalhadas

### 4.1. Aba LOJA (Store - Vitrine do Desenvolvedor)
- **Destaques e Recomendados**: Carrossel com projetos mais relevantes, screenshots em alta resolução, tags de tecnologias e alternância interativa de prévias.
- **Página de Detalhes do Projeto (GameStorePage)**:
  - Galeria de mídias e capturas selecionáveis.
  - Simulador de download progressivo com barra de status em tempo real.
  - Adição instantânea do projeto à biblioteca do usuário.
  - Seção de requisitos do sistema e conquistas disponíveis.

### 4.2. Aba BIBLIOTECA (Library - Experiência Desktop Steam)
- **Barra Lateral com Busca**: Filtro dinâmico por nome de projeto e lista vertical com ícones.
- **Painel de Ação do Projeto**:
  - Banner hero dinâmico em tela cheia com arte do projeto.
  - Botão verde vibrante **"▶ JOGAR"**: inicia a aplicação (abre Live Demo) e simula o status "EXECUTANDO...".
  - Botão de atalho **"Código Fonte"**: redirecionamento para o repositório GitHub.
  - Botão **"Desinstalar Jogo"**: remove o item da coleção pessoal do usuário.
  - Métricas de **Horas Jogadas** (tempo de dedicação) e **Última Sessão**.
  - Grade de conquistas do projeto com barra de porcentagem de progresso.

### 4.3. Aba PERFIL (Steam Profile & Conquistas)
- **Header do Perfil**: Avatar com moldura temática, nível Steam personalizado, insígnia principal e status online dinâmico.
- **Subnavegação do Perfil**: Abas "Principal", "Jogos", "Insígnias" e "Amigos".
- **Vitrines de Destaque**: Espaço configurável com conquistas raras e projetos em evidência.
- **Mural de Comentários (+rep)**: Envio de recomendações e comentários de visitantes autenticados ou anônimos com persistência em tempo real.
- **Modal de Edição de Perfil**: Permite que o usuário customize seu apelido, biografia, país e moldura de avatar diretamente na interface.

### 4.4. Camada de Autenticação e Gamificação
- **Autenticação Dupla**:
  - Modo Visitante (sessão anônima criada automaticamente sem exigir formulário).
  - Modo Recrutador / Desenvolvedor (cadastro e login por e-mail e senha).
- **Persistência Híbrida Resiliente**:
  - Gravação automática no Firestore com sincronização em tempo real.
  - Fallback imediato no `localStorage` caso o Firebase esteja offline ou sem credenciais, garantindo que o portfólio funcione 100% em qualquer ambiente de demonstração.

---

## 🚀 5. Roadmap de Próximos Passos Atualizado

| Fase | Descrição | Status |
| :--- | :--- | :---: |
| **Fase 1** | Interface inicial da Home da Loja Steam (Header, Carousel, Seções, Rodapé) | Concluído ✅ |
| **Fase 2** | Gerenciamento de navegação e rotas reativas (`NavigationContext` + `App.jsx`) | Concluído ✅ |
| **Fase 3** | Página de produto/jogo com galeria e simulador de download (`GameStorePage.jsx`) | Concluído ✅ |
| **Fase 4** | Interface da Biblioteca Steam com lista lateral e painel de ação (`LibraryView.jsx`) | Concluído ✅ |
| **Fase 5** | Integração Firebase (Auth anônimo/email + Firestore + fallback local) | Concluído ✅ |
| **Fase 6** | Página de Perfil Steam com insígnias, nível, vitrines e mural (+rep) (`ProfileView.jsx`) |
| **Fase 7** | **Substituição dos dados comerciais por projetos autorais reais do desenvolvedor** | **Próximo 🔄** |
| **Fase 8** | Implementação das abas "Comunidade" (artigos/posts) e "Sobre" (trajetória/currículo) | Planejado ⏳ |
| **Fase 9** | Refatoração para Clean Architecture estrita (entidades e casos de uso formais em `core/`) | Planejado ⏳ |
| **Fase 10** | Polimento de responsividade mobile e efeitos sonoros característicos da Steam (SFX) | Planejado ⏳ |