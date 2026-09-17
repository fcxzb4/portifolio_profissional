import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Download, Check, Loader } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import '../../styles/gamepage.css';

export default function GameStorePage({ game }) {
  const { goToStoreHome, downloadGame, checkGameInLibrary, goToLibrary } = useNavigation();
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [downloadState, setDownloadState] = useState('idle'); // idle | downloading | done
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isInLibrary, setIsInLibrary] = useState(false);
  const downloadIntervalRef = useRef(null);

  // Verificar se já está na biblioteca
  useEffect(() => {
    async function check() {
      const result = await checkGameInLibrary(game.id);
      if (result) {
        setIsInLibrary(true);
        setDownloadState('done');
      }
    }
    check();
  }, [game.id]);

  // Simular download progressivo
  function handleDownload() {
    if (downloadState !== 'idle') return;
    setDownloadState('downloading');
    setDownloadProgress(0);

    let progress = 0;
    downloadIntervalRef.current = setInterval(() => {
      progress += Math.random() * 8 + 3;
      if (progress >= 100) {
        progress = 100;
        clearInterval(downloadIntervalRef.current);
        setDownloadProgress(100);

        // Salvar no Firestore
        downloadGame(game).then(() => {
          setTimeout(() => {
            setDownloadState('done');
            setIsInLibrary(true);
          }, 500);
        });
      } else {
        setDownloadProgress(Math.min(progress, 99));
      }
    }, 200);
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (downloadIntervalRef.current) {
        clearInterval(downloadIntervalRef.current);
      }
    };
  }, []);

  const screenshots = game.screenshots || [];
  const tags = game.tags || [];

  return (
    <div className="gamepage-container">
      {/* Back Button */}
      <button className="gamepage-back-btn" onClick={goToStoreHome}>
        <ArrowLeft size={14} />
        Voltar para a Loja
      </button>

      {/* Hero Banner */}
      <div className="gamepage-hero">
        <img
          src={game.heroBanner || game.mainImage}
          alt={game.title}
          className="gamepage-hero-img"
        />
        <div className="gamepage-hero-overlay">
          <div className="gamepage-hero-info">
            <h1>{game.title}</h1>
            <div className="gamepage-hero-status">{game.status}</div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="gamepage-body">
        {/* Left Column */}
        <div className="gamepage-left">
          {/* Screenshot Gallery */}
          {screenshots.length > 0 && (
            <div className="gamepage-screenshots">
              <div className="gamepage-screenshot-main">
                <img
                  src={screenshots[activeScreenshot]}
                  alt={`Screenshot ${activeScreenshot + 1}`}
                />
              </div>
              <div className="gamepage-screenshot-thumbs">
                {screenshots.map((ss, i) => (
                  <div
                    key={i}
                    className={`gamepage-screenshot-thumb ${i === activeScreenshot ? 'active' : ''}`}
                    onClick={() => setActiveScreenshot(i)}
                  >
                    <img src={ss} alt={`Thumb ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="gamepage-description">
            <h2>Sobre este jogo</h2>
            <p>{game.description || 'Sem descrição disponível.'}</p>

            {tags.length > 0 && (
              <div className="gamepage-tags">
                {tags.map((tag, i) => (
                  <span key={i} className="gamepage-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="gamepage-right">
          {/* Purchase / Download Card */}
          <div className="gamepage-purchase-card">
            <div className="gamepage-purchase-title">{game.title}</div>

            {/* Download Button States */}
            {downloadState === 'idle' && (
              <button className="gamepage-download-btn" onClick={handleDownload}>
                <Download size={18} />
                Baixar para Biblioteca
              </button>
            )}

            {downloadState === 'downloading' && (
              <>
                <button className="gamepage-download-btn downloading" disabled>
                  <Loader size={18} className="spin-icon" />
                  Baixando...
                </button>
                <div className="gamepage-download-progress">
                  <div className="gamepage-progress-bar">
                    <div
                      className="gamepage-progress-fill"
                      style={{ width: `${downloadProgress}%` }}
                    ></div>
                  </div>
                  <div className="gamepage-progress-text">
                    <span>{Math.round(downloadProgress)}%</span>
                    <span>{(downloadProgress * 0.45).toFixed(1)} GB / 45.0 GB</span>
                  </div>
                </div>
              </>
            )}

            {downloadState === 'done' && (
              <button
                className="gamepage-download-btn in-library"
                onClick={goToLibrary}
              >
                <Check size={18} />
                {isInLibrary ? 'Na Biblioteca — Abrir' : 'Instalado'}
              </button>
            )}
          </div>

          {/* Game Meta Info */}
          <div className="gamepage-meta">
            <div className="gamepage-meta-row">
              <span className="gamepage-meta-label">Desenvolvedor</span>
              <span className="gamepage-meta-value">
                {game.developer || 'Desconhecido'}
              </span>
            </div>
            <div className="gamepage-meta-row">
              <span className="gamepage-meta-label">Editora</span>
              <span className="gamepage-meta-value">
                {game.publisher || 'Desconhecido'}
              </span>
            </div>
            <div className="gamepage-meta-row">
              <span className="gamepage-meta-label">Plataformas</span>
              <span className="gamepage-meta-value">
                {(game.platforms || ['windows']).map(p =>
                  p === 'windows' ? '🖥️ Windows' :
                  p === 'mac' ? '🍎 macOS' :
                  p === 'linux' ? '🐧 Linux' : p
                ).join(', ')}
              </span>
            </div>
            {game.discount > 0 && (
              <div className="gamepage-meta-row">
                <span className="gamepage-meta-label">Preço</span>
                <span className="gamepage-meta-value">
                  <span style={{ textDecoration: 'line-through', opacity: 0.5, marginRight: 6 }}>
                    {game.originalPrice}
                  </span>
                  {game.discountPrice}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
