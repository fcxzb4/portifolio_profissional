import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import '../../styles/header.css';

export default function StoreNavbar({ onSearch }) {
  const [activeItem, setActiveItem] = useState('Sua Loja');
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: 'Sua Loja', hasDropdown: true },
    { label: 'Novidades e Destaques', hasDropdown: true },
    { label: 'Categorias', hasDropdown: true },
    { label: 'Loja de Pontos', hasDropdown: false },
    { label: 'Notícias', hasDropdown: false },
    { label: 'Laboratório', hasDropdown: false }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="steam-subnav-container">
      <div className="steam-subnav-inner">
        {/* Navigation Categories */}
        <div className="steam-subnav-links">
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`steam-subnav-item ${activeItem === item.label ? 'active' : ''}`}
              onClick={() => setActiveItem(item.label)}
            >
              <span>{item.label}</span>
              {item.hasDropdown && <ChevronDown size={11} style={{ opacity: 0.7 }} />}
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <form className="steam-search-wrapper" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="buscar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="steam-search-input"
          />
          <button type="submit" className="steam-search-btn" title="Buscar no Steam">
            <Search size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
