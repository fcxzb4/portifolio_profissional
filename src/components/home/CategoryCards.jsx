import React from 'react';
import { browseCategories } from '../../core/mock/steamData';
import '../../styles/sections.css';

export default function CategoryCards() {
  return (
    <section className="categories-section">
      <div className="steam-section-header">
        <h2 className="steam-section-title">Navegar pelo Steam</h2>
      </div>

      <div className="categories-grid">
        {browseCategories.map((cat) => (
          <div
            key={cat.id}
            className="category-card"
            style={{ background: cat.bg }}
          >
            <span className="category-icon">{cat.icon}</span>
            <span className="category-name">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
