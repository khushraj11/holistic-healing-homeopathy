import React from 'react';
import Navbar from '../components/ui/Navbar';
import HeroScene from '../components/3d/HeroScene';
import AboutSection from '../components/ui/AboutSection';
import ServiceCard from '../components/ui/ServiceCard';
import AppointmentForm from '../components/ui/AppointmentForm';
import Footer from '../components/ui/Footer';

export default function Home() {
  const services = [
    { icon: '🌿', title: 'Classical Homeopathy', desc: 'Individualized treatment based on complete case analysis using constitutional remedies.' },
    { icon: '🧠', title: 'Mind-Body Healing', desc: 'Holistic approach addressing mental, emotional and physical symptoms together.' },
    { icon: '👶', title: 'Pediatric Care', desc: 'Gentle, safe homeopathic treatment for infants, children and adolescents.' },
    { icon: '🌸', title: "Women's Health", desc: 'Specialized care for hormonal issues, PCOS, pregnancy support and menopause.' },
    { icon: '🦴', title: 'Chronic Diseases', desc: 'Long-term management of arthritis, asthma, skin disorders and autoimmune conditions.' },
    { icon: '💆', title: 'Stress & Anxiety', desc: 'Natural remedies for stress, anxiety, depression and sleep disorders.' },
  ];

  return (
    <div>
      <Navbar />

      {/* HERO */}
      <section id="home" style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        background: 'linear-gradient(135deg, #faf7f0 0%, #e8f0e8 50%, #faf7f0 100%)',
        position: 'relative', overflow: 'hidden',
        paddingTop: '80px'
      }}>
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', flex: 1,
        }}>
          {/* 3D Scene */}
          <div style={{ width: '100%', height: '300px', position: 'relative' }}>
            <HeroScene />
          </div>

          {/* Text */}
          <div style={{ padding: '2rem 1.5rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.85rem', color: 'var(--gold)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Natural • Holistic • Healing
            </p>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', lineHeight: 1.1, color: 'var(--sage-dark)', marginBottom: '1.2rem', fontWeight: 700 }}>
              Heal Naturally,<br />
              <span style={{ color: 'var(--gold)' }}>Live Fully</span>
            </h1>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '1rem', color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Experience the gentle power of homeopathy with Dr. Arpana Raj. Personalized care that treats the root cause, not just the symptoms.
            </p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#appointment" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
                Book Free Consultation
              </a>
              <a href="#about" style={{ color: 'var(--sage-dark)', fontFamily: 'Jost, sans-serif', fontSize: '0.95rem', textDecoration: 'none' }}>
                Learn More →
              </a>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {[['15+', 'Years Experience'], ['5000+', 'Patients Healed'], ['98%', 'Satisfaction Rate']].map(([num, label]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: 'var(--sage-dark)', fontWeight: 700 }}>{num}</div>
                  <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.78rem', color: 'var(--text-mid)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <AboutSection />

      {/* SERVICES */}
      <section id="services" style={{ padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 6rem)', background: 'var(--ivory)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: 'var(--gold)', letterSpacing: '3px', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>What We Offer</p>
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Comprehensive homeopathic care for every stage of life</p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {services.map((s, i) => <ServiceCard key={i} {...s} />)}
        </div>
      </section>

      {/* APPOINTMENT */}
      <AppointmentForm />

      {/* CONTACT */}
      <section id="contact" style={{
        padding: 'clamp(3rem, 8vw, 5rem) clamp(1.5rem, 5vw, 6rem)',
        background: 'linear-gradient(135deg, #f0ebe0, #e8f0e8)',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ color: 'var(--gold)', letterSpacing: '3px', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem', textAlign: 'center' }}>Find Us</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Contact Us</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
            {[
              ['📍', 'Address', '123 Healing Street, Green Park, New Delhi - 110016'],
              ['📞', 'Phone', '+91 98765 43210'],
              ['📧', 'Email', 'drarpana@holistichealing.com'],
              ['🕐', 'Hours', 'Mon–Sat: 9am–7pm | Sun: 10am–2pm'],
            ].map(([icon, label, val]) => (
              <div key={label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.3rem' }}>{icon}</span>
                <div>
                  <div style={{ fontFamily: 'Jost', fontWeight: 500, color: 'var(--sage-dark)', fontSize: '0.85rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{label}</div>
                  <div style={{ fontFamily: 'Jost', color: 'var(--text-mid)', fontSize: '0.95rem', marginTop: '0.2rem' }}>{val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
