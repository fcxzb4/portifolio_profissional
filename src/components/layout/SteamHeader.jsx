import React, { useState } from 'react';
import { Download, Bell, ChevronDown } from 'lucide-react';
import '../../styles/header.css';

export default function SteamHeader() {
  const [activeTab, setActiveTab] = useState('loja');

  return (
    <header className="steam-global-header">
      <div className="steam-global-header-inner">
        {/* Steam Brand Logo & Main Navigation */}
        <div className="steam-brand-nav">
          <a href="#" className="steam-logo-link" title="Página inicial do Steam">
            {/* Steam Official Logo SVG */}
            <svg
              className="steam-logo-img"
              viewBox="0 0 176 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 0C9.85 0 0 9.85 0 22C0 32.25 6.99 40.85 16.5 43.34L26.39 29.83C25.7 28.5 25.32 27.02 25.32 25.44C25.32 20.37 29.43 16.26 34.5 16.26C39.57 16.26 43.68 20.37 43.68 25.44C43.68 30.51 39.57 34.62 34.5 34.62C34.33 34.62 34.16 34.61 34 34.6L24.32 43.91C24.87 43.97 25.43 44 26 44C38.15 44 48 34.15 48 22C48 9.85 38.15 0 26 0H22Z"
                fill="#C6D4DF"
              />
              <circle cx="34.5" cy="25.5" r="5.5" fill="#171A21" stroke="#C6D4DF" strokeWidth="3" />
              <text
                x="56"
                y="29"
                fill="#C6D4DF"
                fontSize="24"
                fontWeight="800"
                fontFamily="sans-serif"
                letterSpacing="4"
              >
                STEAM
              </text>
            </svg>
          </a>

          <nav className="steam-nav-items">
            <a
              href="#store"
              className={`steam-nav-link ${activeTab === 'loja' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveTab('loja'); }}
            >
              LOJA
            </a>
            <a
              href="#community"
              className={`steam-nav-link ${activeTab === 'comunidade' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveTab('comunidade'); }}
            >
              COMUNIDADE
            </a>
            <a
              href="#about"
              className={`steam-nav-link ${activeTab === 'sobre' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveTab('sobre'); }}
            >
              SOBRE
            </a>
            <a
              href="#support"
              className={`steam-nav-link ${activeTab === 'suporte' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveTab('suporte'); }}
            >
              SUPORTE
            </a>
          </nav>
        </div>

        {/* User profile, install button & language */}
        <div className="steam-header-tools">
          <div className="steam-header-tools-top">
            <button className="steam-install-btn" title="Baixar cliente Steam">
              <Download className="steam-install-icon" />
              <span>Instalar o Steam</span>
            </button>

            <div className="steam-notif-bell" title="Notificações">
              <Bell size={14} />
              <span className="steam-notif-badge">3</span>
            </div>

            <div className="steam-top-links">
              <span className="steam-top-link">idioma</span>
              <ChevronDown size={12} />
            </div>
          </div>

          {/* User Account Widget */}
          <div className="steam-user-profile" title="Ver perfil">
            <img
              src="https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg"
              alt="Avatar do Usuário"
              className="steam-user-avatar"
            />
            <div className="steam-user-info">
              <div className="steam-username">
                <span>GamerDeveloper</span>
                <ChevronDown size={11} />
              </div>
              <div className="steam-user-wallet">R$ 145,20</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
