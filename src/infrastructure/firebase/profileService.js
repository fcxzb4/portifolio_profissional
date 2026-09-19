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

// Perfil padrão limpo para novas contas (mapeado para os campos do Firebase)
export const DEFAULT_USER_PROFILE = {
  name: '',
  personaName: '',
  bio: '',
  bioPhoto: 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
  avatarUrl: 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg',
  favoriteGame: '',
  achivimants: '',
  batches: '',
  realName: '',
  country: '',
  countryFlag: '',
  city: '',
  customUrl: '',
  avatarFrame: 'default',
  status: 'online',
  currentGame: '',
  level: 1,
  xp: 0,
  xpNextLevel: 100,
  yearsOfService: 0,
  featuredBadge: null,
  socialLinks: {
    github: '',
    linkedin: '',
    portfolio: '',
    email: ''
  }
};

// Mural de comentários inicial vazio para novas contas
export const INITIAL_PROFILE_COMMENTS = [];

/**
 * Carrega dados do perfil do usuário (Firestore com fallback no localStorage)
 */
export async function getUserProfileData(userId, authUser = null) {
  const fallback = {
    ...DEFAULT_USER_PROFILE,
    socialLinks: { ...DEFAULT_USER_PROFILE.socialLinks }
  };
  
  if (authUser) {
    const authName = authUser.displayName || (authUser.email ? authUser.email.split('@')[0] : '');
    fallback.name = authName;
    fallback.personaName = authName;
    if (authUser.email) fallback.socialLinks.email = authUser.email;
    if (authUser.photoURL) {
      fallback.bioPhoto = authUser.photoURL;
      fallback.avatarUrl = authUser.photoURL;
    }
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

  // 2. Tentar buscar do Firestore (verificando o documento do usuário)
  try {
    let docSnap = null;
    // Tenta em 'users' ou 'user'
    const docRefUsers = doc(db, 'users', userId);
    docSnap = await getDoc(docRefUsers);
    
    if (!docSnap.exists()) {
      const docRefUser = doc(db, 'user', userId);
      docSnap = await getDoc(docRefUser);
    }

    // Se ainda não achou, tenta o caminho legado
    if (!docSnap.exists()) {
      const docRefLegacy = doc(db, 'users', userId, 'profile', 'info');
      docSnap = await getDoc(docRefLegacy);
    }

    if (docSnap && docSnap.exists()) {
      const rawData = docSnap.data();
      // O perfil pode estar dentro do campo map 'profile' ou na raiz do doc
      const p = rawData.profile || rawData;
      
      const firestoreData = {
        ...fallback,
        name: p.name || p.personaName || fallback.name,
        personaName: p.name || p.personaName || fallback.name,
        bio: p.bio !== undefined ? p.bio : fallback.bio,
        bioPhoto: p.bioPhoto || p.avatarUrl || fallback.bioPhoto,
        avatarUrl: p.bioPhoto || p.avatarUrl || fallback.bioPhoto,
        favoriteGame: p.favoriteGame || '',
        achivimants: p.achivimants !== undefined ? String(p.achivimants) : '',
        batches: p.batches !== undefined ? String(p.batches) : '',
        realName: p.realName || fallback.realName,
        city: p.city || fallback.city,
        country: p.country || fallback.country,
        countryFlag: p.countryFlag || (
          (p.country || '').toLowerCase().includes('brasil') ? '🇧🇷' : ''
        ),
        level: p.level !== undefined ? Number(p.level) : fallback.level,
        socialLinks: {
          ...fallback.socialLinks,
          ...(p.socialLinks || {})
        }
      };

      try {
        localStorage.setItem(LOCAL_PROFILE_PREFIX + userId, JSON.stringify(firestoreData));
      } catch (err) {
        // storage quota
      }
      return firestoreData;
    }
  } catch (error) {
    console.warn('[ProfileService] Firestore offline ou regras restritivas para perfil:', error.message);
  }

  // Retorna localData ou fallback default
  return localData ? { ...fallback, ...localData } : fallback;
}

/**
 * Salva alterações no perfil do usuário no Firebase (atualiza mapa profile e cache local)
 */
export async function saveUserProfileData(userId, profileUpdates) {
  if (!userId) return false;

  // 1. Atualiza LocalStorage
  try {
    const current = await getUserProfileData(userId);
    const updated = {
      ...current,
      ...profileUpdates,
      name: profileUpdates.name || profileUpdates.personaName || current.name,
      personaName: profileUpdates.name || profileUpdates.personaName || current.name,
      bioPhoto: profileUpdates.bioPhoto || profileUpdates.avatarUrl || current.bioPhoto,
      avatarUrl: profileUpdates.bioPhoto || profileUpdates.avatarUrl || current.bioPhoto
    };
    localStorage.setItem(LOCAL_PROFILE_PREFIX + userId, JSON.stringify(updated));
  } catch (err) {
    console.warn('[ProfileService] Falha ao salvar cache local do perfil:', err);
  }

  // 2. Salva no Firestore estruturado como no Firebase (mapa profile)
  const profileMap = {
    achivimants: profileUpdates.achivimants !== undefined ? String(profileUpdates.achivimants) : '',
    batches: profileUpdates.batches !== undefined ? String(profileUpdates.batches) : '',
    bio: profileUpdates.bio !== undefined ? profileUpdates.bio : '',
    bioPhoto: profileUpdates.bioPhoto || profileUpdates.avatarUrl || '',
    favoriteGame: profileUpdates.favoriteGame || '',
    name: profileUpdates.name || profileUpdates.personaName || ''
  };

  // Campos complementares opcionais
  if (profileUpdates.realName !== undefined) profileMap.realName = profileUpdates.realName;
  if (profileUpdates.city !== undefined) profileMap.city = profileUpdates.city;
  if (profileUpdates.country !== undefined) profileMap.country = profileUpdates.country;

  const docPayload = {
    profile: profileMap,
    updatedAt: serverTimestamp()
  };

  try {
    // Tenta salvar em 'users' e 'user'
    await setDoc(doc(db, 'users', userId), docPayload, { merge: true });
  } catch (err) {
    try {
      await setDoc(doc(db, 'user', userId), docPayload, { merge: true });
    } catch (err2) {
      console.warn('[ProfileService] Erro ao salvar perfil no Firestore:', err2.message);
    }
  }

  return true;
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
