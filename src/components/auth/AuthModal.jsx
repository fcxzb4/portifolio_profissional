import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import '../../styles/auth.css';

export default function AuthModal() {
  const {
    authModalOpen,
    authMode,
    setAuthMode,
    closeAuthModal,
    login,
    register
  } = useNavigation();

  // Estados dos formulários
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [username, setUsername] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Estados de feedback
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Limpa campos e erros ao alternar modo ou fechar
  useEffect(() => {
    setErrorMessage('');
    setSuccessMessage('');
  }, [authMode, authModalOpen]);

  // Tecla ESC para fechar modal
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && authModalOpen) {
        closeAuthModal();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [authModalOpen, closeAuthModal]);

  if (!authModalOpen) return null;

  async function handleLoginSubmit(e) {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    setIsSubmitting(true);
    const result = await login(email.trim(), password);
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.error);
    }
  }

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!username.trim() || !email.trim() || !confirmEmail.trim() || !password) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (email.trim().toLowerCase() !== confirmEmail.trim().toLowerCase()) {
      setErrorMessage('Os endereços de e-mail informados não coincidem.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (!termsAccepted) {
      setErrorMessage('Você deve concordar com os termos do Steam para criar a conta.');
      return;
    }

    setIsSubmitting(true);
    const result = await register(email.trim(), password, username.trim());
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.error);
    }
  }

  return (
    <div className="steam-auth-overlay" onClick={closeAuthModal}>
      <div
        className={`steam-auth-window ${authMode === 'register' ? 'register-mode' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="steam-auth-topbar">
          <div className="steam-auth-brand">
            <svg
              className="steam-auth-logo-svg"
              viewBox="0 0 176 44"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 0C9.85 0 0 9.85 0 22C0 32.25 6.99 40.85 16.5 43.34L26.39 29.83C25.7 28.5 25.32 27.02 25.32 25.44C25.32 20.37 29.43 16.26 34.5 16.26C39.57 16.26 43.68 20.37 43.68 25.44C43.68 30.51 39.57 34.62 34.5 34.62C34.33 34.62 34.16 34.61 34 34.6L24.32 43.91C24.87 43.97 25.43 44 26 44C38.15 44 48 34.15 48 22C48 9.85 38.15 0 26 0H22Z"
              />
              <circle cx="34.5" cy="25.5" r="5.5" fill="#171A21" stroke="#C6D4DF" strokeWidth="3" />
            </svg>
            <span className="steam-auth-brand-name">STEAM</span>
          </div>

          <button
            className="steam-auth-close-btn"
            onClick={closeAuthModal}
            title="Fechar (Esc)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Area */}
        <div className="steam-auth-content">
          {errorMessage && (
            <div className="steam-auth-error">
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {authMode === 'login' ? (
            /* ================= TELAS DE LOGIN ================= */
            <div>
              <h2 className="steam-auth-heading">INICIAR SESSÃO</h2>

              <div className="steam-auth-login-grid">
                {/* Left Column: Form */}
                <form className="steam-auth-form" onSubmit={handleLoginSubmit}>
                  <div className="steam-form-group">
                    <label className="steam-form-label">
                      INICIAR SESSÃO COM O NOME DA CONTA OU E-MAIL
                    </label>
                    <input
                      type="text"
                      className="steam-form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu_email@exemplo.com"
                      autoFocus
                      required
                    />
                  </div>

                  <div className="steam-form-group">
                    <label className="steam-form-label">SENHA</label>
                    <div className="steam-form-input-wrapper">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="steam-form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        className="steam-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        title={showPassword ? 'Ocultar senha' : 'Ver senha'}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <label className="steam-checkbox-label">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Lembrar de mim neste computador</span>
                  </label>

                  <button
                    type="submit"
                    className="steam-primary-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="steam-spinner" />
                        <span>Iniciando sessão...</span>
                      </>
                    ) : (
                      'Iniciar sessão'
                    )}
                  </button>

                  <div className="steam-auth-links">
                    <button
                      type="button"
                      className="steam-auth-link"
                      onClick={() => setAuthMode('register')}
                    >
                      Não tem uma conta Steam? <strong>Criar uma conta gratuita</strong>
                    </button>
                    <button
                      type="button"
                      className="steam-auth-link"
                      onClick={() => alert('Para redefinir a senha, use o console do Firebase ou o link de recuperação.')}
                    >
                      Precisa de ajuda para iniciar a sessão?
                    </button>
                  </div>
                </form>

                {/* Right Column: Steam Mobile QR Code */}
                <div className="steam-qr-section">
                  <div className="steam-qr-title">OU INICIE A SESSÃO COM CÓDIGO QR</div>

                  <div className="steam-qr-box" title="Código QR Steam">
                    {/* SVG QR Code com ícone Steam no centro */}
                    <svg viewBox="0 0 100 100" fill="#171a21">
                      {/* Cantos do QR */}
                      <rect x="5" y="5" width="26" height="26" rx="3" stroke="#171a21" strokeWidth="3" fill="none" />
                      <rect x="11" y="11" width="14" height="14" fill="#171a21" />

                      <rect x="69" y="5" width="26" height="26" rx="3" stroke="#171a21" strokeWidth="3" fill="none" />
                      <rect x="75" y="11" width="14" height="14" fill="#171a21" />

                      <rect x="5" y="69" width="26" height="26" rx="3" stroke="#171a21" strokeWidth="3" fill="none" />
                      <rect x="11" y="75" width="14" height="14" fill="#171a21" />

                      {/* Módulos de dados simulados */}
                      <rect x="36" y="8" width="5" height="5" />
                      <rect x="46" y="8" width="5" height="5" />
                      <rect x="56" y="8" width="5" height="5" />
                      <rect x="36" y="18" width="5" height="5" />
                      <rect x="46" y="24" width="5" height="5" />
                      <rect x="56" y="18" width="5" height="5" />
                      
                      <rect x="8" y="36" width="5" height="5" />
                      <rect x="18" y="36" width="5" height="5" />
                      <rect x="24" y="46" width="5" height="5" />
                      <rect x="8" y="56" width="5" height="5" />
                      
                      <rect x="68" y="36" width="5" height="5" />
                      <rect x="78" y="46" width="5" height="5" />
                      <rect x="88" y="36" width="5" height="5" />
                      <rect x="68" y="56" width="5" height="5" />
                      
                      <rect x="36" y="68" width="5" height="5" />
                      <rect x="46" y="76" width="5" height="5" />
                      <rect x="56" y="68" width="5" height="5" />
                      <rect x="76" y="68" width="5" height="5" />
                      <rect x="86" y="78" width="5" height="5" />

                      {/* Ícone Steam Centralizado */}
                      <circle cx="50" cy="50" r="14" fill="#1b2838" />
                      <circle cx="50" cy="50" r="11" fill="#2a475e" />
                      <circle cx="48" cy="51" r="3.5" fill="#66c0f4" />
                      <circle cx="53" cy="46" r="2" fill="#ffffff" />
                    </svg>
                  </div>

                  <p className="steam-qr-text">
                    Use o <span>aplicativo móvel do Steam</span> para escanear e iniciar a sessão sem senha.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* ================= TELA DE CADASTRO ================= */
            <div>
              <h2 className="steam-auth-heading">CRIAR UMA CONTA</h2>
              <p className="steam-auth-subheading">
                É gratuito e fácil. Junte-se à maior comunidade de jogos do mundo.
              </p>

              <form className="steam-auth-form" onSubmit={handleRegisterSubmit}>
                <div className="steam-form-group">
                  <label className="steam-form-label">
                    NOME DA CONTA STEAM (NICKNAME)
                  </label>
                  <input
                    type="text"
                    className="steam-form-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ex: PedroGamer99"
                    autoFocus
                    required
                  />
                </div>

                <div className="steam-form-group">
                  <label className="steam-form-label">
                    ENDEREÇO DE E-MAIL
                  </label>
                  <input
                    type="email"
                    className="steam-form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu_email@exemplo.com"
                    required
                  />
                </div>

                <div className="steam-form-group">
                  <label className="steam-form-label">
                    CONFIRMAR ENDEREÇO DE E-MAIL
                  </label>
                  <input
                    type="email"
                    className="steam-form-input"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    placeholder="Confirme o seu e-mail"
                    required
                  />
                </div>

                <div className="steam-form-group">
                  <label className="steam-form-label">
                    SENHA (MÍNIMO 6 CARACTERES)
                  </label>
                  <div className="steam-form-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="steam-form-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      className="steam-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="steam-form-group">
                  <label className="steam-form-label">PAÍS DE RESIDÊNCIA</label>
                  <select
                    className="steam-form-input"
                    defaultValue="BR"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="BR">Brasil 🇧🇷</option>
                    <option value="US">Estados Unidos 🇺🇸</option>
                    <option value="PT">Portugal 🇵🇹</option>
                    <option value="OTHER">Outro país</option>
                  </select>
                </div>

                <label className="steam-checkbox-label" style={{ alignItems: 'flex-start', marginTop: 6 }}>
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    style={{ marginTop: 2 }}
                    required
                  />
                  <span className="steam-register-terms">
                    Declaro ter 13 anos ou mais e concordo com os termos do{' '}
                    <a href="#" onClick={(e) => e.preventDefault()}>Acordo de Assinatura do Steam</a> e da{' '}
                    <a href="#" onClick={(e) => e.preventDefault()}>Política de Privacidade da Valve</a>.
                  </span>
                </label>

                <button
                  type="submit"
                  className="steam-primary-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="steam-spinner" />
                      <span>Criando conta...</span>
                    </>
                  ) : (
                    'Continuar e Criar Conta'
                  )}
                </button>

                <div className="steam-auth-links">
                  <button
                    type="button"
                    className="steam-auth-link"
                    onClick={() => setAuthMode('login')}
                  >
                    Já tem uma conta do Steam? <strong>Iniciar sessão</strong>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
