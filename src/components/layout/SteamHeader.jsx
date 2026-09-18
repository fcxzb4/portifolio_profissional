import React, { useState, useRef, useEffect } from 'react';
import { Download, Bell, ChevronDown, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import '../../styles/header.css';

export default function SteamHeader() {
  const {
    activeView,
    setActiveView,
    goToStore,
    goToLibrary,
    goToProfile,
    userProfile,
    isLoggedIn,
    currentUser,
    openLoginModal,
    logout
  } = useNavigation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navTabs = [
    { id: 'loja', label: 'LOJA' },
    { id: 'biblioteca', label: 'BIBLIOTECA' },
    { id: 'perfil', label: 'PERFIL' },
    { id: 'comunidade', label: 'COMUNIDADE' },
    { id: 'sobre', label: 'SOBRE' }
  ];

  function handleTabClick(tabId) {
    if (tabId === 'loja') {
      goToStore();
    } else if (tabId === 'biblioteca') {
      goToLibrary();
    } else if (tabId === 'perfil') {
      goToProfile();
    } else {
      setActiveView(tabId);
    }
  }

  // Nome exibido do usuário e avatar
  const displayName = userProfile?.personaName || currentUser?.displayName || (currentUser?.email ? currentUser.email.split('@')[0] : 'GamerDeveloper');
  const userAvatar = userProfile?.avatarUrl || 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg';

  return (
    <header className="steam-global-header">
      <div className="steam-global-header-inner">
        {/* Steam Brand Logo & Main Navigation */}
        <div className="steam-brand-nav">
          <a href="#" className="steam-logo-link" title="Página inicial do Steam" onClick={(e) => { e.preventDefault(); goToStore(); }}>
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
            {navTabs.map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                className={`steam-nav-link ${activeView === tab.id ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleTabClick(tab.id); }}
              >
                {tab.label}
              </a>
            ))}
          </nav>
        </div>

        {/* User profile, install button & language */}
        <div className="steam-header-tools">
          <div className="steam-header-tools-top">

            {isLoggedIn ? (
              <div className="steam-notif-bell" title="Notificações">
                <Bell size={14} />
                <span className="steam-notif-badge">1</span>
              </div>
            ) : (
              <button
                className="steam-login-link-btn"
                onClick={openLoginModal}
                title="Iniciar sessão no Steam"
              >
                iniciar sessão
              </button>
            )}
          </div>

          {/* User Account Widget or Login Button */}
          {isLoggedIn ? (
            <div className="steam-user-profile-wrapper" ref={dropdownRef}>
              <div
                className="steam-user-profile"
                title="Opções da Conta"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  src={userAvatar}
                  alt="Avatar do Usuário"
                  className="steam-user-avatar"
                />
                <div className="steam-user-info">
                  <div className="steam-username">
                    <span>{displayName}</span>
                    <ChevronDown size={11} />
                  </div>
                  <div className="steam-user-wallet">R$ 150,00</div>
                </div>
              </div>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="steam-user-dropdown">
                  <button
                    className="steam-dropdown-item"
                    onClick={() => { setDropdownOpen(false); goToProfile(); }}
                  >
                    <UserIcon size={14} />
                    <span>Ver meu perfil</span>
                  </button>
                  <button
                    className="steam-dropdown-item logout"
                    onClick={() => { setDropdownOpen(false); logout(); }}
                  >
                    <LogOut size={14} />
                    <span>Encerrar sessão</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="steam-login-highlight-btn"
              onClick={openLoginModal}
              title="Iniciar sessão ou criar conta"
            >
              <LogIn size={13} />
              <span>Iniciar sessão</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

