import React from 'react';
import '../../styles/sections.css';

export default function SteamFooter() {
  return (
    <footer className="steam-footer">
      <div className="steam-footer-inner">
        <div className="steam-footer-rule" />

        <div className="steam-footer-top">
          <div className="steam-footer-logos">
            <span className="valve-logo-text">VALVE</span>
          </div>

          <div className="steam-footer-text">
            © 2026 Valve Corporation. Todos os direitos reservados. Todas as marcas comerciais são propriedade dos seus respectivos donos nos EUA e em outros países.
            <br />
            Todos os preços incluem IVA (onde aplicável).
          </div>

          <div className="steam-footer-logos">
            {/* Steam Footer Emblem */}
            <svg width="60" height="24" viewBox="0 0 176 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22 0C9.85 0 0 9.85 0 22C0 32.25 6.99 40.85 16.5 43.34L26.39 29.83C25.7 28.5 25.32 27.02 25.32 25.44C25.32 20.37 29.43 16.26 34.5 16.26C39.57 16.26 43.68 20.37 43.68 25.44C43.68 30.51 39.57 34.62 34.5 34.62C34.33 34.62 34.16 34.61 34 34.6L24.32 43.91C24.87 43.97 25.43 44 26 44C38.15 44 48 34.15 48 22C48 9.85 38.15 0 26 0H22Z"
                fill="#8F98A0"
              />
              <circle cx="34.5" cy="25.5" r="5.5" fill="#171A21" stroke="#8F98A0" strokeWidth="3" />
            </svg>
          </div>
        </div>

        <div className="steam-footer-rule" />

        <div className="steam-footer-links">
          <a href="#" className="steam-footer-link">Política de Privacidade</a>
          <span className="steam-footer-separator">|</span>
          <a href="#" className="steam-footer-link">Termos Legais</a>
          <span className="steam-footer-separator">|</span>
          <a href="#" className="steam-footer-link">Acordo de Assinatura do Steam</a>
          <span className="steam-footer-separator">|</span>
          <a href="#" className="steam-footer-link">Reembolsos</a>
          <span className="steam-footer-separator">|</span>
          <a href="#" className="steam-footer-link">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
