import React from 'react';
import { Gift, Compass, Tag, Layers } from 'lucide-react';
import { sidebarItems } from '../../core/mock/steamData';
import '../../styles/sections.css';

export default function LeftSidebar() {
  return (
    <aside className="steam-sidebar">
      {/* Gift Card Promo */}
      <div className="sidebar-giftcard-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Gift size={16} color="#66c0f4" />
          <div className="sidebar-giftcard-title">Cartões-presente</div>
        </div>
        <div className="sidebar-giftcard-sub">Dê de presente aos amigos</div>
      </div>

      {/* Recommended Section */}
      <div className="sidebar-group">
        <div className="sidebar-group-title">Recomendados</div>
        {sidebarItems.recommended.map((item, idx) => (
          <div key={idx} className="sidebar-link">
            <span className="sidebar-bullet"></span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="sidebar-group">
        <div className="sidebar-group-title">Categorias</div>
        {sidebarItems.categories.map((cat, idx) => (
          <div key={idx} className="sidebar-link">
            <span className="sidebar-bullet"></span>
            <span>{cat}</span>
          </div>
        ))}
      </div>

      {/* Genres */}
      <div className="sidebar-group">
        <div className="sidebar-group-title">Procurar por gênero</div>
        {sidebarItems.genres.map((genre, idx) => (
          <div key={idx} className="sidebar-link">
            <span className="sidebar-bullet"></span>
            <span>{genre}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
