import React from 'react';
import { Trophy, Star, Award, Play, Gamepad2 } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export default function ProfileShowcases() {
  const { libraryGames, goToLibrary, goToStore, userProfile } = useNavigation();

  // Jogo favorito (determinado pelo campo favoriteGame ou o primeiro da biblioteca)
  const favoriteGameFromProfile = userProfile?.favoriteGame
    ? (libraryGames?.find(g => g.title?.toLowerCase() === userProfile.favoriteGame.toLowerCase() || g.id === userProfile.favoriteGame) || {
        id: 'fav_custom',
        title: userProfile.favoriteGame,
        hoursPlayed: 0,
        mainImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
        heroBanner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
      })
    : null;

  const favoriteGame = favoriteGameFromProfile || ((libraryGames && libraryGames.length > 0) ? libraryGames[0] : null);

  // Conquistas reais desbloqueadas pelo usuário nos seus jogos
  const userUnlockedAchievements = libraryGames?.flatMap(g => 
    (g.achievements || [])
      .filter(a => a.unlocked)
      .map(a => ({
        id: a.id || `${g.id}_${a.title}`,
        icon: a.icon || '🏆',
        title: a.title,
        game: g.title,
        description: a.description
      }))
  ) || [];

  const totalAchievementsCount = userProfile?.achivimants || userUnlockedAchievements.length;
  const totalBatchesCount = userProfile?.batches || 0;

  return (
    <>
      {/* Vitrine 1: Jogo Favorito */}
      <div className="steam-showcase-box">
        <div className="steam-showcase-header">
          <span className="steam-showcase-title">
            <Star size={16} color="#ffd700" />
            Jogo Favorito em Destaque
          </span>
          <span className="steam-showcase-tag">Vitrine Principal</span>
        </div>

        {favoriteGame ? (
          <div className="steam-favorite-game-content">
            <div className="steam-fav-game-hero-banner">
              <img
                src={favoriteGame.heroBanner || favoriteGame.mainImage}
                alt={favoriteGame.title}
                className="steam-fav-game-img"
              />
              <div className="steam-fav-game-overlay">
                <div className="steam-fav-game-info">
                  <h3>{favoriteGame.title}</h3>
                  <span className="steam-fav-game-hours">
                    {favoriteGame.hoursPlayed || 0} horas registradas no Steam
                  </span>
                </div>

                <button
                  className="steam-fav-game-play-btn"
                  onClick={() => goToLibrary(favoriteGame)}
                  title="Abrir jogo na biblioteca"
                >
                  <Play size={14} fill="#ffffff" />
                  <span>Jogar Agora</span>
                </button>
              </div>
            </div>

            <div className="steam-fav-game-stats-row">
              <div className="steam-fav-stat-card">
                <span className="steam-fav-stat-num">
                  {favoriteGame.hoursPlayed || 0}h
                </span>
                <span className="steam-fav-stat-label">Tempo Registrado</span>
              </div>

              <div className="steam-fav-stat-card">
                <span className="steam-fav-stat-num steam-perfect-badge">
                  {favoriteGame.achievements ? favoriteGame.achievements.filter(a => a.unlocked).length : 0} Conquistas
                </span>
                <span className="steam-fav-stat-label">Progresso</span>
              </div>

              <div className="steam-fav-stat-card">
                <span className="steam-fav-stat-num" style={{ color: '#57cbde' }}>
                  {favoriteGame.lastPlayed || 'Recentemente'}
                </span>
                <span className="steam-fav-stat-label">Última Sessão</span>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: '28px 20px', textAlign: 'center' }}>
            <p style={{ color: '#8f98a0', fontSize: '13px', margin: '0 0 14px 0' }}>
              Nenhum jogo na sua biblioteca para exibir em destaque.
            </p>
            <button
              className="steam-btn-profile-secondary"
              onClick={goToStore}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', padding: '6px 16px' }}
            >
              <Gamepad2 size={15} />
              <span>Explorar Loja e Adicionar Jogos</span>
            </button>
          </div>
        )}
      </div>

      {/* Vitrine 2: Expositor de Conquistas Raras */}
      <div className="steam-showcase-box">
        <div className="steam-showcase-header">
          <span className="steam-showcase-title">
            <Trophy size={16} color="#ffd700" />
            Expositor de Conquistas
          </span>
          <span className="steam-showcase-tag">
            {totalAchievementsCount} Desbloqueadas
          </span>
        </div>

        {userUnlockedAchievements.length > 0 ? (
          <div className="steam-rarest-achievements-grid">
            {userUnlockedAchievements.slice(0, 4).map(achieve => (
              <div key={achieve.id} className="steam-rare-achieve-card" title={`${achieve.title} - ${achieve.game}`}>
                <div className="steam-rare-achieve-icon">{achieve.icon}</div>
                <span className="steam-rare-achieve-title">{achieve.title}</span>
                <span className="steam-rare-achieve-game">{achieve.game}</span>
                <span className="steam-rare-achieve-pct">{achieve.description || 'Conquistada'}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '24px 20px', textAlign: 'center' }}>
            <p style={{ color: '#8f98a0', fontSize: '13px', margin: 0 }}>
              {totalAchievementsCount > 0
                ? `${totalAchievementsCount} conquistas registradas no perfil.`
                : 'Nenhuma conquista desbloqueada no momento. Jogue seus projetos na Biblioteca para conquistar marcos e exibi-los aqui.'}
            </p>
          </div>
        )}
      </div>

      {/* Vitrine 3: Colecionador de Insígnias */}
      <div className="steam-showcase-box">
        <div className="steam-showcase-header">
          <span className="steam-showcase-title">
            <Award size={16} color="#66c0f4" />
            Colecionador de Insígnias
          </span>
          <span className="steam-showcase-tag">{totalBatchesCount} Insígnias Totais</span>
        </div>

        <div style={{ padding: '24px 20px', textAlign: 'center' }}>
          <p style={{ color: '#8f98a0', fontSize: '13px', margin: 0 }}>
            {totalBatchesCount > 0
              ? `${totalBatchesCount} insígnias conquistadas na conta.`
              : 'Nenhuma insígnia conquistada ainda. Conforme você utiliza a plataforma e conclui marcos, novas insígnias serão exibidas aqui.'}
          </p>
        </div>
      </div>
    </>
  );
}
