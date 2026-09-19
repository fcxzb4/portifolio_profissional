import React from 'react';
import {
  Lock,
  LogIn,
  UserPlus,
  UserX,
  Edit3,
  Trophy,
  Gamepad2,
  MessageSquare,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import '../../styles/profile.css';

export default function ProfileLoggedOut({ onOpenLogin, onOpenRegister }) {
  return (
    <div className="steam-profile-wrapper">
      <div className="steam-profile-container">
        {/* Cabeçalho de Perfil Deslogado */}
        <div className="steam-profile-header-card steam-profile-loggedout-hero">
          {/* Coluna Esquerda: Avatar Anônimo e Estado Deslogado */}
          <div className="steam-profile-left-hero">
            <div className="steam-avatar-frame-wrap steam-avatar-loggedout-wrap">
              <div className="steam-avatar-placeholder-box">
                <UserX size={72} className="steam-avatar-placeholder-icon" />
              </div>
              <div className="steam-avatar-status-badge offline">
                Deslogado
              </div>
            </div>

            <div className="steam-profile-user-details">
              <div className="steam-persona-loggedout-title-row">
                <h1 className="steam-persona-title">Usuário Deslogado</h1>
                <span className="steam-loggedout-badge">
                  <ShieldAlert size={12} />
                  Sessão Não Iniciada
                </span>
              </div>

              <div className="steam-persona-meta">
                <span className="steam-real-name" style={{ color: '#8f98a0', fontStyle: 'italic' }}>
                  Nenhuma informação de usuário disponível
                </span>
              </div>

              {/* Mensagem Explicativa Principal */}
              <div className="steam-loggedout-notice-banner">
                <div className="steam-loggedout-notice-icon">
                  <Lock size={20} />
                </div>
                <div className="steam-loggedout-notice-content">
                  <h3 className="steam-loggedout-notice-heading">
                    Para poder modificar a tela de perfil, você precisará iniciar sessão
                  </h3>
                  <p className="steam-loggedout-notice-desc">
                    Você está navegando como visitante. Nenhuma informação de perfil é exibida enquanto você estiver deslogado. 
                    Inicie sessão na sua conta ou crie um cadastro gratuito para acessar, personalizar e modificar seu perfil Steam.
                  </p>
                </div>
              </div>

              {/* Botões de Ação para Login e Cadastro */}
              <div className="steam-header-action-buttons" style={{ marginTop: '16px' }}>
                <button
                  type="button"
                  className="steam-btn-profile-login-primary"
                  onClick={onOpenLogin}
                  title="Iniciar sessão para personalizar seu perfil"
                >
                  <LogIn size={15} />
                  <span>Iniciar Sessão</span>
                </button>

                <button
                  type="button"
                  className="steam-btn-profile-secondary"
                  onClick={onOpenRegister}
                  title="Criar uma nova conta Steam"
                >
                  <UserPlus size={15} />
                  <span>Criar Nova Conta</span>
                </button>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Nível Bloqueado & Estatísticas Indisponíveis */}
          <div className="steam-profile-right-summary">
            {/* Nível Steam Bloqueado */}
            <div className="steam-level-display-box steam-level-box-locked">
              <div className="steam-level-title-group">
                <span className="steam-level-label">Nível no Steam</span>
                <span className="steam-level-sub" style={{ color: '#8f98a0' }}>Requer Login</span>
              </div>
              <div className="steam-level-circle locked">
                <Lock size={16} />
              </div>
            </div>

            {/* Insígnia em Destaque Bloqueada */}
            <div className="steam-featured-badge-card steam-badge-card-locked">
              <div className="steam-featured-badge-icon" style={{ opacity: 0.5 }}>
                🔒
              </div>
              <div className="steam-featured-badge-info">
                <span className="steam-featured-badge-name" style={{ color: '#8f98a0' }}>Insígnia Bloqueada</span>
                <span className="steam-featured-badge-xp" style={{ color: '#626d78' }}>Conecte-se para exibir</span>
              </div>
            </div>

            {/* Mini Estatísticas Bloqueadas */}
            <div className="steam-profile-quick-stats steam-stats-locked">
              <span className="steam-quick-stat-item">
                Insígnias: <b style={{ color: '#8f98a0' }}>--</b>
              </span>
              <span className="steam-quick-stat-item">
                Jogos: <b style={{ color: '#8f98a0' }}>--</b>
              </span>
              <span className="steam-quick-stat-item">
                Conquistas: <b style={{ color: '#8f98a0' }}>--</b>
              </span>
            </div>
          </div>
        </div>

        {/* Vitrine Explicativa de Recursos Bloqueados */}
        <div className="steam-loggedout-features-section">
          <div className="steam-loggedout-features-header">
            <div className="steam-features-header-title">
              <Sparkles size={18} color="#66c0f4" />
              <h2>O que você pode fazer ao conectar seu perfil?</h2>
            </div>
            <p className="steam-features-header-sub">
              Ao iniciar sessão no Steam, você ganha acesso total para visualizar e modificar as seguintes áreas:
            </p>
          </div>

          <div className="steam-loggedout-grid">
            <div className="steam-loggedout-feature-card">
              <div className="steam-feature-card-top">
                <div className="steam-feature-icon-wrap" style={{ background: 'rgba(102, 192, 244, 0.15)', color: '#66c0f4' }}>
                  <Edit3 size={22} />
                </div>
                <span className="steam-feature-lock-tag">
                  <Lock size={11} /> Requer Login
                </span>
              </div>
              <h3 className="steam-feature-title">Personalização de Perfil</h3>
              <p className="steam-feature-desc">
                Modifique seu nome de exibição (persona name), nome real, localização, biografia e escolha avatares oficiais da comunidade Steam.
              </p>
            </div>

            <div className="steam-loggedout-feature-card">
              <div className="steam-feature-card-top">
                <div className="steam-feature-icon-wrap" style={{ background: 'rgba(255, 215, 0, 0.15)', color: '#ffd700' }}>
                  <Trophy size={22} />
                </div>
                <span className="steam-feature-lock-tag">
                  <Lock size={11} /> Requer Login
                </span>
              </div>
              <h3 className="steam-feature-title">Vitrines & Conquistas</h3>
              <p className="steam-feature-desc">
                Exiba seus projetos autorais em destaque, desbloqueie insígnias de desenvolvimento técnico e suba o nível da sua conta Steam.
              </p>
            </div>

            <div className="steam-loggedout-feature-card">
              <div className="steam-feature-card-top">
                <div className="steam-feature-icon-wrap" style={{ background: 'rgba(164, 208, 7, 0.15)', color: '#a4d007' }}>
                  <Gamepad2 size={22} />
                </div>
                <span className="steam-feature-lock-tag">
                  <Lock size={11} /> Requer Login
                </span>
              </div>
              <h3 className="steam-feature-title">Biblioteca e Atividades</h3>
              <p className="steam-feature-desc">
                Acompanhe estatísticas em tempo real, horas jogadas e executadas nos projetos, histórico recente de sessões e progresso de conquistas.
              </p>
            </div>

            <div className="steam-loggedout-feature-card">
              <div className="steam-feature-card-top">
                <div className="steam-feature-icon-wrap" style={{ background: 'rgba(87, 203, 222, 0.15)', color: '#57cbde' }}>
                  <MessageSquare size={22} />
                </div>
                <span className="steam-feature-lock-tag">
                  <Lock size={11} /> Requer Login
                </span>
              </div>
              <h3 className="steam-feature-title">Mural de Comentários (+rep)</h3>
              <p className="steam-feature-desc">
                Envie e receba recomendações da comunidade gamer, feedbacks de recrutadores e mensagens diretas no mural oficial do seu perfil.
              </p>
            </div>
          </div>

          {/* Banner de Chamada para Ação Inferior */}
          <div className="steam-loggedout-cta-bar">
            <div className="steam-loggedout-cta-text">
              <h4>Deseja personalizar seu perfil agora?</h4>
              <p>O cadastro é simples, rápido e salva suas preferências na nuvem.</p>
            </div>
            <div className="steam-loggedout-cta-actions">
              <button
                type="button"
                className="steam-btn-profile-login-primary"
                onClick={onOpenLogin}
              >
                <LogIn size={15} />
                <span>Iniciar Sessão Agora</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
