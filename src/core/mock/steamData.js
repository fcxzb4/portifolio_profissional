// Mock data fiel da Steam com imagens reais da CDN da Valve/Steam
export const featuredGames = [
  {
    id: "cyberpunk2077",
    appId: 1091500,
    title: "Cyberpunk 2077: Phantom Liberty",
    mainImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/capsule_616x353.jpg",
    heroBanner: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/capsule_616x353.jpg",
    screenshots: [
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/ss_8b991b5c20ebbf7aaefce11db972e2cfc21ff215.600x338.jpg",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/ss_e1e1a5332f102553b6d0259e8773950efcf8d976.600x338.jpg",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/ss_14f3bfa3165b4c4fae85e74c84ebaa9d123d46cb.600x338.jpg",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/ss_d36b85e0544f8bc6ffbcfd96fa1548e6538356c9.600x338.jpg"
    ],
    status: "Já disponível",
    topSeller: true,
    tags: ["Mundo Aberto", "RPG", "Cyberpunk", "Ação"],
    platforms: ["windows"],
    discount: 50,
    originalPrice: "R$ 199,90",
    discountPrice: "R$ 99,95",
    description: "Cyberpunk 2077 é um RPG de ação e aventura em mundo aberto ambientado na megalópole Night City, onde você assume o papel de um mercenário cyberpunk envolvido em uma luta pela sobrevivência.",
    developer: "CD PROJEKT RED",
    publisher: "CD PROJEKT RED",
    hoursPlayed: 85,
    lastPlayed: "12 Set, 2026",
    achievements: [
      { icon: "🏆", name: "V de Vitória", unlocked: true },
      { icon: "🔫", name: "Primeiro Sangue", unlocked: true },
      { icon: "🌃", name: "Night City Legend", unlocked: true },
      { icon: "💀", name: "Sobrevivente", unlocked: false },
      { icon: "🎯", name: "Precisão Letal", unlocked: true },
      { icon: "🤖", name: "Full Chrome", unlocked: false }
    ]
  },
  {
    id: "blackmyth",
    appId: 2358720,
    title: "Black Myth: Wukong",
    mainImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/capsule_616x353.jpg",
    heroBanner: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/capsule_616x353.jpg",
    screenshots: [
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/ss_c52d627b0b92dbb3fa8b14e557fcda2bbfe99a61.600x338.jpg",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/ss_1c37d04847e2bf9dfaa0d2382f6e913a4bc602ad.600x338.jpg",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/ss_81e9bfe5a54db68d407ffda5c6e8389cb43fbb36.600x338.jpg",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/ss_075677d612487ae4045f4749fbb587a8b417cf6b.600x338.jpg"
    ],
    status: "Sucesso estrondoso",
    topSeller: true,
    tags: ["Ação", "RPG", "Mitologia", "Soulslike"],
    platforms: ["windows"],
    discount: 0,
    originalPrice: "R$ 229,99",
    discountPrice: "R$ 229,99",
    description: "Black Myth: Wukong é um RPG de ação baseado na mitologia chinesa. A história se inspira em Jornada ao Oeste, um dos Quatro Grandes Romances Clássicos da literatura chinesa.",
    developer: "Game Science",
    publisher: "Game Science",
    hoursPlayed: 42,
    lastPlayed: "10 Set, 2026",
    achievements: [
      { icon: "🐒", name: "Rei Macaco", unlocked: true },
      { icon: "⚡", name: "Poder Divino", unlocked: true },
      { icon: "🐉", name: "Domador de Dragões", unlocked: false },
      { icon: "🏔️", name: "Topo da Montanha", unlocked: true },
      { icon: "👊", name: "Combo Master", unlocked: false }
    ]
  },
  {
    id: "baldursgate3",
    appId: 1086940,
    title: "Baldur's Gate 3",
    mainImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/capsule_616x353.jpg",
    heroBanner: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/capsule_616x353.jpg",
    screenshots: [
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/ss_d9103e33e14457e514f7b6fcab6414771bb57fa3.600x338.jpg",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/ss_6d015c7e4726bf0fa0c14c5c4e9fa8217bb6aa65.600x338.jpg",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/ss_3e9ce51ee6d61f1c71ddfa7a9b1c7dcbe5bcceae.600x338.jpg",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/ss_5cbaf32a8298ba5cb1943828fc8c495cb51f5c6f.600x338.jpg"
    ],
    status: "Vencedor do Jogo do Ano",
    topSeller: true,
    tags: ["RPG", "Escolhas Importam", "Rico em História", "Cooperativo"],
    platforms: ["windows", "mac"],
    discount: 20,
    originalPrice: "R$ 199,99",
    discountPrice: "R$ 159,99",
    description: "Baldur's Gate 3 é um RPG de aventura repleto de histórias que traz uma narrativa surpreendente e toda a ação de D&D. Escolha seu grupo, faça alianças e lute para resistir à corrupção absoluta.",
    developer: "Larian Studios",
    publisher: "Larian Studios",
    hoursPlayed: 156,
    lastPlayed: "14 Set, 2026",
    achievements: [
      { icon: "🎲", name: "Rolagem Crítica", unlocked: true },
      { icon: "⚔️", name: "Herói de Faerûn", unlocked: true },
      { icon: "🧙", name: "Mestre Arcano", unlocked: true },
      { icon: "💀", name: "Modo Honra", unlocked: false },
      { icon: "🤝", name: "Diplomata", unlocked: true },
      { icon: "🐉", name: "Matador de Dragões", unlocked: false },
      { icon: "📖", name: "Leitor Ávido", unlocked: true }
    ]
  },
  {
    id: "eldenring",
    appId: 1245620,
    title: "ELDEN RING: Shadow of the Erdtree",
    mainImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg",
    heroBanner: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg",
    screenshots: [
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/ss_752a99d4eeae58728a4adab9875f2b87fcf96387.600x338.jpg",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/ss_49e830e2fce12d8a0c647b59eb583bc4ae13c3a4.600x338.jpg",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/ss_534dd59f3c78096f9dc8e75440cb3298a09ebcf8.600x338.jpg",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/ss_b8319ba195b058c42b27b9ef088514125b29367d.600x338.jpg"
    ],
    status: "Nova expansão aclamada",
    topSeller: true,
    tags: ["Soulslike", "Mundo Aberto", "RPG de Ação", "Difícil"],
    platforms: ["windows"],
    discount: 0,
    originalPrice: "R$ 229,90",
    discountPrice: "R$ 229,90",
    description: "ELDEN RING é um RPG de ação criado por Hidetaka Miyazaki com worldbuilding de George R.R. Martin. Explore as Terras Intermédias em um vasto mundo repleto de perigos e mistérios.",
    developer: "FromSoftware Inc.",
    publisher: "Bandai Namco Entertainment",
    hoursPlayed: 210,
    lastPlayed: "8 Set, 2026",
    achievements: [
      { icon: "👑", name: "Lorde Elden", unlocked: true },
      { icon: "🗡️", name: "Primeiro Boss", unlocked: true },
      { icon: "🌙", name: "Lua Cheia", unlocked: true },
      { icon: "🔥", name: "Chama Ancestral", unlocked: false },
      { icon: "💎", name: "Colecionador", unlocked: false },
      { icon: "⭐", name: "Todas as Estrelas", unlocked: false }
    ]
  },
  {
    id: "cs2",
    appId: 730,
    title: "Counter-Strike 2",
    mainImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/capsule_616x353.jpg",
    heroBanner: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/capsule_616x353.jpg",
    screenshots: [
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/ss_d15655a6d092a406059d045d448ffbfd5d7e4860.600x338.jpg",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/ss_60233b8a6a6f6718d79a7bc4fbe6eb5e6d6eb100.600x338.jpg",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/ss_e17ff9871587a87e59b21f37e4085f16e047ce0c.600x338.jpg",
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/ss_ee2e8c25345d2433ea3e45c47942faebfc595568.600x338.jpg"
    ],
    status: "O jogo mais jogado do Steam",
    topSeller: true,
    tags: ["Tiro em Primeira Pessoa", "Competitivo", "Multijogador", "Ação"],
    platforms: ["windows", "linux"],
    discount: 0,
    originalPrice: "Gratuito p/ Jogar",
    discountPrice: "Gratuito p/ Jogar",
    description: "Counter-Strike 2 eleva a experiência competitiva com gráficos aprimorados, novos mapas repensados e mecânicas de jogo atualizadas que definem o futuro do FPS competitivo.",
    developer: "Valve",
    publisher: "Valve",
    hoursPlayed: 1320,
    lastPlayed: "16 Set, 2026",
    achievements: [
      { icon: "🎯", name: "Headshot Master", unlocked: true },
      { icon: "💣", name: "Especialista em Bombas", unlocked: true },
      { icon: "🏅", name: "Rank Global", unlocked: false },
      { icon: "🔪", name: "Knife Kill", unlocked: true },
      { icon: "🎖️", name: "Veterano", unlocked: true }
    ]
  }
];


export const specialOffers = [
  {
    id: "rdr2",
    appId: 1174180,
    title: "Red Dead Redemption 2",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg",
    capsule: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/capsule_616x353.jpg",
    bannerType: "OFERTA DO FIM DE SEMANA",
    discount: 67,
    originalPrice: "R$ 299,90",
    discountPrice: "R$ 98,96",
    endsIn: "A oferta termina em 36 horas"
  },
  {
    id: "witcher3",
    appId: 292030,
    title: "The Witcher 3: Wild Hunt - Complete Edition",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg",
    capsule: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/capsule_616x353.jpg",
    bannerType: "OFERTA DO FIM DE SEMANA",
    discount: 75,
    originalPrice: "R$ 159,99",
    discountPrice: "R$ 39,99",
    endsIn: "A oferta termina segunda-feira"
  },
  {
    id: "hogwarts",
    appId: 990080,
    title: "Hogwarts Legacy",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/990080/header.jpg",
    capsule: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/990080/capsule_616x353.jpg",
    bannerType: "PROMOÇÃO DA SEMANA",
    discount: 70,
    originalPrice: "R$ 249,99",
    discountPrice: "R$ 74,99",
    endsIn: "Termina em 18 de setembro"
  },
  {
    id: "helldivers2",
    appId: 553850,
    title: "HELLDIVERS™ 2",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/553850/header.jpg",
    capsule: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/553850/capsule_616x353.jpg",
    bannerType: "OFERTA ESPECIAL",
    discount: 20,
    originalPrice: "R$ 199,50",
    discountPrice: "R$ 159,60",
    endsIn: "A oferta termina amanhã"
  }
];

// Offers for the "Today's Deal" sidebar panel
export const todaysDeals = [
  {
    id: "astral_ascent",
    title: "Astral Ascent",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1280930/capsule_616x353.jpg",
    discount: 50,
    originalPrice: "R$ 49,99",
    discountPrice: "R$ 24,99",
    label: "Oferta do dia"
  },
  {
    id: "rusty_lake",
    title: "Rusty Lake Hotel",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/435120/capsule_616x353.jpg",
    discount: 66,
    originalPrice: "R$ 10,99",
    discountPrice: "R$ 3,73",
    label: "Oferta do dia"
  }
];

export const browseCategories = [
  {
    id: "city",
    name: "Cidade e Construção",
    bg: "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)",
    icon: "🏙️",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1144200/capsule_616x353.jpg"
  },
  {
    id: "strategy",
    name: "Estratégia",
    bg: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    icon: "♟️",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/570/capsule_616x353.jpg"
  },
  {
    id: "openworld",
    name: "Mundo Aberto",
    bg: "linear-gradient(135deg, #a83232 0%, #1f1010 100%)",
    icon: "🌍",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg"
  },
  {
    id: "sports",
    name: "Todos os Esportes",
    bg: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
    icon: "⚽",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2195250/capsule_616x353.jpg"
  },
  {
    id: "rpg",
    name: "RPGs",
    bg: "linear-gradient(135deg, #654ea3 0%, #eaafc8 100%)",
    icon: "🛡️",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/capsule_616x353.jpg"
  },
  {
    id: "action",
    name: "Ação",
    bg: "linear-gradient(135deg, #0052d4 0%, #6fb1fc 100%)",
    icon: "⚔️",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/capsule_616x353.jpg"
  },
  {
    id: "scifi",
    name: "Ficção Científica",
    bg: "linear-gradient(135deg, #0052d4 0%, #6fb1fc 100%)",
    icon: "🚀",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/553850/capsule_616x353.jpg"
  },
  {
    id: "simulation",
    name: "Simulação",
    bg: "linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)",
    icon: "🚜",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1144200/capsule_616x353.jpg"
  }
];

// Event Banner Data
export const eventBanner = {
  title: "STEAM WARGAMES FEST",
  subtitle: "DESCONTOS, DEMOS E MUITO MAIS",
  bgGradient: "linear-gradient(135deg, #1a3a2a 0%, #0d1f15 40%, #1a3a2a 100%)",
  accentColor: "#5c8a4d"
};

// Top Played on Steam Deck
export const topPlayedDeck = [
  {
    id: "rdr2_deck",
    title: "Red Dead Redemption 2",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/capsule_616x353.jpg",
    discount: 67,
    originalPrice: "R$ 299,90",
    discountPrice: "R$ 98,96"
  },
  {
    id: "p5r_deck",
    title: "Persona 5 Royal",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1687950/capsule_616x353.jpg",
    discount: 60,
    originalPrice: "R$ 249,90",
    discountPrice: "R$ 99,96"
  },
  {
    id: "eldenring_deck",
    title: "ELDEN RING",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg",
    discount: 0,
    originalPrice: "R$ 229,90",
    discountPrice: "R$ 229,90"
  },
  {
    id: "blue_prince_deck",
    title: "Blue Prince",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1585990/capsule_616x353.jpg",
    discount: 0,
    originalPrice: "R$ 59,99",
    discountPrice: "R$ 59,99"
  },
  {
    id: "bg3_deck",
    title: "Baldur's Gate 3",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/capsule_616x353.jpg",
    discount: 20,
    originalPrice: "R$ 199,99",
    discountPrice: "R$ 159,99"
  },
  {
    id: "cyberpunk_deck",
    title: "Cyberpunk 2077",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/capsule_616x353.jpg",
    discount: 50,
    originalPrice: "R$ 199,90",
    discountPrice: "R$ 99,95"
  },
  {
    id: "stardew_deck",
    title: "Stardew Valley",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/capsule_616x353.jpg",
    discount: 0,
    originalPrice: "R$ 24,99",
    discountPrice: "R$ 24,99"
  },
  {
    id: "hades2_deck",
    title: "Hades II",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1145350/capsule_616x353.jpg",
    discount: 0,
    originalPrice: "R$ 59,99",
    discountPrice: "R$ 59,99"
  }
];

export const tabbedGames = {
  popular: [
    {
      id: "cs2",
      title: "Counter-Strike 2",
      thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/capsule_sm_120.jpg",
      tags: ["Tiro em Primeira Pessoa", "Competitivo", "Ação"],
      discount: 0,
      originalPrice: "Gratuito",
      discountPrice: "Gratuito p/ Jogar",
      platforms: ["windows", "linux"],
      reviews: "Extremamente positivas"
    },
    {
      id: "blackmyth",
      title: "Black Myth: Wukong",
      thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/capsule_sm_120.jpg",
      tags: ["Ação", "RPG", "Soulslike"],
      discount: 0,
      originalPrice: "R$ 229,99",
      discountPrice: "R$ 229,99",
      platforms: ["windows"],
      reviews: "Muito positivas"
    },
    {
      id: "dota2",
      title: "Dota 2",
      thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/570/capsule_sm_120.jpg",
      tags: ["MOBA", "Estratégia", "Multijogador"],
      discount: 0,
      originalPrice: "Gratuito",
      discountPrice: "Gratuito p/ Jogar",
      platforms: ["windows", "mac", "linux"],
      reviews: "Muito positivas"
    },
    {
      id: "baldursgate3",
      title: "Baldur's Gate 3",
      thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/capsule_sm_120.jpg",
      tags: ["RPG", "Escolhas Importam", "Cooperativo"],
      discount: 20,
      originalPrice: "R$ 199,99",
      discountPrice: "R$ 159,99",
      platforms: ["windows", "mac"],
      reviews: "Extremamente positivas"
    },
    {
      id: "pubg",
      title: "PUBG: BATTLEGROUNDS",
      thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/578080/capsule_sm_120.jpg",
      tags: ["Sobrevivência", "Tiro", "Multijogador"],
      discount: 0,
      originalPrice: "Gratuito",
      discountPrice: "Gratuito p/ Jogar",
      platforms: ["windows"],
      reviews: "Neutras"
    },
    {
      id: "eldenring",
      title: "ELDEN RING",
      thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_sm_120.jpg",
      tags: ["Soulslike", "Mundo Aberto", "RPG"],
      discount: 0,
      originalPrice: "R$ 229,90",
      discountPrice: "R$ 229,90",
      platforms: ["windows"],
      reviews: "Muito positivas"
    },
    {
      id: "gtav",
      title: "Grand Theft Auto V",
      thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/271590/capsule_sm_120.jpg",
      tags: ["Mundo Aberto", "Ação", "Crime"],
      discount: 50,
      originalPrice: "R$ 82,41",
      discountPrice: "R$ 41,20",
      platforms: ["windows"],
      reviews: "Muito positivas"
    }
  ],
  topSellers: [
    {
      id: "blackmyth",
      title: "Black Myth: Wukong",
      thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/capsule_sm_120.jpg",
      tags: ["Ação", "RPG", "Mitologia"],
      discount: 0,
      originalPrice: "R$ 229,99",
      discountPrice: "R$ 229,99",
      platforms: ["windows"],
      reviews: "Muito positivas"
    },
    {
      id: "rdr2",
      title: "Red Dead Redemption 2",
      thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/capsule_sm_120.jpg",
      tags: ["Mundo Aberto", "Faroeste", "Rico em História"],
      discount: 67,
      originalPrice: "R$ 299,90",
      discountPrice: "R$ 98,96",
      platforms: ["windows"],
      reviews: "Muito positivas"
    },
    {
      id: "cyberpunk2077",
      title: "Cyberpunk 2077",
      thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/capsule_sm_120.jpg",
      tags: ["Cyberpunk", "Mundo Aberto", "RPG"],
      discount: 50,
      originalPrice: "R$ 199,90",
      discountPrice: "R$ 99,95",
      platforms: ["windows"],
      reviews: "Muito positivas"
    },
    {
      id: "helldivers2",
      title: "HELLDIVERS™ 2",
      thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/553850/capsule_sm_120.jpg",
      tags: ["Tiro em 3ª Pessoa", "Cooperativo", "Ação"],
      discount: 20,
      originalPrice: "R$ 199,50",
      discountPrice: "R$ 159,60",
      platforms: ["windows"],
      reviews: "Muito positivas"
    },
    {
      id: "witcher3",
      title: "The Witcher 3: Wild Hunt",
      thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/capsule_sm_120.jpg",
      tags: ["Mundo Aberto", "RPG", "Fantasia Sombria"],
      discount: 75,
      originalPrice: "R$ 159,99",
      discountPrice: "R$ 39,99",
      platforms: ["windows"],
      reviews: "Extremamente positivas"
    }
  ],
  newReleases: [
    {
      id: "space_marine2",
      title: "Warhammer 40,000: Space Marine 2",
      thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2183900/capsule_sm_120.jpg",
      tags: ["Ação", "Tiro em 3ª Pessoa", "Cooperativo"],
      discount: 0,
      originalPrice: "R$ 249,50",
      discountPrice: "R$ 249,50",
      platforms: ["windows"],
      reviews: "Muito positivas"
    },
    {
      id: "god_of_war_ragnarok",
      title: "God of War Ragnarök",
      thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2322010/capsule_sm_120.jpg",
      tags: ["Ação", "Mitologia", "Rico em História"],
      discount: 0,
      originalPrice: "R$ 249,90",
      discountPrice: "R$ 249,90",
      platforms: ["windows"],
      reviews: "Muito positivas"
    },
    {
      id: "frostpunk2",
      title: "Frostpunk 2",
      thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1601580/capsule_sm_120.jpg",
      tags: ["Estratégia", "Construção de Cidades", "Pós-apocalíptico"],
      discount: 10,
      originalPrice: "R$ 149,99",
      discountPrice: "R$ 134,99",
      platforms: ["windows", "mac"],
      reviews: "Muito positivas"
    }
  ],
  specials: [
    {
      id: "rdr2",
      title: "Red Dead Redemption 2",
      thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1174180/capsule_sm_120.jpg",
      tags: ["Mundo Aberto", "Faroeste", "História"],
      discount: 67,
      originalPrice: "R$ 299,90",
      discountPrice: "R$ 98,96",
      platforms: ["windows"],
      reviews: "Muito positivas"
    },
    {
      id: "hogwarts",
      title: "Hogwarts Legacy",
      thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/990080/capsule_sm_120.jpg",
      tags: ["Mágica", "Mundo Aberto", "RPG"],
      discount: 70,
      originalPrice: "R$ 249,99",
      discountPrice: "R$ 74,99",
      platforms: ["windows"],
      reviews: "Muito positivas"
    },
    {
      id: "witcher3",
      title: "The Witcher 3: Wild Hunt",
      thumb: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/capsule_sm_120.jpg",
      tags: ["RPG", "Mundo Aberto"],
      discount: 75,
      originalPrice: "R$ 159,99",
      discountPrice: "R$ 39,99",
      platforms: ["windows"],
      reviews: "Extremamente positivas"
    }
  ]
};

export const sidebarItems = {
  giftCards: "Cartões-presente do Steam",
  recommended: [
    "Por amigos",
    "Por curadores",
    "Marcadores"
  ],
  categories: [
    "Mais vendidos",
    "Lançamentos",
    "Em breve",
    "Ofertas",
    "Títulos de RV",
    "Compatíveis com controles",
    "Ótimo no Steam Deck"
  ],
  hardware: [
    "Steam Deck",
    "Steam Deck Dock",
    "Hardware de RV"
  ],
  genres: [
    "Gratuito para Jogar",
    "Acesso Antecipado",
    "Ação",
    "Aventura",
    "Casual",
    "Indie",
    "Multijogador Massivo",
    "Corrida",
    "RPG",
    "Simulação",
    "Esportes",
    "Estratégia"
  ]
};
