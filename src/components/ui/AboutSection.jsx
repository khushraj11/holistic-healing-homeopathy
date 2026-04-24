import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" style={{
      padding: '6rem',
      background: 'linear-gradient(135deg, #f5f0e8, #eaf2ea)',
      display: 'flex', gap: '5rem', alignItems: 'center'
    }}>
      {/* Image */}
      <div style={{ flex: 1, position: 'relative' }}>
        <div style={{
          width: '100%', aspectRatio: '4/5',
          background: 'linear-gradient(135deg, var(--sage-light), var(--sage-dark))',
          borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '8rem', boxShadow: '0 30px 80px rgba(74,122,80,0.3)'
        }}>
          👩‍⚕️
        </div>
        {/* Floating badge */}
        <div style={{
          position: 'absolute', bottom: '2rem', right: '-1rem',
          background: 'white', borderRadius: '16px',
          padding: '1rem 1.5rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
          fontFamily: 'Jost, sans-serif'
        }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-mid)', letterSpacing: '1px', textTransform: 'uppercase' }}>Experience</div>
          <div style={{ fontSize: '1.8rem', fontFamily: 'Cormorant Garamond, serif', color: 'var(--sage-dark)', fontWeight: 700 }}>15+ Years</div>
        </div>
        {/* Gold dot decoration */}
        <div style={{
          position: 'absolute', top: '2rem', left: '-1rem',
          background: 'var(--gold)', borderRadius: '50%',
          width: '60px', height: '60px',
          boxShadow: '0 8px 20px rgba(201,168,76,0.4)'
        }} />
      </div>

      {/* Text */}
      <div style={{ flex: 1.2 }}>
        <p style={{ color: 'var(--gold)', letterSpacing: '3px', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>About the Doctor</p>
        <h2 className="section-title">Dr. Arpana Raj</h2>
        <p style={{ fontFamily: 'Jost', fontSize: '1rem', color: 'var(--sage)', letterSpacing: '0.5px', marginBottom: '1.5rem' }}>
          BHMS, MD (Homeopathy) — Delhi Homeopathic Medical College
        </p>
        <p style={{ fontFamily: 'Jost', fontSize: '1rem', color: 'var(--text-mid)', lineHeight: 1.9, marginBottom: '1rem' }}>
          With over 15 years of dedicated practice, Dr. Arpana Raj has transformed thousands of lives through the gentle yet powerful science of homeopathy. Her approach combines classical homeopathic principles with a deep understanding of modern lifestyle diseases.
        </p>
        <p style={{ fontFamily: 'Jost', fontSize: '1rem', color: 'var(--text-mid)', lineHeight: 1.9, marginBottom: '2rem' }}>
          She believes that every patient is unique and deserves a personalized treatment plan that addresses not just physical symptoms but the complete mind-body connection.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {['Classical Homeopathy', 'Pediatrics', "Women's Health", 'Chronic Diseases'].map(tag => (
            <span key={tag} style={{
              background: 'rgba(122,158,126,0.15)',
              color: 'var(--sage-dark)', padding: '0.4rem 1rem',
              borderRadius: '20px', fontSize: '0.85rem',
              fontFamily: 'Jost', border: '1px solid var(--sage-light)'
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}