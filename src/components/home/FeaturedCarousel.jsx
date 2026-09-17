import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Monitor, Apple, Terminal } from 'lucide-react';
import { featuredGames } from '../../core/mock/steamData';
import '../../styles/carousel.css';

export default function FeaturedCarousel({ onGameClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredScreenshot, setHoveredScreenshot] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const currentGame = featuredGames[currentIndex];

  // Auto rotation
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
      setHoveredScreenshot(null);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? featuredGames.length - 1 : prev - 1));
    setHoveredScreenshot(null);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
    setHoveredScreenshot(null);
  };

  const displayImage = hoveredScreenshot || currentGame.mainImage;

  return (
    <section className="featured-carousel-section">
      <div className="steam-section-header">
        <h2 className="steam-section-title">Em Destaque e Recomendados</h2>
      </div>

      <div
        className="carousel-stage"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setHoveredScreenshot(null);
        }}
      >
        {/* Navigation Arrows */}
        <button
          className="carousel-arrow prev"
          onClick={handlePrev}
          title="Anterior"
          aria-label="Anterior"
        >
          <ChevronLeft size={36} />
        </button>

        <button
          className="carousel-arrow next"
          onClick={handleNext}
          title="Próximo"
          aria-label="Próximo"
        >
          <ChevronRight size={36} />
        </button>

        {/* Main Showcase Card */}
        <div className="featured-card" onClick={() => onGameClick && onGameClick(currentGame)} style={{ cursor: 'pointer' }}>
          {/* Main Media Preview */}
          <div className="featured-left-media">
            <img
              src={displayImage}
              alt={currentGame.title}
              className="featured-main-img"
            />
            <div className="featured-media-overlay" />
          </div>

          {/* Right Info Panel */}
          <div className="featured-right-panel">
            <div>
              <h3 className="featured-title">{currentGame.title}</h3>

              {/* 4 Screenshot Thumbnails Grid */}
              <div className="featured-screenshots-grid">
                {currentGame.screenshots.map((ssUrl, idx) => (
                  <div
                    key={idx}
                    className={`featured-screenshot-thumb ${
                      hoveredScreenshot === ssUrl ? 'active' : ''
                    }`}
                    onMouseEnter={() => setHoveredScreenshot(ssUrl)}
                  >
                    <img src={ssUrl} alt={`Captura de tela ${idx + 1}`} />
                  </div>
                ))}
              </div>

              {/* Status / Why Recommended */}
              <div className="featured-status-box">
                <div className="featured-status-label">{currentGame.status}</div>
                {currentGame.topSeller && (
                  <span className="featured-status-sub">Mais Vendido</span>
                )}
              </div>

              {/* Tags */}
              <div className="featured-tags-row">
                {currentGame.tags.slice(0, 4).map((tag, idx) => (
                  <span key={idx} className="featured-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Bar: Platforms & Price */}
            <div className="featured-bottom-bar">
              <div className="featured-platforms">
                {currentGame.platforms.includes('windows') && (
                  <Monitor size={15} title="Disponível no Windows" />
                )}
                {currentGame.platforms.includes('mac') && (
                  <Apple size={15} title="Disponível no macOS" />
                )}
                {currentGame.platforms.includes('linux') && (
                  <Terminal size={15} title="Disponível no Linux/SteamOS" />
                )}
              </div>

              {/* Steam Price Tag */}
              {currentGame.discount > 0 ? (
                <div className="steam-price-widget">
                  <div className="steam-discount-badge">-{currentGame.discount}%</div>
                  <div className="steam-price-container">
                    <span className="steam-original-price">{currentGame.originalPrice}</span>
                    <span className="steam-final-price">{currentGame.discountPrice}</span>
                  </div>
                </div>
              ) : (
                <div className="steam-regular-price">{currentGame.discountPrice}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Indicators */}
      <div className="carousel-indicators">
        {featuredGames.map((_, idx) => (
          <div
            key={idx}
            className={`carousel-indicator-dot ${currentIndex === idx ? 'active' : ''}`}
            onClick={() => {
              setCurrentIndex(idx);
              setHoveredScreenshot(null);
            }}
          />
        ))}
      </div>
    </section>
  );
}
