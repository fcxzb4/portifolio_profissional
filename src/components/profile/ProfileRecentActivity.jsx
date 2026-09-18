import React from 'react';
import { Play, Clock } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { featuredGames } from '../../core/mock/steamData';

export default function ProfileRecentActivity() {
  const { libraryGames, goToLibrary, openGamePage } = useNavigation();

  // Usa jogos da biblioteca ou os destaques mockados
  const recentList = (libraryGames && libraryGames.length > 0)
    ? libraryGames.slice(0, 3)
    : featuredGames.slice(0, 3);

  // Calcula horas totais recentes
  const totalRecentHours = recentList.reduce((acc, g) => acc + (Number(g.hoursPlayed) || 15), 0);

  return (
    <div className="steam-recent-activity-section">
      <div className="steam-recent-header">
        <h2>Atividade recente</h2>
        <span className="steam-recent-hours-badge">
          {totalRecentHours} horas registradas nas últimas 2 semanas
        </span>
      </div>

      <div className="steam-recent-games-list">
        {recentList.map(game => {
          const unlockedCount = game.achievements
            ? game.achievements.filter(a => a.unlocked).length
            : 5;
          const totalCount = game.achievements ? game.achievements.length : 8;
          const pct = Math.round((unlockedCount / Math.max(totalCount, 1)) * 100);

          return (
            <div key={game.id} className="steam-recent-game-item">
              <a
                href="#"
                className="steam-recent-thumb-link"
                onClick={(e) => { e.preventDefault(); openGamePage(game); }}
                title={game.title}
              >
                <img
                  src={game.mainImage || game.capsule || game.heroBanner}
                  alt={game.title}
                  className="steam-recent-thumb-img"
                />
              </a>

              <div className="steam-recent-game-info">
                <h3
                  className="steam-recent-game-title"
                  onClick={() => openGamePage(game)}
                >
                  {game.title}
                </h3>
                <div className="steam-recent-game-time">
                  {game.hoursPlayed || 24} h registradas &bull; Última sessão: {game.lastPlayed || 'Hoje'}
                </div>

                <div className="steam-recent-game-achieve-bar-wrap">
                  <div className="steam-achieve-bar-bg">
                    <div
                      className="steam-achieve-bar-fill"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="steam-achieve-bar-label">
                    Progresso de Conquistas: {unlockedCount} de {totalCount} ({pct}%)
                  </div>
                </div>
              </div>

              <div className="steam-recent-game-action">
                <button
                  className="steam-recent-play-link"
                  onClick={() => goToLibrary(game)}
                  title="Abrir no cliente da Biblioteca"
                >
                  Jogar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
