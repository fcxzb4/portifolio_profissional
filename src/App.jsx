import React from 'react';
import SteamHeader from './components/layout/SteamHeader';
import StoreNavbar from './components/layout/StoreNavbar';
import LeftSidebar from './components/layout/LeftSidebar';
import FeaturedCarousel from './components/home/FeaturedCarousel';
import SpecialOffers from './components/home/SpecialOffers';
import CategoryCards from './components/home/CategoryCards';
import BrowseTabs from './components/home/BrowseTabs';
import SteamFooter from './components/layout/SteamFooter';
import './styles/global.css';

export default function App() {
  const handleSearch = (query) => {
    console.log("Buscando no Steam:", query);
  };

  return (
    <div className="steam-app">
      {/* Top Main Navigation Header */}
      <SteamHeader />

      {/* Store Blue Sub-Navbar */}
      <StoreNavbar onSearch={handleSearch} />

      {/* Body Content with Left Sidebar & Center Column */}
      <main className="steam-main-content">
        <LeftSidebar />

        <div className="steam-center-col">
          {/* Main Featured Showcase Carousel */}
          <FeaturedCarousel />

          {/* Special Offers Grid */}
          <SpecialOffers />

          {/* Browse Categories */}
          <CategoryCards />

          {/* Tabbed Browser (Novidades, Mais Vendidos, etc.) */}
          <BrowseTabs />
        </div>
      </main>

      {/* Steam Global Footer */}
      <SteamFooter />
    </div>
  );
}
