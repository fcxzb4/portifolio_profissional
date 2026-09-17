// Firebase Authentication Service
import { signInAnonymously as firebaseSignInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

/**
 * Login anônimo automático — cria uma sessão para o visitante
 * sem necessidade de conta. Depois será substituído por login real.
 */
export async function signInAnonymous() {
  try {
    const result = await firebaseSignInAnonymously(auth);
    return result.user;
  } catch (error) {
    console.error('[AuthService] Erro no login anônimo:', error);
    return null;
  }
}

/**
 * Retorna o usuário atual (ou null se não logado)
 */
export function getCurrentUser() {
  return auth.currentUser;
}

/**
 * Retorna o UID do usuário atual
 */
export function getCurrentUserId() {
  const user = auth.currentUser;
  return user ? user.uid : null;
}

/**
 * Observa mudanças no estado de autenticação
 */
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}
