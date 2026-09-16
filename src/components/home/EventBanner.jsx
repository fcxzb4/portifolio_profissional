import React from 'react';
import { eventBanner } from '../../core/mock/steamData';
import '../../styles/sections.css';

export default function EventBanner() {
  return (
    <section className="event-banner-section">
      <div
        className="event-banner-card"
        style={{ background: eventBanner.bgGradient }}
      >
        <div className="event-banner-deco event-banner-deco-left">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" opacity="0.15">
            <path d="M60 10L110 95H10L60 10Z" stroke="#5c8a4d" strokeWidth="2" />
            <circle cx="60" cy="60" r="40" stroke="#5c8a4d" strokeWidth="1.5" />
            <circle cx="60" cy="60" r="20" stroke="#5c8a4d" strokeWidth="1" />
          </svg>
        </div>

        <div className="event-banner-content">
          <div className="event-banner-steam-badge">
            <span className="event-banner-star">★</span>
            <span>STEAM</span>
            <span className="event-banner-star">★</span>
          </div>
          <h2 className="event-banner-title">{eventBanner.title}</h2>
          <p className="event-banner-subtitle">{eventBanner.subtitle}</p>
        </div>

        <div className="event-banner-deco event-banner-deco-right">
          <svg width="160" height="100" viewBox="0 0 160 100" fill="none" opacity="0.12">
            <rect x="10" y="10" width="60" height="80" rx="4" stroke="#5c8a4d" strokeWidth="1.5" />
            <rect x="30" y="25" width="60" height="60" rx="4" stroke="#5c8a4d" strokeWidth="1" />
            <circle cx="120" cy="50" r="30" stroke="#5c8a4d" strokeWidth="1.5" />
            <path d="M110 30L130 50L110 70" stroke="#5c8a4d" strokeWidth="1" />
          </svg>
        </div>
      </div>
    </section>
  );
}
