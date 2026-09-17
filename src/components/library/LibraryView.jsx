import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import LibrarySidebar from './LibrarySidebar';
import GameDetailPanel from './GameDetailPanel';
import '../../styles/library.css';

export default function LibraryView() {
  const {
    libraryGames,
    selectedLibraryGame,
    setSelectedLibraryGame,
    isLoadingLibrary,
    goToStore
  } = useNavigation();

  return (
    <div className="library-view">
      <LibrarySidebar
        games={libraryGames}
        selectedGame={selectedLibraryGame}
        onSelectGame={setSelectedLibraryGame}
        onGoToStore={goToStore}
      />
      <GameDetailPanel
        game={selectedLibraryGame}
      />
    </div>
  );
}
