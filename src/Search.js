import React, { useState, useEffect, useRef } from 'react';
import { searchItems, loadVolumeById, loadItemByCanvas } from './data-api';
import './KircherBrowse.css';

export default function KircherSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    language: '',
  });
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingPage, setLoadingPage] = useState(false);
  
  const RESULTS_PER_PAGE = 5000;

  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);

  const handleSearch = async (pageNum = 1) => {
    if (!searchQuery.trim() && !searchFilters.language) {
      return;
    }

    try {
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingPage(true);
      }
      setError(null);
      setHasSearched(true);
      
      const offset = (pageNum - 1) * RESULTS_PER_PAGE;
      
      const { results: searchResults, total } = searchItems(searchQuery.trim(), {
        language: searchFilters.language || undefined,
        limit: RESULTS_PER_PAGE,
        offset: offset
      });
      
      console.log('Search results:', searchResults.length, 'of', total);
      
      setResults(searchResults);
      setCurrentPage(pageNum);
      setTotalResults(total);
      setHasMore(offset + searchResults.length < total);
    } catch (err) {
      setError(err.message);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
      setLoadingPage(false);
    }
  };

  const handlePageChange = (pageNum) => {
    handleSearch(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleViewItem = (item) => {
    setSelectedItem(item);
  };

  const handleBackToResults = () => {
    setSelectedItem(null);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchFilters({ language: '' });
    setResults([]);
    setHasSearched(false);
    setCurrentPage(1);
    setTotalResults(0);
    setHasMore(false);
  };

  if (selectedItem) {
    return <ItemViewer key={`search-${selectedItem.title_id}-${Date.now()}`} item={selectedItem} onBack={handleBackToResults} />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
            Search the Collection
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
            Search through letters and manuscripts
          </p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ position: 'relative' }}>
              <svg style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', width: '1.25rem', height: '1.25rem', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search by title, people, date, or location..."
                style={{ width: '100%', padding: '0.75rem 3rem 0.75rem 3rem', fontSize: '1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', outline: 'none', boxSizing: 'border-box' }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', padding: '0.25rem', border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  <svg style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <select
              value={searchFilters.language}
              onChange={(e) => setSearchFilters({ ...searchFilters, language: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', backgroundColor: 'white' }}
            >
              <option value="">All Languages</option>
              <option value="Arabic">Arabic</option>
              <option value="Armenian">Armenian</option>
              <option value="Chaldean">Chaldean</option>
              <option value="Chinese">Chinese</option>
              <option value="Coptic">Coptic</option>
              <option value="Czech">Czech</option>
              <option value="Dutch">Dutch</option>
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Greek">Greek</option>
              <option value="Hebrew">Hebrew</option>
              <option value="Hieroglyphics">Hieroglyphics</option>
              <option value="Italian">Italian</option>
              <option value="Kircher's universal language">Kircher's universal language</option>
              <option value="Latin">Latin</option>
              <option value="Persian">Persian</option>
              <option value="Portugese">Portugese</option>
              <option value="Sanskrit">Sanskrit</option>
              <option value="Spanish">Spanish</option>
              <option value="Syriac">Syriac</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              style={{ flex: 1, padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', color: 'white', backgroundColor: loading ? '#9ca3af' : '#2563eb', border: 'none', borderRadius: '0.5rem', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
            {hasSearched && (
              <button
                onClick={handleClearSearch}
                style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', color: '#374151', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '0.5rem', cursor: 'pointer' }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', border: '1px solid #ef4444', borderRadius: '0.5rem', padding: '1rem', marginBottom: '2rem' }}>
            <p style={{ color: '#991b1b', fontWeight: '500' }}>Error: {error}</p>
          </div>
        )}

        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
            <div style={{ width: '3rem', height: '3rem', border: '4px solid #e5e7eb', borderTop: '4px solid #2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <p style={{ marginTop: '1rem', color: '#6b7280' }}>
              {results.length > 0 ? `Loading... (${results.length} results so far)` : 'Searching...'}
            </p>
          </div>
        )}

        {!loading && hasSearched && (
          <div>
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>
                {results.length} {results.length === 1 ? 'Result' : 'Results'}
                {totalPages > 1 && (
                  <span style={{ fontSize: '0.875rem', fontWeight: '400', color: '#6b7280', marginLeft: '0.5rem' }}>
                    (Page {currentPage} of {totalPages})
                  </span>
                )}
              </h3>
            </div>

            {results.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'white', borderRadius: '0.75rem' }}>
                <svg style={{ width: '4rem', height: '4rem', color: '#d1d5db', margin: '0 auto 1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p style={{ fontSize: '1.125rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>No results found</p>
                <p style={{ color: '#6b7280' }}>Try different search terms or filters</p>
              </div>
            ) : (
              <>
                {loadingPage ? (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
                    <div style={{ width: '2rem', height: '2rem', border: '3px solid #e5e7eb', borderTop: '3px solid #2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {results.map((item, index) => (
                      <SearchResultCard
                        key={item.title_id || index}
                        item={item}
                        onView={handleViewItem}
                      />
                    ))}
                  </div>
                )}

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        )}

        {!hasSearched && (
          <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>Search Tips</h3>
            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', color: '#4b5563', lineHeight: '1.75' }}>
              <li>Search by title, description, or related people</li>
              <li>Filter by language for more specific results</li>
              <li>Click on any result to view the full document in the viewer</li>
              <li>Results are paginated with 50 items per page for better performance</li>
            </ul>
          </div>
        )}
      </main>
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: '0.5rem 0.75rem',
          fontSize: '0.875rem',
          fontWeight: '500',
          color: currentPage === 1 ? '#9ca3af' : '#374151',
          backgroundColor: 'white',
          border: '1px solid #d1d5db',
          borderRadius: '0.5rem',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
        }}
      >
        Previous
      </button>

      {getPageNumbers().map((page, idx) => (
        page === '...' ? (
          <span key={`ellipsis-${idx}`} style={{ padding: '0.5rem', color: '#6b7280' }}>...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              padding: '0.5rem 0.75rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: currentPage === page ? 'white' : '#374151',
              backgroundColor: currentPage === page ? '#2563eb' : 'white',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              minWidth: '2.5rem'
            }}
          >
            {page}
          </button>
        )
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: '0.5rem 0.75rem',
          fontSize: '0.875rem',
          fontWeight: '500',
          color: currentPage === totalPages ? '#9ca3af' : '#374151',
          backgroundColor: 'white',
          border: '1px solid #d1d5db',
          borderRadius: '0.5rem',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
        }}
      >
        Next
      </button>
    </div>
  );
}

function SearchResultCard({ item, onView }) {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'box-shadow 0.2s' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
          <h4 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>
            {item.title_name || 'Untitled'}
          </h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0, marginLeft: '1rem' }}>
            {item.volume_number && (
              <span style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e40af', backgroundColor: '#dbeafe', borderRadius: '9999px' }}>
                {item.volume_number}
              </span>
            )}
            {item.language && (
              <span style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#065f46', backgroundColor: '#d1fae5', borderRadius: '9999px' }}>
                {item.language}
              </span>
            )}
          </div>
        </div>

        {(item.volume_id || item.item_id || item.title_id) && (
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.75rem' }}>
            {item.volume_id ? `Volume ${item.volume_id}` : ''}{item.volume_id && item.item_id ? '. ' : ''}{item.item_id ? `Item ${item.item_id}` : ''}{(item.volume_id || item.item_id) && item.title_id ? '. ' : ''}{item.title_id || ''}
          </p>
        )}

        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {item.date && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#4b5563' }}>
              <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {item.date}
            </span>
          )}
          {item.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#4b5563' }}>
              <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {item.location}
            </span>
          )}
        </div>

        {item.related_people && (
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', alignItems: 'start' }}>
            <svg style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280', flexShrink: 0, marginTop: '0.125rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.5', whiteSpace: 'pre-line' }}>
              {item.related_people.replace(/\s+(Sender:)/g, '\n$1')}
            </span>
          </div>
        )}

        {item.title_description && (
          <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.625', marginBottom: '1rem' }}>
            {item.title_description.length > 200 ? item.title_description.substring(0, 200) + '...' : item.title_description}
          </p>
        )}

        {item.topics && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {item.topics.split(',').slice(0, 3).map((topic, idx) => (
              <span key={idx} style={{ padding: '0.25rem 0.625rem', fontSize: '0.75rem', color: '#374151', backgroundColor: '#f3f4f6', borderRadius: '0.375rem' }}>
                {topic.trim()}
              </span>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
        <button
          onClick={() => onView(item)}
          style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem', fontWeight: '600', color: 'white', backgroundColor: '#2563eb', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}
        >
          View Document
        </button>
      </div>
    </div>
  );
}

function ItemViewer({ item, onBack }) {
  const [volumeData, setVolumeData] = useState(null);
  const [loadingVolume, setLoadingVolume] = useState(true);
  const [miradorLoaded, setMiradorLoaded] = useState(false);
  const [itemData, setItemData] = useState(item);
  const [loadingItem, setLoadingItem] = useState(false);
  const miradorRef = useRef(null);
  const miradorInstanceRef = useRef(null);

  useEffect(() => {
    const fetchVolume = () => {
      try {
        setLoadingVolume(true);
        const data = loadVolumeById(item.volume_id);
        setVolumeData(data);
      } catch (err) {
        console.error('Error loading volume:', err);
      } finally {
        setLoadingVolume(false);
      }
    };

    if (item.volume_id) {
      fetchVolume();
    }
  }, [item.volume_id]);

  useEffect(() => {
    if (!volumeData?.volume_manifest || !miradorRef.current) {
      console.log('Mirador not loading:', { 
        hasManifest: !!volumeData?.volume_manifest, 
        hasRef: !!miradorRef.current,
        manifest: volumeData?.volume_manifest 
      });
      return;
    }

    let mounted = true;

    const loadMirador = async () => {
      console.log('Loading Mirador with manifest:', volumeData.volume_manifest);
      
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
        console.log('Mirador script loaded');
        if (mounted) {
          setTimeout(() => initializeMirador(), 100);
        }
      };
      script.onerror = (err) => {
        console.error('Failed to load Mirador script:', err);
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
          id: 'mirador-viewer-search',
          windows: [{
            manifestId: volumeData.volume_manifest,
            canvasId: item.canvas_link || undefined,
            imageToolsEnabled: true,
            imageToolsOpen: false
          }],
          window: {
            allowClose: false,
            allowMaximize: false,
            defaultSideBarPanel: 'info',
            sideBarOpenByDefault: false
          },
          workspace: {
            showZoomControls: true
          },
          thumbnailNavigation: {
            displaySettings: false
          },
          workspaceControlPanel: {
            enabled: false
          },
          osdConfig: {
            crossOriginPolicy: 'Anonymous',
            ajaxWithCredentials: false
          }
        };

        try {
          console.log('Creating Mirador viewer with config:', config);
          miradorInstanceRef.current = window.Mirador.viewer(config);
          setMiradorLoaded(true);
          console.log('Mirador viewer created successfully');
          
          const store = miradorInstanceRef.current.store;
          let previousCanvas = item.canvas_link;
          let previousTitleId = item.title_id;

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
          console.error('Mirador config:', config);
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
  }, [volumeData, item.canvas_link]);

  const handleCanvasChange = async (canvasUrl, previousTitleId) => {
    try {
      setLoadingItem(true);
      
      const data = loadItemByCanvas(canvasUrl);
      
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
      console.error('Error loading item data:', err);
      setLoadingItem(false);
      return previousTitleId;
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <button
            onClick={onBack}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.625rem 1.25rem', 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              color: 'white', 
              backgroundColor: '#8C1515', 
              border: 'none', 
              borderRadius: '0.375rem', 
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#820000'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#8C1515'}
          >
            <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Results
          </button>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
            {item.title_name || 'Untitled'}
          </h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {volumeData && (
              <span style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>{volumeData.volume_number}</span>
            )}
            {(item.volume_id || item.item_id || item.title_id) && (
              <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                {item.volume_id ? `Volume ${item.volume_id}` : ''}{item.volume_id && item.item_id ? '. ' : ''}{item.item_id ? `Item ${item.item_id}` : ''}{(item.volume_id || item.item_id) && item.title_id ? '. ' : ''}{item.title_id || ''}
              </span>
            )}
          </div>
        </div>
        
        <div className="mirador-container">
          {loadingVolume ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', minHeight: '600px' }}>
              <div style={{ width: '3rem', height: '3rem', border: '4px solid #e5e7eb', borderTop: '4px solid #2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
              <p style={{ marginTop: '1rem', color: '#6b7280' }}>Loading viewer...</p>
            </div>
          ) : volumeData?.volume_manifest ? (
            <div
              id="mirador-viewer-search"
              ref={miradorRef}
              className={`mirador-viewer ${miradorLoaded ? 'visible' : 'hidden'}`}
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', minHeight: '600px' }}>
              <svg style={{ width: '4rem', height: '4rem', color: '#d1d5db', marginBottom: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Manifest Not Available</h3>
            </div>
          )}
        </div>

        {miradorLoaded && <ItemInfoPanel itemData={itemData} loading={loadingItem} />}
      </main>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function ItemInfoPanel({ itemData, loading }) {
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

  if (!itemData) return null;

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