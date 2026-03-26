import React, { useState, useEffect, useRef } from 'react';
import Search from './Search';
import Main from './Main';
import About from './About';
import './KircherBrowse.css';

export default function KircherBrowse() {
  const [volumes, setVolumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVolume, setSelectedVolume] = useState(null);
  const [currentPage, setCurrentPage] = useState('main');
  
  const API_URL = '';

  useEffect(() => {
    if (currentPage === 'browse') {
      fetchVolumes();
    }
  }, [currentPage]);

  const fetchVolumes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/volumes`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch volumes');
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      console.log('First volume:', data[0]);
      setVolumes(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching volumes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewVolume = (volume) => {
    setSelectedVolume(volume);
  };

  const handleBackToCollection = () => {
    setSelectedVolume(null);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setSelectedVolume(null);
  };

  if (currentPage === 'about') {
    return (
      <div className="main-container">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <About />
        <Footer />
      </div>
    );
  }

  if (currentPage === 'main') {
    return (
      <div className="main-container">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <Main />
        <Footer />
      </div>
    );
  }

  if (currentPage === 'search') {
    return (
      <div className="main-container">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <Search />
        <Footer />
      </div>
    );
  }

  if (selectedVolume) {
    return (
      <VolumeViewer
        key={`browse-${selectedVolume.volume_id}-${Date.now()}`}
        volume={selectedVolume}
        onBack={handleBackToCollection}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />
    );
  }

  if (loading) {
    return (
      <div className="main-container">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <div className="loading-container">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading Kircher Correspondence...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-container">
        <Header currentPage={currentPage} onNavigate={handleNavigate} />
        <div className="error-container">
          <div className="error-box">
            <h2 className="error-title">Connection Error</h2>
            <p className="error-message">{error}</p>
            <p className="error-help">
              Make sure your API server is running and the API_URL is correct.
            </p>
            <button onClick={fetchVolumes} className="retry-button">
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="main-container">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="main-content">
        <div className="collection-header" style={{ textAlign: 'center' }}>
          <h2 className="collection-title">Volume Collection</h2>
        </div>

        <div className="volume-grid">
          {volumes.map((volume) => (
            <VolumeCard 
              key={volume.volume_id} 
              volume={volume} 
              onViewVolume={handleViewVolume}
            />
          ))}
        </div>

        {volumes.length === 0 && !loading && (
          <div className="empty-state">
            <svg className="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="empty-text">No volumes found</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function Header({ currentPage = 'main', onNavigate }) {
  return (
    <header className="header" style={{ backgroundColor: '#F9F6EF', padding: '1.5rem 0' }}>
      <div className="header-content">
        <div className="header-inner" style={{ alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1 className="header-title" style={{ color: '#8C1515', fontSize: '2.25rem', margin: 0 }}>Correspondence of Athanasius Kircher</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <nav style={{ display: 'flex', gap: '0', alignItems: 'center' }}>
              <button 
                onClick={() => onNavigate('main')} 
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '400',
                  color: currentPage === 'main' ? '#8C1515' : '#2e2d29',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: currentPage === 'main' ? '3px solid #8C1515' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit'
                }}
                onMouseOver={(e) => {
                  if (currentPage !== 'main') {
                    e.target.style.color = '#8C1515';
                  }
                }}
                onMouseOut={(e) => {
                  if (currentPage !== 'main') {
                    e.target.style.color = '#2e2d29';
                  }
                }}
              >
                Main
              </button>
              <button 
                onClick={() => onNavigate('browse')} 
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '400',
                  color: currentPage === 'browse' ? '#8C1515' : '#2e2d29',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: currentPage === 'browse' ? '3px solid #8C1515' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit'
                }}
                onMouseOver={(e) => {
                  if (currentPage !== 'browse') {
                    e.target.style.color = '#8C1515';
                  }
                }}
                onMouseOut={(e) => {
                  if (currentPage !== 'browse') {
                    e.target.style.color = '#2e2d29';
                  }
                }}
              >
                Browse
              </button>
              <button 
                onClick={() => onNavigate('search')} 
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '400',
                  color: currentPage === 'search' ? '#8C1515' : '#2e2d29',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: currentPage === 'search' ? '3px solid #8C1515' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit'
                }}
                onMouseOver={(e) => {
                  if (currentPage !== 'search') {
                    e.target.style.color = '#8C1515';
                  }
                }}
                onMouseOut={(e) => {
                  if (currentPage !== 'search') {
                    e.target.style.color = '#2e2d29';
                  }
                }}
              >
                Search
              </button>
              <button 
                onClick={() => onNavigate('about')} 
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '400',
                  color: currentPage === 'about' ? '#8C1515' : '#2e2d29',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: currentPage === 'about' ? '3px solid #8C1515' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit'
                }}
                onMouseOver={(e) => {
                  if (currentPage !== 'about') {
                    e.target.style.color = '#8C1515';
                  }
                }}
                onMouseOut={(e) => {
                  if (currentPage !== 'about') {
                    e.target.style.color = '#2e2d29';
                  }
                }}
              >
                About
              </button>
            </nav>
            <img 
              src="/logo.png" 
              alt="Logo" 
              style={{ height: '50px', width: 'auto' }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-title">Athanasius Kircher Correspondence Database</p>
        <p className="footer-subtitle">© 2025</p>
      </div>
    </footer>
  );
}

function VolumeCard({ volume, onViewVolume }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="volume-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="volume-thumbnail">
        {volume.volume_preview ? (
          <img
            src={volume.volume_preview}
            alt={volume.volume_number}
          />
        ) : (
          <div className="thumbnail-placeholder">
            <svg className="placeholder-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        )}
        
        <div className="volume-overlay">
          <h3 className="volume-title">{volume.volume_number}</h3>
          <p className="volume-extent">{volume.volume_extent}</p>
        </div>
      </div>

      <div className="volume-action">
        <button onClick={() => onViewVolume(volume)} className="view-volume-button">
          View Volume
        </button>
      </div>
    </div>
  );
}

function VolumeViewer({ volume, onBack, currentPage, onNavigate }) {
  const [itemData, setItemData] = useState(null);
  const [loadingItem, setLoadingItem] = useState(false);
  const [itemError, setItemError] = useState(null);
  const [miradorLoaded, setMiradorLoaded] = useState(false);
  const miradorRef = useRef(null);
  const miradorInstanceRef = useRef(null);
  
  const manifestUrl = volume.volume_manifest;
  const API_URL = '';
  
  console.log('Volume data:', volume);
  console.log('Manifest URL:', manifestUrl);

  useEffect(() => {
    if (!manifestUrl || !miradorRef.current) return;

    let mounted = true;

    const loadMirador = async () => {
      if (window.Mirador) {
        if (mounted) {
          await new Promise(resolve => setTimeout(resolve, 100));
          initializeMirador();
        }
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mirador@3/dist/mirador.min.js';
      script.onload = () => {
        if (mounted) {
          setTimeout(() => initializeMirador(), 100);
        }
      };
      document.body.appendChild(script);

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/mirador@3/dist/mirador.min.css';
      document.head.appendChild(link);
    };

    const initializeMirador = () => {
      if (!miradorRef.current) {
        console.log('No miradorRef');
        return;
      }
      
      if (miradorInstanceRef.current) {
        console.log('Mirador instance already exists');
        return;
      }

      console.log('Initializing Mirador viewer');
      miradorRef.current.innerHTML = '';

      setTimeout(() => {
        if (!mounted || !miradorRef.current) return;

        const config = {
          id: 'mirador-viewer-browse',
          windows: [{
            manifestId: manifestUrl,
            view: 'single',
            thumbnailNavigationPosition: 'far-bottom'
          }],
          window: {
            allowClose: false,
            allowMaximize: false,
            allowFullscreen: true,
            allowWindowSideBar: true,
            allowTopMenuButton: true,
            allowTopMenuButton: true,
            sideBarOpen: false,
            panels: {
              info: true,
              attribution: true,
              canvas: true,
              annotations: true,
              search: false
            }
          },
          workspace: {
            showZoomControls: true,
            type: 'mosaic',
            draggingEnabled: false,
            allowNewWindows: false,
            isWorkspaceAddVisible: false
          },
          thumbnailNavigation: {
            defaultPosition: 'far-bottom',
            displaySettings: true,
            height: 130
          },
          workspaceControlPanel: {
            enabled: false
          }
        };

        try {
          miradorInstanceRef.current = window.Mirador.viewer(config);
          setMiradorLoaded(true);

          const store = miradorInstanceRef.current.store;
          let previousCanvas = null;
          let previousTitleId = itemData?.title_id;

          store.subscribe(() => {
            if (!mounted) return;
            
            const state = store.getState();
            const windowId = Object.keys(state.windows)[0];
            
            if (windowId) {
              const currentCanvas = state.windows[windowId]?.canvasId;
              
              if (currentCanvas && currentCanvas !== previousCanvas) {
                previousCanvas = currentCanvas;
                console.log('Canvas changed to:', currentCanvas);
                handleCanvasChange(currentCanvas, previousTitleId).then(newTitleId => {
                  if (newTitleId && newTitleId !== previousTitleId) {
                    previousTitleId = newTitleId;
                    console.log('Title changed to:', newTitleId);
                  }
                });
              }
            }
          });
        } catch (err) {
          console.error('Error initializing Mirador:', err);
        }
      }, 150);
    };

    loadMirador();

    return () => {
      mounted = false;
      
      if (miradorInstanceRef.current) {
        try {
          if (typeof miradorInstanceRef.current.destroy === 'function') {
            miradorInstanceRef.current.destroy();
          }
          miradorInstanceRef.current = null;
        } catch (err) {
          console.error('Error cleaning up Mirador instance:', err);
        }
      }
      
      setTimeout(() => {
        if (miradorRef.current) {
          try {
            miradorRef.current.innerHTML = '';
          } catch (err) {
            console.error('Error cleaning up DOM:', err);
          }
        }
      }, 100);
      
      setMiradorLoaded(false);
    };
  }, [manifestUrl]);

  const handleCanvasChange = async (canvasUrl, previousTitleId) => {
    try {
      setLoadingItem(true);
      setItemError(null);
      
      const response = await fetch(`${API_URL}/api/items/by-canvas?canvas=${encodeURIComponent(canvasUrl)}`);
      
      if (!response.ok) {
        console.log('No response for canvas, keeping previous metadata');
        setLoadingItem(false);
        return previousTitleId;
      }
      
      const data = await response.json();
      
      if (!data || !data.title_id) {
        console.log('No metadata for this canvas, keeping previous metadata');
        setLoadingItem(false);
        return previousTitleId;
      }
      
      if (data.title_id !== previousTitleId) {
        setItemData(data);
        console.log('Item data updated - new title:', data.title_id);
        setLoadingItem(false);
        return data.title_id;
      } else {
        console.log('Same title detected, keeping existing metadata');
        setLoadingItem(false);
        return previousTitleId;
      }
    } catch (err) {
      console.error('Error fetching item data:', err);
      setItemError(null);
      setLoadingItem(false);
      return previousTitleId;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Header currentPage={currentPage} onNavigate={onNavigate} />
      
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <button
            onClick={onBack}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', fontSize: '0.875rem', fontWeight: '600', color: 'white', backgroundColor: '#8C1515', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', transition: 'background-color 0.2s' }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#820000'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#8C1515'}
          >
            <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Collection
          </button>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
            {volume.volume_number}
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1rem' }}>
            {volume.volume_extent}
          </p>
        </div>
        
        <div className="mirador-container">
          {manifestUrl ? (
            <div 
              id="mirador-viewer-browse"
              ref={miradorRef}
              className={`mirador-viewer ${miradorLoaded ? 'visible' : 'hidden'}`}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', minHeight: '600px', backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <svg style={{ width: '4rem', height: '4rem', color: '#d1d5db', marginBottom: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Manifest Not Available</h3>
              <p style={{ color: '#6b7280' }}>
                This volume does not have a IIIF manifest URL configured.
              </p>
            </div>
          )}
        </div>

        {manifestUrl && miradorLoaded && (itemData || loadingItem) && (
          <ItemInfoPanel 
            itemData={itemData} 
            loading={loadingItem} 
            error={itemError}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

function ItemInfoPanel({ itemData, loading, error }) {
  if (loading) {
    return (
      <div className="item-info-loading">
        <div className="item-loading-content">
          <div className="item-loading-spinner"></div>
          <p className="item-loading-text">Loading item information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="item-info-error">
        <p className="item-error-text">Error loading item data: {error}</p>
      </div>
    );
  }

  if (!itemData) {
    return null;
  }

  return (
    <div className="item-info-panel">
      <div className="item-header">
        <h3 className="item-title">
          {itemData.title_name || 'Untitled Item'}
        </h3>
        {(itemData.volume_id || itemData.item_id || itemData.title_id) && (
          <p className="item-id">
            {itemData.volume_id ? `Volume ${itemData.volume_id}` : ''}{itemData.volume_id && itemData.item_id ? '. ' : ''}{itemData.item_id ? `Item ${itemData.item_id}` : ''}{(itemData.volume_id || itemData.item_id) && itemData.title_id ? '. ' : ''}{itemData.title_id || ''}
          </p>
        )}
      </div>

      <div className="item-grid">
        <div>
          <h4 className="section-title">Information</h4>
          
          <div className="metadata-fields">
            {itemData.location && (
              <InfoField label="Location" value={itemData.location} />
            )}
            {itemData.modern_day_country && (
              <InfoField label="Modern Day Country" value={itemData.modern_day_country} />
            )}
            {itemData.date && (
              <InfoField label="Date" value={itemData.date} />
            )}
            {itemData.language && (
              <InfoField label="Language" value={itemData.language} />
            )}
            {itemData.title_extent && (
              <InfoField label="Extent" value={itemData.title_extent} />
            )}
            {itemData.related_folios && (
              <InfoField label="Related Folios" value={itemData.related_folios} />
            )}
          </div>

          {itemData.related_people && (
            <div className="related-people-section">
              <h4 className="section-title">Related People</h4>
              <p className="related-people-text" style={{ whiteSpace: 'pre-line' }}>
                {itemData.related_people.replace(/\s+(Sender:)/g, '\n$1')}
              </p>
            </div>
          )}

          {itemData.topics && (
            <div className="topics-section">
              <h4 className="section-title">Topics</h4>
              <div className="topics-container">
                {itemData.topics.split(',').map((topic, idx) => (
                  <span key={idx} className="topic-tag">
                    {topic.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          {itemData.title_description && (
            <div className="description-section">
              <h4 className="section-title">Description</h4>
              <p className="description-text">{itemData.title_description}</p>
            </div>
          )}

          {itemData.original_text && (
            <div className="original-text-section">
              <h4 className="section-title">Original Text</h4>
              <div className="original-text-box">
                {itemData.original_text}
              </div>
            </div>
          )}

          {itemData.translated_text && (
            <div className="translated-text-section">
              <h4 className="section-title">Translated Text</h4>
              <div className="translated-text-box">
                {itemData.translated_text}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <div className="info-field">
      <span className="info-field-label">{label}</span>
      <span className="info-field-value">{value}</span>
    </div>
  );
}