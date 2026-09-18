import React from 'react';
import { Trophy, Star, Award, Play, Flame, CheckCircle } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { featuredGames } from '../../core/mock/steamData';

export default function ProfileShowcases() {
  const { libraryGames, goToLibrary } = useNavigation();

  // Seleciona o jogo favorito (da biblioteca ou mock)
  const favoriteGame = (libraryGames && libraryGames.length > 0)
    ? libraryGames[0]
    : featuredGames[0];

  const rareAchievements = [
    {
      id: 'ra1',
      icon: '🏆',
      title: 'Night City Legend',
      game: 'Cyberpunk 2077',
      rarity: '0.5%'
    },
    {
      id: 'ra2',
      icon: '🐒',
      title: 'Rei Macaco Divino',
      game: 'Black Myth: Wukong',
      rarity: '0.8%'
    },
    {
      id: 'ra3',
      icon: '🎲',
      title: 'Rolagem Crítica 20',
      game: "Baldur's Gate 3",
      rarity: '1.2%'
    },
    {
      id: 'ra4',
      icon: '⚡',
      title: '100% Clean Architecture',
      game: 'Steam Portfolio',
      rarity: '0.3%'
    }
  ];

  const badges = [
    { id: 'b1', icon: '⚛️', title: 'Arquiteto React', xp: '500 XP' },
    { id: 'b2', icon: '🔷', title: 'TypeScript Master', xp: '500 XP' },
    { id: 'b3', icon: '🔥', title: 'Firebase Wizard', xp: '400 XP' },
    { id: 'b4', icon: '🎨', title: 'Pixel Perfect UI', xp: '350 XP' },
    { id: 'b5', icon: '🛡️', title: 'Guardião do Git', xp: '250 XP' },
    { id: 'b6', icon: '⭐', title: '6 Anos de Serviço', xp: '300 XP' }
  ];

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
                  {favoriteGame.hoursPlayed || 156} horas registradas no Steam
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
                {favoriteGame.hoursPlayed || 156}h
              </span>
              <span className="steam-fav-stat-label">Tempo Registrado</span>
            </div>

            <div className="steam-fav-stat-card">
              <span className="steam-fav-stat-num steam-perfect-badge">
                6 / 6 (100%)
              </span>
              <span className="steam-fav-stat-label">Jogo Perfeito 🏆</span>
            </div>

            <div className="steam-fav-stat-card">
              <span className="steam-fav-stat-num" style={{ color: '#57cbde' }}>
                {favoriteGame.lastPlayed || 'Hoje'}
              </span>
              <span className="steam-fav-stat-label">Última Sessão</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vitrine 2: Expositor de Conquistas Raras */}
      <div className="steam-showcase-box">
        <div className="steam-showcase-header">
          <span className="steam-showcase-title">
            <Trophy size={16} color="#ffd700" />
            Expositor de Conquistas Raras
          </span>
          <span className="steam-showcase-tag">4 em Exibição</span>
        </div>

        <div className="steam-rarest-achievements-grid">
          {rareAchievements.map(achieve => (
            <div key={achieve.id} className="steam-rare-achieve-card" title={`${achieve.title} - ${achieve.game}`}>
              <div className="steam-rare-achieve-icon">{achieve.icon}</div>
              <span className="steam-rare-achieve-title">{achieve.title}</span>
              <span className="steam-rare-achieve-game">{achieve.game}</span>
              <span className="steam-rare-achieve-pct">{achieve.rarity} desbloquearam</span>
            </div>
          ))}
        </div>
      </div>

      {/* Vitrine 3: Colecionador de Insígnias */}
      <div className="steam-showcase-box">
        <div className="steam-showcase-header">
          <span className="steam-showcase-title">
            <Award size={16} color="#66c0f4" />
            Colecionador de Insígnias
          </span>
          <span className="steam-showcase-tag">28 Insígnias Totais</span>
        </div>

        <div className="steam-badges-showcase-grid">
          {badges.map(badge => (
            <div key={badge.id} className="steam-badge-tile" title={badge.title}>
              <div className="steam-badge-tile-icon">{badge.icon}</div>
              <div className="steam-badge-tile-info">
                <span className="steam-badge-tile-title">{badge.title}</span>
                <span className="steam-badge-tile-xp">{badge.xp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
