import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInAnonymous,
  loginWithEmail,
  registerWithEmail,
  logoutUser,
  onAuthChange,
  getCurrentUserId
} from '../infrastructure/firebase/authService';
import {
  getUserLibrary,
  addGameToLibrary,
  removeGameFromLibrary,
  isGameInLibrary,
  updateGamePlaytime
} from '../infrastructure/firebase/libraryService';
import {
  getUserProfileData,
  saveUserProfileData,
  getProfileComments,
  addProfileComment,
  DEFAULT_USER_PROFILE
} from '../infrastructure/firebase/profileService';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  // Navegação global: "loja" | "biblioteca" | "perfil"
  const [activeView, setActiveView] = useState('loja');
  
  // Sub-view dentro da loja: null (home) | { type: 'gamepage', game: {...} }
  const [storeSubView, setStoreSubView] = useState(null);
  
  // Jogo selecionado na biblioteca
  const [selectedLibraryGame, setSelectedLibraryGame] = useState(null);
  
  // Jogos na biblioteca (carregados do Firestore)
  const [libraryGames, setLibraryGames] = useState([]);
  
  // Estado de autenticação
  const [currentUser, setCurrentUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  // Modal de Login/Cadastro
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // Loading state
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);

  // Perfil e Comentários do Usuário
  const [userProfile, setUserProfile] = useState(DEFAULT_USER_PROFILE);
  const [profileComments, setProfileComments] = useState([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  // Inicializar observador do Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        setCurrentUser(user);
        setUserId(user.uid);
        setAuthReady(true);
      } else {
        signInAnonymous().then((u) => {
          if (u) {
            setCurrentUser(u);
            setUserId(u.uid);
          }
          setAuthReady(true);
        });
      }
    });

    return () => unsubscribe();
  }, []);


  // Carregar biblioteca quando userId mudar
  useEffect(() => {
    if (userId) {
      loadLibrary();
      loadProfileData();
    }
  }, [userId, currentUser]);

  async function loadProfileData() {
    setIsLoadingProfile(true);
    try {
      const data = await getUserProfileData(userId, currentUser);
      setUserProfile(data);
      const comments = await getProfileComments(userId);
      setProfileComments(comments);
    } catch (err) {
      console.warn('[Nav] Erro ao carregar perfil:', err);
    }
    setIsLoadingProfile(false);
  }

  async function updateUserProfile(updates) {
    setUserProfile(prev => ({ ...prev, ...updates }));
    if (userId) {
      const success = await saveUserProfileData(userId, updates);
      return success;
    }
    return true;
  }

  async function postProfileComment(text) {
    const created = await addProfileComment(userId, currentUser, text);
    if (created) {
      setProfileComments(prev => [created, ...prev]);
    }
    return created;
  }

  async function loadLibrary() {
    if (!userId) return;
    setIsLoadingLibrary(true);
    try {
      const games = await getUserLibrary(userId);
      setLibraryGames(games);
      // Se não tem jogo selecionado ou se o atual foi removido, seleciona o primeiro
      if (games.length > 0) {
        setSelectedLibraryGame(prev => {
          if (!prev) return games[0];
          const found = games.find(g => (g.id === prev.id || g.gameId === prev.gameId));
          return found || games[0];
        });
      } else {
        setSelectedLibraryGame(null);
      }
    } catch (error) {
      console.error('[Nav] Erro ao carregar biblioteca:', error);
    }
    setIsLoadingLibrary(false);
  }

  // Adicionar jogo à biblioteca
  async function downloadGame(gameData) {
    if (!userId) return false;
    const success = await addGameToLibrary(userId, gameData);
    if (success) {
      await loadLibrary();
    }
    return success;
  }

  // Remover jogo da biblioteca
  async function uninstallGame(gameId) {
    if (!userId) return false;
    const success = await removeGameFromLibrary(userId, gameId);
    if (success) {
      await loadLibrary();
    }
    return success;
  }

  // Simular sessão de jogo e registrar playtime
  async function playGame(gameId) {
    if (!userId) return false;
    const success = await updateGamePlaytime(userId, gameId, 1);
    if (success) {
      await loadLibrary();
    }
    return success;
  }

  // Verificar se jogo está na biblioteca
  async function checkGameInLibrary(gameId) {
    if (!userId) return false;
    return await isGameInLibrary(userId, gameId);
  }

  // Controladores do Modal de Autenticação
  function openLoginModal() {
    setAuthMode('login');
    setAuthModalOpen(true);
  }

  function openRegisterModal() {
    setAuthMode('register');
    setAuthModalOpen(true);
  }

  function closeAuthModal() {
    setAuthModalOpen(false);
  }

  // Ações de Autenticação do Firebase
  async function login(email, password) {
    const result = await loginWithEmail(email, password);
    if (result.success) {
      closeAuthModal();
    }
    return result;
  }

  async function register(email, password, displayName) {
    const result = await registerWithEmail(email, password, displayName);
    if (result.success) {
      closeAuthModal();
    }
    return result;
  }

  async function logout() {
    const result = await logoutUser();
    if (result.success) {
      // Re-associa como visitante/anônimo
      signInAnonymous().then(u => {
        if (u) {
          setCurrentUser(u);
          setUserId(u.uid);
        }
      });
    }
    return result;
  }

  // Funções de Navegação
  function goToStore() {
    setActiveView('loja');
    setStoreSubView(null);
  }

  function goToStoreHome() {
    goToStore();
  }

  function goToLibrary(gameOrId) {
    setActiveView('biblioteca');
    if (typeof gameOrId === 'string' && libraryGames.length > 0) {
      const found = libraryGames.find(g => (g.id === gameOrId || g.gameId === gameOrId));
      if (found) {
        setSelectedLibraryGame(found);
      }
    } else if (gameOrId && typeof gameOrId === 'object' && !gameOrId.nativeEvent && gameOrId.id) {
      const found = libraryGames.find(g => (g.id === gameOrId.id || g.gameId === gameOrId.id));
      if (found) {
        setSelectedLibraryGame(found);
      }
    }
  }

  function openGamePage(game) {
    setActiveView('loja');
    setStoreSubView({ type: 'gamepage', game });
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function goToProfile() {
    setActiveView('perfil');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Usuário autenticado com conta real (não anônimo)
  const isLoggedIn = Boolean(currentUser && !currentUser.isAnonymous && currentUser.email);

  const value = {
    activeView,
    setActiveView,
    storeSubView,
    setStoreSubView,
    selectedLibraryGame,
    setSelectedLibraryGame,
    libraryGames,
    isLoadingLibrary,
    currentUser,
    userId,
    authReady,
    isLoggedIn,
    authModalOpen,
    authMode,
    setAuthMode,
    openLoginModal,
    openRegisterModal,
    closeAuthModal,
    login,
    register,
    logout,
    downloadGame,
    uninstallGame,
    playGame,
    checkGameInLibrary,
    loadLibrary,
    goToStore,
    goToLibrary,
    openGamePage,
    goToStoreHome,
    goToProfile,
    userProfile,
    updateUserProfile,
    profileComments,
    postProfileComment,
    isLoadingProfile,
    loadProfileData
  };



  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation deve ser usado dentro de NavigationProvider');
  }
  return context;
}

export default NavigationContext;
