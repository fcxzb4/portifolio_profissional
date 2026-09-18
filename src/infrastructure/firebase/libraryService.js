// Firebase Library Service — Gerencia jogos na biblioteca do usuário
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebaseConfig';

const LOCAL_STORAGE_PREFIX = 'steam_library_';

function getLocalLibrary(userId) {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_PREFIX + userId);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalLibrary(userId, list) {
  try {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + userId, JSON.stringify(list));
  } catch (err) {
    console.warn('[LibraryService] Não foi possível salvar cache local:', err);
  }
}

/**
 * Adiciona um jogo à biblioteca do usuário no Firestore (com cache local)
 * @param {string} userId - UID do usuário
 * @param {Object} gameData - Dados do jogo a ser salvo
 */
export async function addGameToLibrary(userId, gameData) {
  if (!userId || !gameData) return false;
  const gameId = String(gameData.id || gameData.gameId || '');
  if (!gameId) return false;

  const itemToSave = {
    id: gameId,
    gameId: gameId,
    title: gameData.title || 'Jogo sem título',
    mainImage: gameData.mainImage || gameData.capsule || gameData.image || '',
    heroBanner: gameData.heroBanner || gameData.mainImage || '',
    screenshots: Array.isArray(gameData.screenshots) ? gameData.screenshots : [],
    tags: Array.isArray(gameData.tags) ? gameData.tags : [],
    description: gameData.description || '',
    developer: gameData.developer || 'Indie Developer',
    publisher: gameData.publisher || 'Steam Portfolio',
    achievements: Array.isArray(gameData.achievements) ? gameData.achievements : [],
    platforms: Array.isArray(gameData.platforms) ? gameData.platforms : ['windows'],
    hoursPlayed: Number(gameData.hoursPlayed) || 0,
    lastPlayed: gameData.lastPlayed || 'Hoje'
  };

  // 1. Atualizar cache local imediatamente (feedback instantâneo)
  const currentLocal = getLocalLibrary(userId);
  const existsIndex = currentLocal.findIndex(g => (g.id === gameId || g.gameId === gameId));
  if (existsIndex >= 0) {
    currentLocal[existsIndex] = { ...currentLocal[existsIndex], ...itemToSave };
  } else {
    currentLocal.unshift({ ...itemToSave, addedAt: new Date().toISOString() });
  }
  saveLocalLibrary(userId, currentLocal);

  // 2. Persistir no Firestore
  try {
    const gameRef = doc(db, 'users', userId, 'library', gameId);
    await setDoc(gameRef, {
      ...itemToSave,
      addedAt: serverTimestamp()
    }, { merge: true });
    console.log(`[LibraryService] Jogo "${itemToSave.title}" salvo com sucesso no Firestore!`);
    return true;
  } catch (error) {
    console.warn(
      '[LibraryService] Firestore não disponível no momento ou regras bloqueando:',
      error.message,
      '\n👉 O jogo foi salvo no cache local do navegador para não perder o estado.'
    );
    return true;
  }
}

/**
 * Remove um jogo da biblioteca do usuário
 */
export async function removeGameFromLibrary(userId, gameId) {
  if (!userId || !gameId) return false;
  const strId = String(gameId);

  // 1. Remove do cache local
  const currentLocal = getLocalLibrary(userId);
  const filtered = currentLocal.filter(g => g.id !== strId && g.gameId !== strId);
  saveLocalLibrary(userId, filtered);

  // 2. Remove do Firestore
  try {
    const gameRef = doc(db, 'users', userId, 'library', strId);
    await deleteDoc(gameRef);
    console.log(`[LibraryService] Jogo ${strId} removido do Firestore.`);
    return true;
  } catch (error) {
    console.warn('[LibraryService] Erro ao remover do Firestore:', error.message);
    return true;
  }
}

/**
 * Busca todos os jogos da biblioteca do usuário
 */
export async function getUserLibrary(userId) {
  if (!userId) return [];
  const localList = getLocalLibrary(userId);

  try {
    const libraryRef = collection(db, 'users', userId, 'library');
    const q = query(libraryRef, orderBy('addedAt', 'desc'));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const firestoreGames = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      saveLocalLibrary(userId, firestoreGames);
      return firestoreGames;
    }
  } catch (error) {
    console.warn('[LibraryService] Firestore offline ou regras restritivas, carregando biblioteca local:', error.message);
  }

  return localList;
}

/**
 * Verifica se um jogo específico está na biblioteca
 */
export async function isGameInLibrary(userId, gameId) {
  if (!userId || !gameId) return false;
  const strId = String(gameId);

  // Verifica cache local primeiro
  const localList = getLocalLibrary(userId);
  if (localList.some(g => g.id === strId || g.gameId === strId)) {
    return true;
  }

  try {
    const gameRef = doc(db, 'users', userId, 'library', strId);
    const snapshot = await getDoc(gameRef);
    return snapshot.exists();
  } catch {
    return false;
  }
}

/**
 * Atualiza o tempo jogado e última vez jogado
 */
export async function updateGamePlaytime(userId, gameId, hoursToAdd = 1) {
  if (!userId || !gameId) return false;
  const strId = String(gameId);

  // Atualiza cache local
  const localList = getLocalLibrary(userId);
  const target = localList.find(g => g.id === strId || g.gameId === strId);
  if (target) {
    target.hoursPlayed = (Number(target.hoursPlayed) || 0) + hoursToAdd;
    target.lastPlayed = 'Hoje';
    saveLocalLibrary(userId, localList);
  }

  // Atualiza Firestore
  try {
    const gameRef = doc(db, 'users', userId, 'library', strId);
    await setDoc(gameRef, {
      hoursPlayed: target ? target.hoursPlayed : hoursToAdd,
      lastPlayed: 'Hoje',
      lastPlayedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    console.warn('[LibraryService] Erro ao atualizar playtime no Firestore:', error.message);
    return true;
  }
}

