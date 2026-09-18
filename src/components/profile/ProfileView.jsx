import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileShowcases from './ProfileShowcases';
import ProfileRecentActivity from './ProfileRecentActivity';
import ProfileComments from './ProfileComments';
import ProfileSidebar from './ProfileSidebar';
import EditProfileModal from './EditProfileModal';
import { useNavigation } from '../../context/NavigationContext';
import { LayoutGrid, Gamepad2, Award, Users, Trophy } from 'lucide-react';
import '../../styles/profile.css';

export default function ProfileView() {
  const [activeProfileTab, setActiveProfileTab] = useState('principal');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { libraryGames, goToLibrary } = useNavigation();

  const gamesCount = libraryGames?.length || 8;

  return (
    <div className="steam-profile-wrapper">
      <div className="steam-profile-container">
        {/* Cabeçalho Oficial do Perfil */}
        <ProfileHeader onOpenEditModal={() => setIsEditModalOpen(true)} />

        {/* Barra de Subnavegação do Perfil */}
        <nav className="steam-profile-subnav">
          <button
            className={`steam-profile-tab-btn ${activeProfileTab === 'principal' ? 'active' : ''}`}
            onClick={() => setActiveProfileTab('principal')}
          >
            <LayoutGrid size={14} />
            <span>Principal</span>
          </button>

          <button
            className={`steam-profile-tab-btn ${activeProfileTab === 'jogos' ? 'active' : ''}`}
            onClick={() => setActiveProfileTab('jogos')}
          >
            <Gamepad2 size={14} />
            <span>Jogos</span>
            <span className="steam-tab-count-badge">{gamesCount}</span>
          </button>

          <button
            className={`steam-profile-tab-btn ${activeProfileTab === 'insignias' ? 'active' : ''}`}
            onClick={() => setActiveProfileTab('insignias')}
          >
            <Award size={14} />
            <span>Insígnias</span>
            <span className="steam-tab-count-badge">28</span>
          </button>

          <button
            className={`steam-profile-tab-btn ${activeProfileTab === 'amigos' ? 'active' : ''}`}
            onClick={() => setActiveProfileTab('amigos')}
          >
            <Users size={14} />
            <span>Amigos</span>
            <span className="steam-tab-count-badge">124</span>
          </button>
        </nav>

        {/* Conteúdo Principal do Perfil em Duas Colunas */}
        {activeProfileTab === 'principal' && (
          <div className="steam-profile-columns">
            {/* Coluna Central / Esquerda */}
            <main className="steam-profile-main-col">
              {/* Vitrines da Steam */}
              <ProfileShowcases />

              {/* Atividade Recente */}
              <ProfileRecentActivity />

              {/* Mural de Comentários */}
              <ProfileComments />
            </main>

            {/* Coluna Direita (Sidebar) */}
            <ProfileSidebar />
          </div>
        )}

        {/* Aba de Jogos da Biblioteca do Perfil */}
        {activeProfileTab === 'jogos' && (
          <div className="steam-profile-columns">
            <main className="steam-profile-main-col">
              <div className="steam-showcase-box">
                <div className="steam-showcase-header">
                  <span className="steam-showcase-title">
                    <Gamepad2 size={16} color="#66c0f4" />
                    Todos os Jogos & Projetos Registrados ({gamesCount})
                  </span>
                  <button
                    className="steam-btn-profile-secondary"
                    onClick={() => goToLibrary()}
                    style={{ fontSize: '11px', padding: '4px 10px' }}
                  >
                    Abrir no Cliente Steam
                  </button>
                </div>
                <div style={{ padding: '16px' }}>
                  <ProfileRecentActivity />
                </div>
              </div>
            </main>
            <ProfileSidebar />
          </div>
        )}

        {/* Aba de Insígnias */}
        {activeProfileTab === 'insignias' && (
          <div className="steam-profile-columns">
            <main className="steam-profile-main-col">
              <div className="steam-showcase-box">
                <div className="steam-showcase-header">
                  <span className="steam-showcase-title">
                    <Award size={16} color="#ffd700" />
                    Coleção Completa de Insígnias Técnicas
                  </span>
                  <span className="steam-showcase-tag">Nível 5 Máximo</span>
                </div>
                <div style={{ padding: '16px' }}>
                  <ProfileShowcases />
                </div>
              </div>
            </main>
            <ProfileSidebar />
          </div>
        )}

        {/* Aba de Amigos */}
        {activeProfileTab === 'amigos' && (
          <div className="steam-profile-columns">
            <main className="steam-profile-main-col">
              <div className="steam-showcase-box">
                <div className="steam-showcase-header">
                  <span className="steam-showcase-title">
                    <Users size={16} color="#57cbde" />
                    Lista de Amigos & Colaboradores (124)
                  </span>
                </div>
                <div style={{ padding: '20px' }}>
                  <p style={{ color: '#8f98a0', fontSize: '13px' }}>
                    Desenvolvedores, engenheiros de software, recrutadores e gamers conectados.
                  </p>
                  <ProfileComments />
                </div>
              </div>
            </main>
            <ProfileSidebar />
          </div>
        )}

        {/* Modal para Editar Perfil */}
        <EditProfileModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      </div>
    </div>
  );
}
