import React, { useState } from 'react';
import '../../styles/library.css';

export default function LibrarySidebar({ 
  games, 
  selectedGame, 
  onSelectGame, 
  onGoToStore 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('inicio');

  // Filtrar jogos pela busca
  const filteredGames = games.filter(game => {
    const title = game.title || '';
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <aside className="library-sidebar">
      {/* Sidebar Tabs */}
      <div className="library-sidebar-header">
        <button
          className={`library-sidebar-tab ${activeTab === 'inicio' ? 'active' : ''}`}
          onClick={() => setActiveTab('inicio')}
        >
          Início
        </button>
        <button
          className={`library-sidebar-tab ${activeTab === 'colecoes' ? 'active' : ''}`}
          onClick={() => setActiveTab('colecoes')}
        >
          Coleções
        </button>
      </div>

      {/* Search */}
      <div className="library-search-wrapper">
        <input
          type="text"
          placeholder="Buscar na biblioteca..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="library-search-input"
        />
      </div>

      {/* Game List */}
      <div className="library-games-list">
        {filteredGames.length > 0 ? (
          <>
            {/* Section: Recentes */}
            <div className="library-section-label">Recentes</div>
            {filteredGames.map((game, index) => {
              const gameId = game.gameId || game.id;
              const selectedId = selectedGame ? (selectedGame.gameId || selectedGame.id) : null;
              const isActive = selectedId === gameId;

              return (
                <div
                  key={gameId}
                  className={`library-game-item ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectGame(game)}
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <img
                    src={game.mainImage}
                    alt={game.title}
                    className="library-game-icon"
                  />
                  <span className="library-game-title">{game.title}</span>
                  <span className="library-game-status installed" title="Instalado"></span>
                </div>
              );
            })}
          </>
        ) : games.length === 0 ? (
          /* Empty State */
          <div className="library-empty">
            <div className="library-empty-icon">📚</div>
            <div className="library-empty-title">Sua biblioteca está vazia</div>
            <div className="library-empty-text">
              Visite a Loja para descobrir jogos incríveis e adicioná-los à sua biblioteca.
            </div>
            <button className="library-empty-btn" onClick={onGoToStore}>
              Visitar a Loja
            </button>
          </div>
        ) : (
          /* No results from search */
          <div className="library-empty">
            <div className="library-empty-icon">🔍</div>
            <div className="library-empty-title">Nenhum jogo encontrado</div>
            <div className="library-empty-text">
              Tente buscar com um termo diferente.
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
