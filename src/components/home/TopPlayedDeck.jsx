import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { topPlayedDeck } from '../../core/mock/steamData';
import '../../styles/sections.css';

export default function TopPlayedDeck() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

  const canPrev = startIndex > 0;
  const canNext = startIndex + visibleCount < topPlayedDeck.length;

  const handlePrev = () => {
    if (canPrev) setStartIndex((prev) => Math.max(0, prev - visibleCount));
  };

  const handleNext = () => {
    if (canNext) setStartIndex((prev) => Math.min(topPlayedDeck.length - visibleCount, prev + visibleCount));
  };

  const visibleGames = topPlayedDeck.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="deck-section">
      <div className="steam-section-header">
        <div className="deck-section-title-row">
          <span className="deck-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#c7d5e0" strokeWidth="2"/>
              <circle cx="12" cy="12" r="4" fill="#c7d5e0"/>
            </svg>
          </span>
          <h2 className="steam-section-title">Mais Jogados no Steam Deck</h2>
        </div>
        <button className="steam-see-more-btn">Ver mais</button>
      </div>

      <div className="deck-carousel-wrapper">
        {canPrev && (
          <button className="deck-carousel-arrow deck-arrow-prev" onClick={handlePrev} aria-label="Anterior">
            <ChevronLeft size={32} />
          </button>
        )}

        <div className="deck-cards-grid">
          {visibleGames.map((game) => (
            <div key={game.id} className="deck-game-card">
              <div className="deck-game-img-wrapper">
                <img src={game.image} alt={game.title} className="deck-game-img" />
              </div>
              <div className="deck-game-price-bar">
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

        {canNext && (
          <button className="deck-carousel-arrow deck-arrow-next" onClick={handleNext} aria-label="Próximo">
            <ChevronRight size={32} />
          </button>
        )}
      </div>

      {/* Carousel Indicators */}
      <div className="deck-indicators">
        {Array.from({ length: Math.ceil(topPlayedDeck.length / visibleCount) }).map((_, idx) => (
          <div
            key={idx}
            className={`deck-indicator ${Math.floor(startIndex / visibleCount) === idx ? 'active' : ''}`}
            onClick={() => setStartIndex(idx * visibleCount)}
          />
        ))}
      </div>
    </section>
  );
}
