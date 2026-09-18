// Profile Service — Gerencia dados de perfil e comentários do usuário (Firestore + LocalStorage fallback)
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebaseConfig';

const LOCAL_PROFILE_PREFIX = 'steam_profile_data_';
const LOCAL_COMMENTS_PREFIX = 'steam_profile_comments_';

// Perfil padrão caso o usuário ainda não tenha customizado
export const DEFAULT_USER_PROFILE = {
  personaName: 'GamerDeveloper',
  realName: 'Rafael Fagnin',
  country: 'Brasil',
  countryFlag: '🇧🇷',
  city: 'São Paulo',
  customUrl: 'steamcommunity.com/id/gamerdeveloper_pro',
  avatarUrl: 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
  avatarFrame: 'golden', // 'golden' | 'cyberpunk' | 'neon' | 'fire'
  status: 'online', // 'online' | 'ingame' | 'away'
  currentGame: 'Visual Studio Code',
  level: 42,
  xp: 4250,
  xpNextLevel: 5000,
  yearsOfService: 6,
  bio: `🚀 Desenvolvedor Full Stack & Entusiasta da Cultura Gamer.
Apaixonado por construir interfaces de alta fidelidade, arquiteturas limpas e experiências interativas memoráveis.

💻 Stack Principal: React, TypeScript, Node.js, Next.js, C#, Unity, Firebase & TailwindCSS.
🎮 Jogos Favoritos: Cyberpunk 2077, Baldur's Gate 3, The Witcher 3, Elden Ring.
🏆 "Talk is cheap. Show me the code." — Linus Torvalds`,
  featuredBadge: {
    id: 'legendary_dev',
    title: 'Desenvolvedor Lendário',
    icon: '🏆',
    xp: 500,
    level: 5,
    description: 'Desbloqueou todos os marcos principais de arquitetura de software.'
  },
  socialLinks: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    portfolio: 'https://portifolio.dev',
    email: 'contato@desenvolvedor.com'
  }
};

// Comentários iniciais mockados para dar vida ao mural (+rep clássico da Steam)
export const INITIAL_PROFILE_COMMENTS = [
  {
    id: 'c1',
    authorName: 'GabeN_Official',
    authorAvatar: 'https://avatars.steamstatic.com/b5bd56c1aa4644a474a2e4972b3139e40d955134_medium.jpg',
    authorBadge: 'Valve Employee',
    text: '+rep Excelente desenvolvedor! O código deste portfólio ficou no nível de uma Summer Sale!',
    createdAt: 'Ontem às 18:42'
  },
  {
    id: 'c2',
    authorName: 'CyberNinja_99',
    authorAvatar: 'https://avatars.steamstatic.com/c5d17942e47ee20e3fb84577881c19b0d23cb602_medium.jpg',
    authorBadge: 'Nível 85',
    text: '+rep Clean Architecture impecável e UI ultra realista da Steam. Recomendo muito para vagas Fullstack!',
    createdAt: '12 Set às 14:15'
  },
  {
    id: 'c3',
    authorName: 'TechRecruiter_BR',
    authorAvatar: 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
    authorBadge: 'Recruiter Pro',
    text: 'Impressionante nível de detalhe no portfólio. Já salvei o perfil e o currículo no meu radar de talentos 🚀',
    createdAt: '08 Set às 10:20'
  }
];

/**
 * Carrega dados do perfil do usuário (Firestore com fallback no localStorage)
 */
export async function getUserProfileData(userId, authUser = null) {
  const fallback = { ...DEFAULT_USER_PROFILE };
  
  if (authUser) {
    if (authUser.displayName) fallback.personaName = authUser.displayName;
    if (authUser.email) fallback.email = authUser.email;
    if (authUser.photoURL) fallback.avatarUrl = authUser.photoURL;
  }

  if (!userId) return fallback;

  // 1. Tentar ler do LocalStorage
  let localData = null;
  try {
    const raw = localStorage.getItem(LOCAL_PROFILE_PREFIX + userId);
    if (raw) localData = JSON.parse(raw);
  } catch (err) {
    console.warn('[ProfileService] Erro ao ler local storage:', err);
  }

  // 2. Tentar buscar do Firestore
  try {
    const docRef = doc(db, 'users', userId, 'profile', 'info');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const firestoreData = { ...fallback, ...docSnap.data() };
      localStorage.setItem(LOCAL_PROFILE_PREFIX + userId, JSON.stringify(firestoreData));
      return firestoreData;
    }
  } catch (error) {
    console.warn('[ProfileService] Firestore offline ou regras restritivas para perfil:', error.message);
  }

  // Retorna localData ou fallback default
  return localData ? { ...fallback, ...localData } : fallback;
}

/**
 * Salva alterações no perfil do usuário
 */
export async function saveUserProfileData(userId, profileUpdates) {
  if (!userId) return false;

  // 1. Atualiza LocalStorage
  try {
    const current = await getUserProfileData(userId);
    const updated = { ...current, ...profileUpdates };
    localStorage.setItem(LOCAL_PROFILE_PREFIX + userId, JSON.stringify(updated));
  } catch (err) {
    console.warn('[ProfileService] Falha ao salvar cache local do perfil:', err);
  }

  // 2. Salva no Firestore
  try {
    const docRef = doc(db, 'users', userId, 'profile', 'info');
    await setDoc(docRef, {
      ...profileUpdates,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    console.warn('[ProfileService] Erro ao salvar perfil no Firestore:', error.message);
    return true; // Retorna true pois foi persistido no cache local
  }
}

/**
 * Carrega comentários do perfil
 */
export async function getProfileComments(userId) {
  const localKey = LOCAL_COMMENTS_PREFIX + (userId || 'global');
  let localComments = INITIAL_PROFILE_COMMENTS;

  try {
    const raw = localStorage.getItem(localKey);
    if (raw) {
      localComments = JSON.parse(raw);
    } else {
      localStorage.setItem(localKey, JSON.stringify(INITIAL_PROFILE_COMMENTS));
    }
  } catch (err) {
    console.warn('[ProfileService] Erro ao ler comentários locais:', err);
  }

  if (!userId) return localComments;

  // Busca do Firestore se possível
  try {
    const commentsRef = collection(db, 'users', userId, 'comments');
    const q = query(commentsRef, orderBy('timestamp', 'desc'), limit(50));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      localStorage.setItem(localKey, JSON.stringify(items));
      return items;
    }
  } catch (err) {
    console.warn('[ProfileService] Carregando comentários locais:', err.message);
  }

  return localComments;
}

/**
 * Publica um novo comentário no mural de perfil
 */
export async function addProfileComment(userId, author, text) {
  if (!text || !text.trim()) return null;

  const newComment = {
    id: 'c_' + Date.now(),
    authorName: author?.displayName || (author?.email ? author.email.split('@')[0] : 'Visitante Steam'),
    authorAvatar: author?.photoURL || 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
    authorBadge: author?.isAnonymous ? 'Visitante' : 'Membro Steam',
    text: text.trim(),
    createdAt: 'Agora mesmo'
  };

  const localKey = LOCAL_COMMENTS_PREFIX + (userId || 'global');
  try {
    const raw = localStorage.getItem(localKey);
    const list = raw ? JSON.parse(raw) : [...INITIAL_PROFILE_COMMENTS];
    list.unshift(newComment);
    localStorage.setItem(localKey, JSON.stringify(list));
  } catch (err) {
    console.warn('[ProfileService] Erro ao salvar comentário local:', err);
  }

  // Tenta persistir no Firestore
  if (userId) {
    try {
      const commentsRef = collection(db, 'users', userId, 'comments');
      await addDoc(commentsRef, {
        ...newComment,
        timestamp: serverTimestamp()
      });
    } catch (err) {
      console.warn('[ProfileService] Comentário persistido localmente (Firestore offline):', err.message);
    }
  }

  return newComment;
}
