import React, { useState } from 'react';
import { ExternalLink, GitBranch, Trash2, Play, CheckCircle } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import '../../styles/library.css';

export default function GameDetailPanel({ game }) {
  const { playGame, uninstallGame } = useNavigation();
  const [activeTab, setActiveTab] = useState('store');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUninstalling, setIsUninstalling] = useState(false);

  if (!game) {
    return (
      <div className="library-detail-panel">
        <div className="library-no-selection">
          <div className="library-no-selection-icon">🎮</div>
          <div className="library-no-selection-text">
            Selecione um jogo na biblioteca
          </div>
        </div>
      </div>
    );
  }

  const gameId = game.id || game.gameId;
  const title = game.title || 'Jogo';
  const heroBanner = game.heroBanner || game.mainImage || '';
  const screenshots = game.screenshots || [];
  const tags = game.tags || [];
  const description = game.description || '';
  const developer = game.developer || 'Desconhecido';
  const publisher = game.publisher || 'Desconhecido';
  const achievements = game.achievements || [];
  const hoursPlayed = game.hoursPlayed || 0;
  const lastPlayed = game.lastPlayed || 'Hoje';

  const totalAchievements = achievements.length;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const achievementPercent = totalAchievements > 0
    ? Math.round((unlockedAchievements / totalAchievements) * 100)
    : 0;

  const tabs = [
    { id: 'store', label: 'Página da Loja' },
    { id: 'dlc', label: 'DLC' },
    { id: 'community', label: 'Comunidade' },
    { id: 'discussions', label: 'Discussões' },
    { id: 'guides', label: 'Guias' },
    { id: 'support', label: 'Suporte' }
  ];

  async function handlePlay() {
    setIsPlaying(true);
    await playGame(gameId);
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  }

  async function handleUninstall() {
    if (window.confirm(`Deseja desinstalar "${title}" da sua biblioteca?`)) {
      setIsUninstalling(true);
      await uninstallGame(gameId);
      setIsUninstalling(false);
    }
  }

  return (
    <div className="library-detail-panel" key={gameId}>
      {/* Hero Section with Background */}
      <div
        className="library-hero"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="library-hero-content">
          <h1 className="library-hero-title">{title}</h1>

          {/* Action Buttons */}
          <div className="library-action-row">
            <button
              className={`library-play-btn ${isPlaying ? 'playing' : ''}`}
              title={isPlaying ? "Jogo em execução..." : "Jogar"}
              onClick={handlePlay}
              disabled={isPlaying}
            >
              {isPlaying ? 'EXECUTANDO...' : '▶ JOGAR'}
            </button>
            <button
              className="library-action-secondary"
              title="Código Fonte"
              onClick={() => alert(`Código-fonte do projeto "${title}" em desenvolvimento.`)}
            >
              <GitBranch size={14} />
              Código Fonte
            </button>
            <button
              className="library-action-secondary danger"
              title="Desinstalar Jogo"
              onClick={handleUninstall}
              disabled={isUninstalling}
            >
              <Trash2 size={14} />
              {isUninstalling ? 'Desinstalando...' : 'Desinstalar'}
            </button>
          </div>

          {/* Download status text */}
          <div className="library-download-text">
            {isPlaying ? (
              <span style={{ color: '#a4d007' }}>🟢 EM EXECUÇÃO · Aproveite a sessão de jogo!</span>
            ) : (
              <span><CheckCircle size={12} style={{ display: 'inline', marginRight: 4 }} /> INSTALADO · Pronto para jogar · {hoursPlayed}h registradas</span>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="library-tabs-bar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`library-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="library-content-area">
        {/* Left: Activity & Info */}
        <div className="library-activity">
          {/* Screenshots as "New Content" */}
          {screenshots.length > 0 && (
            <>
              <div className="library-activity-header">
                Novo conteúdo publicado
              </div>
              <div className="library-content-cards">
                {screenshots.map((ss, i) => (
                  <div key={i} className="library-content-card">
                    <img
                      src={ss}
                      alt={`Screenshot ${i + 1}`}
                      className="library-content-card-img"
                    />
                    <div className="library-content-card-title">
                      Captura de tela {i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Activity / Description */}
          <div className="library-activity-header">Atividade</div>
          <div className="library-description">
            <h3>Sobre este jogo</h3>
            <p>{description}</p>
            {tags.length > 0 && (
              <div className="library-tags">
                {tags.map((tag, i) => (
                  <span key={i} className="library-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="library-right-col">
          {/* Friends who play (mock) */}
          <div className="library-friends-section">
            <div className="library-friends-title">Amigos que jogam</div>
            <div className="library-friends-count">
              3 amigos jogaram recentemente
            </div>
            <div className="library-friends-avatars">
              <div className="library-friend-avatar"></div>
              <div className="library-friend-avatar"></div>
              <div className="library-friend-avatar"></div>
            </div>
          </div>

          {/* Achievements */}
          {totalAchievements > 0 && (
            <div className="library-achievements-section">
              <div className="library-achievements-title">Conquistas</div>
              <div className="library-achievements-progress">
                <div className="library-achievements-bar">
                  <div
                    className="library-achievements-fill"
                    style={{ width: `${achievementPercent}%` }}
                  ></div>
                </div>
                <span className="library-achievements-text">
                  {unlockedAchievements}/{totalAchievements} ({achievementPercent}%)
                </span>
              </div>
              <div className="library-achievements-grid">
                {achievements.map((ach, i) => (
                  <div
                    key={i}
                    className={`library-achievement-item ${!ach.unlocked ? 'locked' : ''}`}
                    title={ach.name}
                  >
                    {ach.icon}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Game Meta Info */}
          <div className="library-meta-info">
            <div className="library-meta-row">
              <span className="library-meta-label">Desenvolvedor</span>
              <span className="library-meta-value">
                <a href="#">{developer}</a>
              </span>
            </div>
            <div className="library-meta-row">
              <span className="library-meta-label">Editora</span>
              <span className="library-meta-value">
                <a href="#">{publisher}</a>
              </span>
            </div>
            <div className="library-meta-row">
              <span className="library-meta-label">Tempo Jogado</span>
              <span className="library-meta-value">{hoursPlayed}h</span>
            </div>
            <div className="library-meta-row">
              <span className="library-meta-label">Último Acesso</span>
              <span className="library-meta-value">{lastPlayed}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
