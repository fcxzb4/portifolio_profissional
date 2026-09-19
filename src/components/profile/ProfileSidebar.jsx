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

  const gamesCount = libraryGames?.length || 0;
  const currentGame = userProfile?.currentGame;
  const socialLinks = userProfile?.socialLinks;
  const hasSocialLinks = Boolean(
    socialLinks?.github || socialLinks?.linkedin || socialLinks?.email || socialLinks?.portfolio
  );

  return (
    <aside className="steam-profile-side-col">
      {/* Widget 1: Status Atual */}
      <div className="steam-side-widget">
        <div className="steam-side-widget-header">
          <h3>Status Atual</h3>
        </div>
        <div className="steam-side-widget-body">
          <div className="steam-user-status-card">
            {currentGame ? (
              <>
                <div className="steam-status-tag ingame">
                  <span>● No jogo</span>
                </div>
                <div className="steam-status-game-name">
                  {currentGame}
                </div>
              </>
            ) : (
              <>
                <div className="steam-status-tag online">
                  <span>● Online</span>
                </div>
                <div className="steam-status-game-name" style={{ color: '#8f98a0', fontSize: '13px' }}>
                  Nenhum jogo em execução
                </div>
              </>
            )}
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
              <span style={{ color: '#ffd700', fontWeight: 'bold' }}>0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Widget 3: Amigos */}
      <div className="steam-side-widget">
        <div className="steam-side-widget-header">
          <h3>Amigos</h3>
          <span className="steam-side-widget-count">0</span>
        </div>
        <div className="steam-side-widget-body">
          <p style={{ color: '#8f98a0', fontSize: '12px', margin: '4px 0 0 0' }}>
            Nenhum amigo adicionado ainda.
          </p>
        </div>
      </div>

      {/* Widget 4: Links Profissionais & Contato */}
      <div className="steam-side-widget">
        <div className="steam-side-widget-header">
          <h3>Conexões Profissionais</h3>
        </div>
        <div className="steam-side-widget-body">
          {hasSocialLinks ? (
            <div className="steam-links-list">
              {socialLinks.github && (
                <a
                  href={socialLinks.github.startsWith('http') ? socialLinks.github : `https://${socialLinks.github}`}
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
              )}

              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin.startsWith('http') ? socialLinks.linkedin : `https://${socialLinks.linkedin}`}
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
              )}

              {socialLinks.email && (
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="steam-social-link-btn"
                >
                  <div className="steam-social-link-btn-left">
                    <Mail size={15} color="#57cbde" />
                    <span>E-mail Profissional</span>
                  </div>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          ) : (
            <p style={{ color: '#8f98a0', fontSize: '12px', margin: '4px 0 0 0' }}>
              Nenhum link adicionado ainda. Configure no botão "Editar Perfil".
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
