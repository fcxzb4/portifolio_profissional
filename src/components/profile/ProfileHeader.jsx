import React from 'react';
import { Edit3, ExternalLink, ShieldCheck, Award, MessageSquare, MoreHorizontal } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export default function ProfileHeader({ onOpenEditModal }) {
  const { userProfile, libraryGames, currentUser } = useNavigation();

  const personaName = userProfile?.personaName || currentUser?.displayName || 'GamerDeveloper';
  const realName = userProfile?.realName || 'Rafael Fagnin';
  const city = userProfile?.city || 'São Paulo';
  const country = userProfile?.country || 'Brasil';
  const flag = userProfile?.countryFlag || '🇧🇷';
  const bio = userProfile?.bio || 'Desenvolvedor Full Stack apaixonado por interfaces de alta qualidade e games.';
  const avatarUrl = userProfile?.avatarUrl || 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg';
  const level = userProfile?.level || 42;
  const featuredBadge = userProfile?.featuredBadge || {
    title: 'Desenvolvedor Lendário',
    icon: '🏆',
    xp: 500,
    level: 5
  };

  // Cálculo de jogos e conquistas totais
  const gamesCount = libraryGames?.length || 8;
  const totalAchievements = libraryGames?.reduce((acc, g) => {
    return acc + (g.achievements ? g.achievements.filter(a => a.unlocked).length : 4);
  }, 0) || 36;

  return (
    <div className="steam-profile-header-card">
      {/* Coluna Esquerda: Avatar com Moldura + Dados do Usuário */}
      <div className="steam-profile-left-hero">
        <div className="steam-avatar-frame-wrap">
          <img
            src={avatarUrl}
            alt={personaName}
            className="steam-avatar-img"
          />
          <div className="steam-avatar-status-badge online">
            Online
          </div>
        </div>

        <div className="steam-profile-user-details">
          <h1 className="steam-persona-title">{personaName}</h1>

          <div className="steam-persona-meta">
            <span className="steam-real-name">{realName}</span>
            <span className="steam-country-loc">
              {flag} {city}, {country}
            </span>
          </div>

          <div className="steam-profile-bio-text">
            {bio}
          </div>

          <div className="steam-header-action-buttons">
            <button
              className="steam-btn-profile-edit"
              onClick={onOpenEditModal}
              title="Personalizar detalhes do seu perfil"
            >
              <Edit3 size={13} />
              <span>Editar Perfil</span>
            </button>

            <button
              className="steam-btn-profile-secondary"
              onClick={() => alert(`Enviando mensagem direta para ${personaName}...`)}
              title="Enviar Mensagem Steam"
            >
              <MessageSquare size={13} />
              <span>Enviar mensagem</span>
            </button>

            <button
              className="steam-btn-profile-secondary"
              title="Mais opções de perfil"
            >
              <MoreHorizontal size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Coluna Direita: Nível Steam, Insígnia em Destaque e Mini Estatísticas */}
      <div className="steam-profile-right-summary">
        {/* Nível Steam */}
        <div className="steam-level-display-box">
          <div className="steam-level-title-group">
            <span className="steam-level-label">Nível no Steam</span>
            <span className="steam-level-sub">Lendário</span>
          </div>
          <div className="steam-level-circle">
            {level}
          </div>
        </div>

        {/* Insígnia em Destaque */}
        <div className="steam-featured-badge-card" title={featuredBadge.title}>
          <div className="steam-featured-badge-icon">
            {featuredBadge.icon}
          </div>
          <div className="steam-featured-badge-info">
            <span className="steam-featured-badge-name">{featuredBadge.title}</span>
            <span className="steam-featured-badge-xp">{featuredBadge.xp} XP</span>
          </div>
        </div>

        {/* Mini Estatísticas */}
        <div className="steam-profile-quick-stats">
          <span className="steam-quick-stat-item">
            Insígnias: <b>28</b>
          </span>
          <span className="steam-quick-stat-item">
            Jogos: <b>{gamesCount}</b>
          </span>
          <span className="steam-quick-stat-item">
            Conquistas: <b>{totalAchievements}</b>
          </span>
        </div>
      </div>
    </div>
  );
}
