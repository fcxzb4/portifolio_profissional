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

/**
 * Caminho da coleção de biblioteca do usuário
 */
function getLibraryRef(userId) {
  return collection(db, 'users', userId, 'library');
}

/**
 * Adiciona um jogo à biblioteca do usuário no Firestore
 * @param {string} userId - UID do Firebase Auth
 * @param {Object} gameData - Dados do jogo a ser salvo
 */
export async function addGameToLibrary(userId, gameData) {
  try {
    const gameRef = doc(db, 'users', userId, 'library', gameData.id);
    await setDoc(gameRef, {
      gameId: gameData.id,
      title: gameData.title,
      mainImage: gameData.mainImage || '',
      heroBanner: gameData.heroBanner || '',
      screenshots: gameData.screenshots || [],
      tags: gameData.tags || [],
      description: gameData.description || '',
      developer: gameData.developer || '',
      publisher: gameData.publisher || '',
      achievements: gameData.achievements || [],
      platforms: gameData.platforms || [],
      addedAt: serverTimestamp(),
      lastPlayed: null,
      hoursPlayed: 0
    });
    return true;
  } catch (error) {
    console.error('[LibraryService] Erro ao adicionar jogo:', error);
    return false;
  }
}

/**
 * Remove um jogo da biblioteca do usuário
 */
export async function removeGameFromLibrary(userId, gameId) {
  try {
    const gameRef = doc(db, 'users', userId, 'library', gameId);
    await deleteDoc(gameRef);
    return true;
  } catch (error) {
    console.error('[LibraryService] Erro ao remover jogo:', error);
    return false;
  }
}

/**
 * Busca todos os jogos da biblioteca do usuário
 */
export async function getUserLibrary(userId) {
  try {
    const libraryRef = getLibraryRef(userId);
    const q = query(libraryRef, orderBy('addedAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('[LibraryService] Erro ao buscar biblioteca:', error);
    return [];
  }
}

/**
 * Verifica se um jogo específico está na biblioteca
 */
export async function isGameInLibrary(userId, gameId) {
  try {
    const gameRef = doc(db, 'users', userId, 'library', gameId);
    const snapshot = await getDoc(gameRef);
    return snapshot.exists();
  } catch (error) {
    console.error('[LibraryService] Erro ao verificar jogo:', error);
    return false;
  }
}

/**
 * Atualiza o tempo jogado e última vez jogado
 */
export async function updateGamePlaytime(userId, gameId) {
  try {
    const gameRef = doc(db, 'users', userId, 'library', gameId);
    await setDoc(gameRef, {
      lastPlayed: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error('[LibraryService] Erro ao atualizar playtime:', error);
    return false;
  }
}
