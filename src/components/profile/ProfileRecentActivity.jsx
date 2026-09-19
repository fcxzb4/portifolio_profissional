import React from 'react';
import { Play, Gamepad2 } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export default function ProfileRecentActivity() {
  const { libraryGames, goToLibrary, openGamePage, goToStore } = useNavigation();

  // Usa apenas jogos reais da biblioteca do usuário
  const recentList = (libraryGames && libraryGames.length > 0)
    ? libraryGames.slice(0, 3)
    : [];

  // Calcula horas totais recentes reais
  const totalRecentHours = recentList.reduce((acc, g) => acc + (Number(g.hoursPlayed) || 0), 0);

  return (
    <div className="steam-recent-activity-section">
      <div className="steam-recent-header">
        <h2>Atividade recente</h2>
        <span className="steam-recent-hours-badge">
          {totalRecentHours} horas registradas nas últimas 2 semanas
        </span>
      </div>

      {recentList.length > 0 ? (
        <div className="steam-recent-games-list">
          {recentList.map(game => {
            const unlockedCount = game.achievements
              ? game.achievements.filter(a => a.unlocked).length
              : 0;
            const totalCount = game.achievements ? game.achievements.length : 0;
            const pct = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

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
                    {game.hoursPlayed || 0} h registradas &bull; Última sessão: {game.lastPlayed || 'Recentemente'}
                  </div>

                  {totalCount > 0 && (
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
                  )}
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
      ) : (
        <div style={{ padding: '24px 16px', textAlign: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '4px' }}>
          <p style={{ color: '#8f98a0', fontSize: '13px', margin: '0 0 12px 0' }}>
            Nenhuma atividade recente registrada nas últimas 2 semanas.
          </p>
          <button
            className="steam-btn-profile-secondary"
            onClick={goToStore}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', padding: '6px 14px' }}
          >
            <Gamepad2 size={14} />
            <span>Navegar pela Loja</span>
          </button>
        </div>
      )}
    </div>
  );
}
