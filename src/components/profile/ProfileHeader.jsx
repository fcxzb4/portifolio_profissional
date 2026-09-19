import React from 'react';
import { Edit3, ExternalLink, ShieldCheck, Award, MessageSquare, MoreHorizontal } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export default function ProfileHeader({ onOpenEditModal }) {
  const { userProfile, libraryGames, currentUser } = useNavigation();

  const personaName = userProfile?.name || userProfile?.personaName || currentUser?.displayName || (currentUser?.email ? currentUser.email.split('@')[0] : 'Novo Usuário');
  const realName = userProfile?.realName || '';
  const city = userProfile?.city || '';
  const country = userProfile?.country || '';
  const flag = userProfile?.countryFlag || '';
  const bio = userProfile?.bio || '';
  const avatarUrl = userProfile?.bioPhoto || userProfile?.avatarUrl || 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg';
  const level = userProfile?.level || 1;
  const featuredBadge = userProfile?.featuredBadge || null;

  // Cálculo de jogos e conquistas totais da biblioteca do usuário
  const gamesCount = libraryGames?.length || 0;
  const totalAchievements = libraryGames?.reduce((acc, g) => {
    return acc + (g.achievements ? g.achievements.filter(a => a.unlocked).length : 0);
  }, 0) || 0;

  const displayAchievements = userProfile?.achivimants || totalAchievements || 0;
  const displayBatches = userProfile?.batches || 0;

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
            {realName && <span className="steam-real-name">{realName}</span>}
            {(city || country) && (
              <span className="steam-country-loc">
                {flag && `${flag} `}{[city, country].filter(Boolean).join(', ')}
              </span>
            )}
          </div>

          <div className="steam-profile-bio-text">
            {bio ? (
              bio
            ) : (
              <span style={{ color: '#8f98a0', fontStyle: 'italic', fontSize: '13px' }}>
                Nenhuma biografia informada. Clique em "Editar Perfil" para personalizar seu perfil Steam.
              </span>
            )}
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
            <span className="steam-level-sub">{level > 10 ? 'Veterano' : 'Iniciante'}</span>
          </div>
          <div className="steam-level-circle">
            {level}
          </div>
        </div>

        {/* Insígnia em Destaque */}
        {featuredBadge ? (
          <div className="steam-featured-badge-card" title={featuredBadge.title}>
            <div className="steam-featured-badge-icon">
              {featuredBadge.icon}
            </div>
            <div className="steam-featured-badge-info">
              <span className="steam-featured-badge-name">{featuredBadge.title}</span>
              <span className="steam-featured-badge-xp">{featuredBadge.xp} XP</span>
            </div>
          </div>
        ) : (
          <div className="steam-featured-badge-card" style={{ opacity: 0.7, borderStyle: 'dashed' }} title="Nenhuma insígnia selecionada">
            <div className="steam-featured-badge-icon" style={{ opacity: 0.5 }}>
              🎖️
            </div>
            <div className="steam-featured-badge-info">
              <span className="steam-featured-badge-name" style={{ color: '#8f98a0' }}>Sem Insígnia</span>
              <span className="steam-featured-badge-xp" style={{ color: '#626d78' }}>--</span>
            </div>
          </div>
        )}

        {/* Mini Estatísticas */}
        <div className="steam-profile-quick-stats">
          <span className="steam-quick-stat-item">
            Insígnias: <b>{displayBatches}</b>
          </span>
          <span className="steam-quick-stat-item">
            Jogos: <b>{gamesCount}</b>
          </span>
          <span className="steam-quick-stat-item">
            Conquistas: <b>{displayAchievements}</b>
          </span>
        </div>
      </div>
    </div>
  );
}
