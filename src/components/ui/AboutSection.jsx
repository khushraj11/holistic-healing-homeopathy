import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" style={{
      padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 6rem)',
      background: 'linear-gradient(135deg, #f5f0e8, #eaf2ea)',
    }}>
      {/* Image */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          width: '180px', height: '180px', margin: '0 auto',
          background: 'linear-gradient(135deg, var(--sage-light), var(--sage-dark))',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '5rem', boxShadow: '0 20px 60px rgba(74,122,80,0.3)'
        }}>👩‍⚕️</div>
      </div>

      {/* Text */}
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ color: 'var(--gold)', letterSpacing: '3px', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>About the Doctor</p>
        <h2 className="section-title">Dr. Arpana Raj</h2>
        <p style={{ fontFamily: 'Jost', fontSize: '1rem', color: 'var(--sage)', letterSpacing: '0.5px', marginBottom: '1.5rem' }}>
          BHMS, MD (Homeopathy)
        </p>
        <p style={{ fontFamily: 'Jost', fontSize: '1rem', color: 'var(--text-mid)', lineHeight: 1.9, marginBottom: '1rem' }}>
          With over 15 years of dedicated practice, Dr. Arpana Raj has transformed thousands of lives through the gentle yet powerful science of homeopathy. Her approach combines classical homeopathic principles with a deep understanding of modern lifestyle diseases.
        </p>
        <p style={{ fontFamily: 'Jost', fontSize: '1rem', color: 'var(--text-mid)', lineHeight: 1.9, marginBottom: '2rem' }}>
          She believes that every patient is unique and deserves a personalized treatment plan that addresses not just physical symptoms but the complete mind-body connection.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Classical Homeopathy', 'Pediatrics', "Women's Health", 'Chronic Diseases'].map(tag => (
            <span key={tag} style={{
              background: 'rgba(122,158,126,0.15)', color: 'var(--sage-dark)',
              padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem',
              fontFamily: 'Jost', border: '1px solid var(--sage-light)'
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
