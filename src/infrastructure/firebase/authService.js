// Firebase Authentication Service
import {
  signInAnonymously as firebaseSignInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from './firebaseConfig';

const FALLBACK_USER_KEY = 'steam_portfolio_guest_uid';

/**
 * Traduz códigos de erro do Firebase Auth para mensagens amigáveis em português
 */
export function formatAuthError(errorCode) {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'O endereço de e-mail informado não é válido.';
    case 'auth/user-disabled':
      return 'Esta conta foi desativada.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Nome de conta ou senha incorretos. Tente novamente.';
    case 'auth/email-already-in-use':
      return 'Este endereço de e-mail já está associado a outra conta Steam.';
    case 'auth/weak-password':
      return 'A senha é muito fraca. Utilize pelo menos 6 caracteres.';
    case 'auth/operation-not-allowed':
      return 'O método de login por e-mail/senha não está ativado no Firebase Console.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas sem sucesso. Aguarde alguns instantes antes de tentar novamente.';
    case 'auth/network-request-failed':
      return 'Falha de conexão com os servidores do Steam. Verifique sua rede.';
    default:
      return 'Ocorreu um erro ao processar sua solicitação. Tente novamente.';
  }
}

/**
 * Retorna ou gera um UID local de fallback para garantir funcionamento mesmo se
 * o provedor anônimo estiver temporariamente desativado no Firebase Console.
 */
function getLocalFallbackUid() {
  let uid = localStorage.getItem(FALLBACK_USER_KEY);
  if (!uid) {
    uid = 'guest_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
    localStorage.setItem(FALLBACK_USER_KEY, uid);
  }
  return uid;
}

/**
 * Login com E-mail e Senha
 */
export async function loginWithEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('[AuthService] Login com e-mail realizado:', userCredential.user.email);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('[AuthService] Erro no login:', error.code, error.message);
    return { success: false, error: formatAuthError(error.code), code: error.code };
  }
}

/**
 * Cadastro de nova conta Steam com E-mail, Senha e Nome de Exibição
 */
export async function registerWithEmail(email, password, displayName) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Atualiza o perfil com o nome de exibição (nickname Steam)
    if (displayName) {
      await updateProfile(userCredential.user, {
        displayName: displayName.trim()
      });
    }

    console.log('[AuthService] Conta criada com sucesso:', userCredential.user.email);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('[AuthService] Erro no cadastro:', error.code, error.message);
    return { success: false, error: formatAuthError(error.code), code: error.code };
  }
}

/**
 * Encerra a sessão do usuário atual
 */
export async function logoutUser() {
  try {
    await firebaseSignOut(auth);
    console.log('[AuthService] Sessão encerrada com sucesso.');
    return { success: true };
  } catch (error) {
    console.error('[AuthService] Erro ao encerrar sessão:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Login anônimo automático — cria uma sessão para o visitante no Firebase Auth.
 */
export async function signInAnonymous() {
  try {
    const result = await firebaseSignInAnonymously(auth);
    console.log('[AuthService] Autenticado anônimo no Firebase! UID:', result.user.uid);
    return result.user;
  } catch (error) {
    console.warn(
      '[AuthService] Aviso ao autenticar no Firebase Auth:',
      error.message
    );
    return { uid: getLocalFallbackUid(), isFallback: true, isAnonymous: true };
  }
}

/**
 * Retorna o usuário atual (Firebase ou fallback)
 */
export function getCurrentUser() {
  return auth.currentUser || { uid: getLocalFallbackUid(), isFallback: true, isAnonymous: true };
}

/**
 * Retorna o UID do usuário atual
 */
export function getCurrentUserId() {
  const user = auth.currentUser;
  return user ? user.uid : getLocalFallbackUid();
}

/**
 * Observa mudanças no estado de autenticação
 */
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}


