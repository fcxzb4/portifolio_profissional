import React from 'react';
import {
  Users,
  Compass,
  FileText,
  Mail,
  Gamepad2,
  ExternalLink,
  Award
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export default function ProfileSidebar() {
  const { userProfile, libraryGames, goToLibrary } = useNavigation();

  const gamesCount = libraryGames?.length || 8;

  const friends = [
    {
      id: 'f1',
      name: 'Alex_Frontend',
      avatar: 'https://avatars.steamstatic.com/b5bd56c1aa4644a474a2e4972b3139e40d955134_medium.jpg',
      status: 'Jogando Visual Studio Code',
      inGame: true
    },
    {
      id: 'f2',
      name: 'Sarah_Backend',
      avatar: 'https://avatars.steamstatic.com/c5d17942e47ee20e3fb84577881c19b0d23cb602_medium.jpg',
      status: 'Jogando Cyberpunk 2077',
      inGame: true
    },
    {
      id: 'f3',
      name: 'Lucas_DevOps',
      avatar: 'https://avatars.steamstatic.com/7b32be7a877ebaf1b71457fb1e51b14ea9ea0f1b_medium.jpg',
      status: 'Online',
      inGame: false
    },
    {
      id: 'f4',
      name: 'Beatriz_QA',
      avatar: 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg',
      status: 'Ausente',
      inGame: false
    }
  ];

  return (
    <aside className="steam-profile-side-col">
      {/* Widget 1: Status Atual */}
      <div className="steam-side-widget">
        <div className="steam-side-widget-header">
          <h3>Status Atual</h3>
        </div>
        <div className="steam-side-widget-body">
          <div className="steam-user-status-card">
            <div className="steam-status-tag ingame">
              <span>● No jogo</span>
            </div>
            <div className="steam-status-game-name">
              {userProfile?.currentGame || 'Visual Studio Code'}
            </div>
            <div className="steam-status-subdetail">
              Construindo interfaces incríveis no React 18
            </div>
          </div>
        </div>
      </div>

      {/* Widget 2: Atalhos Rápidos */}
      <div className="steam-side-widget">
        <div className="steam-side-widget-header">
          <h3>Biblioteca e Conquistas</h3>
        </div>
        <div className="steam-side-widget-body">
          <div className="steam-links-list">
            <a
              href="#"
              className="steam-social-link-btn"
              onClick={(e) => { e.preventDefault(); goToLibrary(); }}
            >
              <div className="steam-social-link-btn-left">
                <Gamepad2 size={15} color="#66c0f4" />
                <span>Jogos na Biblioteca</span>
              </div>
              <span style={{ color: '#66c0f4', fontWeight: 'bold' }}>{gamesCount}</span>
            </a>

            <div className="steam-social-link-btn" style={{ cursor: 'default' }}>
              <div className="steam-social-link-btn-left">
                <Award size={15} color="#ffd700" />
                <span>Insígnias Desbloqueadas</span>
              </div>
              <span style={{ color: '#ffd700', fontWeight: 'bold' }}>28</span>
            </div>
          </div>
        </div>
      </div>

      {/* Widget 3: Amigos */}
      <div className="steam-side-widget">
        <div className="steam-side-widget-header">
          <h3>Amigos</h3>
          <span className="steam-side-widget-count">124</span>
        </div>
        <div className="steam-side-widget-body">
          <div className="steam-friends-grid">
            {friends.map(friend => (
              <div key={friend.id} className="steam-friend-item">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className={`steam-friend-avatar ${friend.inGame ? 'ingame' : ''}`}
                />
                <div className="steam-friend-info">
                  <span className="steam-friend-name">{friend.name}</span>
                  <span className={`steam-friend-status ${friend.inGame ? 'ingame' : ''}`}>
                    {friend.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Widget 4: Links Profissionais & Contato */}
      <div className="steam-side-widget">
        <div className="steam-side-widget-header">
          <h3>Conexões Profissionais</h3>
        </div>
        <div className="steam-side-widget-body">
          <div className="steam-links-list">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="steam-social-link-btn"
            >
              <div className="steam-social-link-btn-left">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub Repositories</span>
              </div>
              <ExternalLink size={12} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="steam-social-link-btn"
            >
              <div className="steam-social-link-btn-left">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#0077b5">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                <span>LinkedIn Profile</span>
              </div>
              <ExternalLink size={12} />
            </a>

            <a
              href="mailto:contato@desenvolvedor.com"
              className="steam-social-link-btn"
            >
              <div className="steam-social-link-btn-left">
                <Mail size={15} color="#57cbde" />
                <span>E-mail Profissional</span>
              </div>
              <ExternalLink size={12} />
            </a>

            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert('Download do Currículo em PDF simulado!'); }}
              className="steam-social-link-btn"
              style={{ background: 'linear-gradient(90deg, #2a475e 0%, #1b2838 100%)', borderColor: '#386280' }}
            >
              <div className="steam-social-link-btn-left">
                <FileText size={15} color="#a4d007" />
                <span style={{ color: '#ffffff' }}>Baixar Currículo (PDF)</span>
              </div>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
