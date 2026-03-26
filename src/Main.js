import React from 'react';
import './KircherBrowse.css';

export default function Main() {
  return (
    <div className="main-container">
      <main className="main-content">
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '3rem 2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 350px',
          gap: '3rem',
          alignItems: 'start'
        }}>
          <div>
            <div style={{ 
              fontSize: '1.125rem', 
              lineHeight: '1.8', 
              color: '#2e2d29',
              textAlign: 'justify'
            }}>
              <p style={{ marginBottom: '1.5rem' }}>
                Athanasius Kircher (1602-1680) was a German Jesuit and a dynamic nexus of the early modern European scholarly world. His correspondence constitutes a fundamental resource for the study of early modern Europe. It provides an untold wealth of information concerning the appropriation of knowledge of the New World in Europe, the complex cultural exchanges involved in Jesuit missionary activities, and the shifting allegiances formed between the Jesuit order and the European dynastic powers, opening new avenues of research into seventeenth century European culture.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                The bulk of Kircher's correspondence is currently preserved in the Archives of the Historical Archives of the Pontifical Gregorian University in Rome, in fourteen folio volumes (APUG 555 - APUG 568) containing a total of 2291 letters, and a number of miscellaneous papers.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                Stanford Libraries developed the Kircher website in collaboration with Prof. Paula Findlen which provided digital access to this immense, largely unpublished correspondence.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                The letters from the Gregorian collection have been digitized as high-quality TIFF images and are hosted on the Stanford Digital Repository (SDR).
              </p>
              <p>
                You can access all 14 volumes and browse the collection.
              </p>
            </div>
          </div>
          <div style={{ 
            position: 'sticky',
            top: '2rem'
          }}>
            <img 
              src="/portrait.jpg" 
              alt="Portrait of Athanasius Kircher" 
              style={{ 
                width: '100%',
                height: 'auto',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
            <p style={{ 
              marginTop: '1rem', 
              fontSize: '0.875rem', 
              color: '#5f5f5f',
              fontStyle: 'italic',
              textAlign: 'center'
            }}>
              Athanasius Kircher (1602-1680)
            </p>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid #e5e7eb',
          marginTop: '4rem',
          paddingTop: '3rem',
          paddingBottom: '3rem',
          paddingLeft: '2rem',
          paddingRight: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Collection Statistics
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <StatCard number="14" label="volumes" />
            <StatCard number="2564" label="items" />
            <StatCard number="7636" label="images" />
            <StatCard number="58" label="years" />
            <StatCard number="321" label="locations" />
            <StatCard number="548" label="people" />
            <StatCard number="21" label="languages" />
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '1.5rem',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        fontSize: '2.5rem',
        fontWeight: '700',
        color: '#8C1515',
        marginBottom: '0.5rem'
      }}>
        {number}
      </div>
      <div style={{
        fontSize: '1rem',
        color: '#6b7280',
        textTransform: 'lowercase'
      }}>
        {label}
      </div>
    </div>
  );
}