import React, { useState, useEffect } from 'react';

export default function MobileWarning() {
  const [isMobile, setIsMobile] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile || dismissed) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#F9F6EF',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <img 
        src="/portrait.jpg" 
        alt="Athanasius Kircher" 
        style={{
          width: '200px',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '50%',
          marginBottom: '2rem',
          border: '4px solid #8C1515',
          boxShadow: '0 4px 12px rgba(140, 21, 21, 0.2)'
        }}
      />
      
      <h1 style={{
        fontFamily: "'Source Sans Pro', Arial, sans-serif",
        fontSize: '1.75rem',
        fontWeight: 600,
        color: '#8C1515',
        marginBottom: '1rem',
        lineHeight: 1.3
      }}>
        A Scholar's Work Deserves<br />A Proper View
      </h1>
      
      <p style={{
        fontFamily: "'Source Sans Pro', Arial, sans-serif",
        fontSize: '1rem',
        color: '#2E2D29',
        lineHeight: 1.6,
        marginBottom: '2rem',
        maxWidth: '400px'
      }}>
        We've crafted this digital archive with meticulous care. For the full experience of exploring Athanasius Kircher's remarkable correspondence, we recommend viewing on a desktop or laptop computer.
      </p>
      
      <button
        onClick={() => setDismissed(true)}
        style={{
          fontFamily: "'Source Sans Pro', Arial, sans-serif",
          backgroundColor: '#8C1515',
          color: 'white',
          padding: '0.75rem 2rem',
          borderRadius: '4px',
          border: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transition: 'background-color 0.2s ease'
        }}
        onMouseDown={(e) => e.target.style.backgroundColor = '#820000'}
        onMouseUp={(e) => e.target.style.backgroundColor = '#8C1515'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#8C1515'}
      >
        Continue Anyway
      </button>
      
      <p style={{
        fontFamily: "'Source Sans Pro', Arial, sans-serif",
        fontSize: '0.75rem',
        color: '#6b7280',
        marginTop: '1.5rem'
      }}>
      </p>
    </div>
  );
}