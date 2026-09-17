import React from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import SteamHeader from './components/layout/SteamHeader';
import StoreNavbar from './components/layout/StoreNavbar';
import LeftSidebar from './components/layout/LeftSidebar';
import FeaturedCarousel from './components/home/FeaturedCarousel';
import SpecialOffers from './components/home/SpecialOffers';
import CategoryCards from './components/home/CategoryCards';
import BrowseTabs from './components/home/BrowseTabs';
import SteamFooter from './components/layout/SteamFooter';
import LibraryView from './components/library/LibraryView';
import GameStorePage from './components/home/GameStorePage';
import './styles/global.css';

function AppContent() {
  const { activeView, storeSubView, openGamePage } = useNavigation();

  const handleSearch = (query) => {
    console.log("Buscando no Steam:", query);
  };

  // Se está na biblioteca
  if (activeView === 'biblioteca') {
    return (
      <div className="steam-app">
        <SteamHeader />
        <LibraryView />
      </div>
    );
  }

  // Se está na loja, mas dentro de uma página de jogo
  if (activeView === 'loja' && storeSubView && storeSubView.type === 'gamepage') {
    return (
      <div className="steam-app">
        <SteamHeader />
        <StoreNavbar onSearch={handleSearch} />
        <GameStorePage game={storeSubView.game} />
        <SteamFooter />
      </div>
    );
  }

  // Loja (Home) — padrão
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
          <FeaturedCarousel onGameClick={openGamePage} />

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

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}
