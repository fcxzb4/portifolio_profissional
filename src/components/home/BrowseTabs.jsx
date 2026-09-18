import React, { useState } from 'react';
import { Monitor, Apple, Terminal } from 'lucide-react';
import { tabbedGames } from '../../core/mock/steamData';
import '../../styles/sections.css';

export default function BrowseTabs({ onGameClick }) {
  const [activeTab, setActiveTab] = useState('popular');

  const tabs = [
    { key: 'popular', label: 'Novidades e Destaques' },
    { key: 'topSellers', label: 'Mais Vendidos' },
    { key: 'newReleases', label: 'Lançamentos' },
    { key: 'specials', label: 'Ofertas' }
  ];

  const currentList = tabbedGames[activeTab] || [];

  return (
    <section className="steam-browse-tabs-section">
      <div className="steam-tabs-container">
        {/* Tab Headers */}
        <div className="steam-tabs-header">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`steam-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Rows List */}
        <div className="steam-tabs-list">
          {currentList.map((game) => (
            <div
              key={game.id}
              className="steam-tab-row"
              style={{ cursor: 'pointer' }}
              onClick={() => onGameClick && onGameClick({
                ...game,
                mainImage: game.thumb || game.image,
                heroBanner: game.thumb || game.image
              })}
              title={`Ver página de ${game.title}`}
            >

              <div className="steam-tab-left">
                <div className="steam-tab-thumb">
                  <img src={game.thumb} alt={game.title} />
                </div>

                <div className="steam-tab-info">
                  <span className="steam-tab-game-title">{game.title}</span>
                  <div className="steam-tab-meta">
                    <div className="steam-tab-platform-icons">
                      {game.platforms?.includes('windows') && <Monitor size={12} />}
                      {game.platforms?.includes('mac') && <Apple size={12} />}
                      {game.platforms?.includes('linux') && <Terminal size={12} />}
                    </div>
                    <span className="steam-tab-tags">
                      {game.tags?.join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="steam-tab-right">
                {game.discount > 0 ? (
                  <div className="steam-price-widget">
                    <div className="steam-discount-badge">-{game.discount}%</div>
                    <div className="steam-price-container">
                      <span className="steam-original-price">{game.originalPrice}</span>
                      <span className="steam-final-price">{game.discountPrice}</span>
                    </div>
                  </div>
                ) : (
                  <div className="steam-regular-price">{game.discountPrice}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
