import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--sage-dark)', color: 'white',
      padding: '3rem 6rem',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: '2rem'
    }}>
      <div>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          🌿 Holistic Healing Homeopathy
        </div>
        <p style={{ fontFamily: 'Jost', fontSize: '0.85rem', opacity: 0.7, maxWidth: '300px', lineHeight: 1.7 }}>
          Healing naturally since 2009. Homeopathic care for the whole family.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '3rem' }}>
        {[['Quick Links', ['Home', 'About', 'Services', 'Contact']], ['Legal', ['Privacy Policy', 'Terms of Use']]].map(([title, links]) => (
          <div key={title}>
            <div style={{ fontFamily: 'Jost', fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.6, marginBottom: '1rem' }}>{title}</div>
            {links.map(l => (
              <div key={l} style={{ fontFamily: 'Jost', fontSize: '0.9rem', opacity: 0.85, marginBottom: '0.5rem', cursor: 'pointer' }}>{l}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ fontFamily: 'Jost', fontSize: '0.8rem', opacity: 0.5, textAlign: 'center', width: '100%', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', marginTop: '1rem' }}>
        © 2025 Holistic Healing Homeopathy. All rights reserved.
      </div>
    </footer>
  );
}