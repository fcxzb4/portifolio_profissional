import React from 'react';
import { specialOffers } from '../../core/mock/steamData';
import '../../styles/sections.css';

export default function SpecialOffers() {
  return (
    <section className="special-offers-section">
      <div className="steam-section-header">
        <h2 className="steam-section-title">Ofertas Especiais</h2>
        <button className="steam-see-more-btn">Ver mais</button>
      </div>

      <div className="special-offers-grid">
        {specialOffers.map((offer) => (
          <div key={offer.id} className="special-offer-card">
            <div className="special-offer-img-wrapper">
              <img
                src={offer.capsule || offer.image}
                alt={offer.title}
                className="special-offer-img"
              />
              <span className="special-offer-badge-ribbon">{offer.bannerType}</span>
            </div>

            <div className="special-offer-body">
              <div>
                <h4 className="special-offer-title">{offer.title}</h4>
                <div className="special-offer-timer">{offer.endsIn}</div>
              </div>

              <div className="special-offer-price-row">
                <div className="steam-price-widget">
                  <div className="steam-discount-badge">-{offer.discount}%</div>
                  <div className="steam-price-container">
                    <span className="steam-original-price">{offer.originalPrice}</span>
                    <span className="steam-final-price">{offer.discountPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
