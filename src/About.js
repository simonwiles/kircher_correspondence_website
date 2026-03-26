import React from 'react';
import './KircherBrowse.css';

export default function About() {
  return (
    <div className="main-container">
      <main className="main-content">
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '3rem 2rem'
        }}>
          <div style={{ 
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: '#8C1515',
              marginBottom: '1rem'
            }}>
              About This Project
            </h2>
            <div style={{ 
              width: '80px',
              height: '4px',
              backgroundColor: '#8C1515',
              margin: '0 auto'
            }}></div>
          </div>

          <div style={{ 
            fontSize: '1.125rem', 
            lineHeight: '1.8', 
            color: '#2e2d29',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <p style={{ marginBottom: '2rem' }}>
              Information about the team will be hosted here.
            </p>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '3rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            marginTop: '3rem'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              Project Team
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  backgroundColor: '#f3f4f6',
                  margin: '0 auto 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg style={{ width: '3rem', height: '3rem', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>Team Member</p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Role</p>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  backgroundColor: '#f3f4f6',
                  margin: '0 auto 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg style={{ width: '3rem', height: '3rem', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>Team Member</p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Role</p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  backgroundColor: '#f3f4f6',
                  margin: '0 auto 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg style={{ width: '3rem', height: '3rem', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>Team Member</p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Role</p>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '3rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            marginTop: '2rem'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              Contact Information
            </h3>
            <div style={{
              textAlign: 'center',
              color: '#4b5563',
              fontSize: '1rem',
              lineHeight: '1.8'
            }}>
              <p style={{ marginBottom: '0.5rem' }}>
                For questions or more information about this project:
              </p>
              <p style={{ color: '#8C1515', fontWeight: '500' }}>
                contact@stanford.edu
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}