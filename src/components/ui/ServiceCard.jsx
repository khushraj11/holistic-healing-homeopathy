import React, { useState } from 'react';

export default function ServiceCard({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--sage-dark)' : 'white',
        borderRadius: '20px', padding: '2.5rem 2rem',
        boxShadow: hovered ? '0 20px 60px rgba(74,122,80,0.3)' : '0 4px 20px rgba(0,0,0,0.06)',
        transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        cursor: 'default', border: '1px solid rgba(122,158,126,0.15)'
      }}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '1.2rem' }}>{icon}</div>
      <h3 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: '1.5rem', marginBottom: '0.8rem',
        color: hovered ? 'var(--gold)' : 'var(--sage-dark)'
      }}>{title}</h3>
      <p style={{
        fontFamily: 'Jost, sans-serif', fontSize: '0.9rem',
        color: hovered ? 'rgba(255,255,255,0.85)' : 'var(--text-mid)',
        lineHeight: 1.7, transition: 'color 0.4s'
      }}>{desc}</p>
    </div>
  );
}