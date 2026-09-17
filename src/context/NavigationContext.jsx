import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInAnonymous, onAuthChange, getCurrentUserId } from '../infrastructure/firebase/authService';
import { getUserLibrary, addGameToLibrary, removeGameFromLibrary, isGameInLibrary } from '../infrastructure/firebase/libraryService';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  // Navegação global: "loja" | "biblioteca"
  const [activeView, setActiveView] = useState('loja');
  
  // Sub-view dentro da loja: null (home) | { type: 'gamepage', game: {...} }
  const [storeSubView, setStoreSubView] = useState(null);
  
  // Jogo selecionado na biblioteca
  const [selectedLibraryGame, setSelectedLibraryGame] = useState(null);
  
  // Jogos na biblioteca (carregados do Firestore)
  const [libraryGames, setLibraryGames] = useState([]);
  
  // Estado de autenticação
  const [userId, setUserId] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  // Loading state
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);

  // Inicializar Firebase Auth (anônimo)
  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
        setAuthReady(true);
      } else {
        // Tentar login anônimo
        signInAnonymous().then((user) => {
          if (user) {
            setUserId(user.uid);
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
    }
  }, [userId]);

  async function loadLibrary() {
    if (!userId) return;
    setIsLoadingLibrary(true);
    try {
      const games = await getUserLibrary(userId);
      setLibraryGames(games);
      // Se não tem jogo selecionado, seleciona o primeiro
      if (games.length > 0 && !selectedLibraryGame) {
        setSelectedLibraryGame(games[0]);
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
      setLibraryGames(prev => prev.filter(g => g.gameId !== gameId && g.id !== gameId));
      if (selectedLibraryGame && (selectedLibraryGame.gameId === gameId || selectedLibraryGame.id === gameId)) {
        setSelectedLibraryGame(null);
      }
    }
    return success;
  }

  // Verificar se jogo está na biblioteca
  async function checkGameInLibrary(gameId) {
    if (!userId) return false;
    return await isGameInLibrary(userId, gameId);
  }

  // Navegar para a loja
  function goToStore() {
    setActiveView('loja');
    setStoreSubView(null);
  }

  // Navegar para a página de um jogo na loja
  function openGamePage(game) {
    setActiveView('loja');
    setStoreSubView({ type: 'gamepage', game });
  }

  // Navegar para a biblioteca
  function goToLibrary() {
    setActiveView('biblioteca');
  }

  // Voltar para a home da loja
  function goToStoreHome() {
    setStoreSubView(null);
  }

  const value = {
    activeView,
    setActiveView,
    storeSubView,
    setStoreSubView,
    selectedLibraryGame,
    setSelectedLibraryGame,
    libraryGames,
    isLoadingLibrary,
    userId,
    authReady,
    downloadGame,
    uninstallGame,
    checkGameInLibrary,
    loadLibrary,
    goToStore,
    goToLibrary,
    openGamePage,
    goToStoreHome
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
