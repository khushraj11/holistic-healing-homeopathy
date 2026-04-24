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
        height: '100vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #faf7f0 0%, #e8f0e8 50%, #faf7f0 100%)',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(122,158,126,0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-50px', left: '-50px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Left text */}
        <div style={{ flex: 1, padding: '0 4rem 0 6rem', zIndex: 2 }}>
          <p style={{
            fontFamily: 'Jost, sans-serif', fontSize: '0.9rem',
            color: 'var(--gold)', letterSpacing: '3px', textTransform: 'uppercase',
            marginBottom: '1rem'
          }}>Natural • Holistic • Healing</p>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '4.5rem', lineHeight: 1.1,
            color: 'var(--sage-dark)', marginBottom: '1.5rem', fontWeight: 700
          }}>
            Heal Naturally,<br />
            <span style={{ color: 'var(--gold)' }}>Live Fully</span>
          </h1>
          <p style={{
            fontFamily: 'Jost, sans-serif', fontSize: '1.05rem',
            color: 'var(--text-mid)', lineHeight: 1.8,
            maxWidth: '480px', marginBottom: '2.5rem'
          }}>
            Experience the gentle power of homeopathy with Dr. Arpana Raj.
            Personalized care that treats the root cause, not just the symptoms.
          </p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href="#appointment" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Book Free Consultation
            </a>
            <a href="#about" style={{
              color: 'var(--sage-dark)', fontFamily: 'Jost, sans-serif',
              fontSize: '0.95rem', textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}>
              Learn More <span>→</span>
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '3rem', marginTop: '3rem' }}>
            {[['15+', 'Years Experience'], ['5000+', 'Patients Healed'], ['98%', 'Satisfaction Rate']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: 'var(--sage-dark)', fontWeight: 700 }}>{num}</div>
                <div style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.8rem', color: 'var(--text-mid)', letterSpacing: '0.5px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 3D */}
        <div style={{ flex: 1, height: '100vh', position: 'relative' }}>
          <HeroScene />
        </div>
      </section>

      {/* ABOUT */}
      <AboutSection />

      {/* SERVICES */}
      <section id="services" style={{
        padding: '6rem 6rem',
        background: 'var(--ivory)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ color: 'var(--gold)', letterSpacing: '3px', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>What We Offer</p>
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Comprehensive homeopathic care for every stage of life</p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem'
        }}>
          {services.map((s, i) => <ServiceCard key={i} {...s} />)}
        </div>
      </section>

      {/* APPOINTMENT */}
      <AppointmentForm />

      {/* CONTACT */}
      <section id="contact" style={{
        padding: '5rem 6rem',
        background: 'linear-gradient(135deg, #f0ebe0, #e8f0e8)',
        display: 'flex', gap: '4rem', alignItems: 'flex-start'
      }}>
        <div style={{ flex: 1 }}>
          <p style={{ color: 'var(--gold)', letterSpacing: '3px', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Find Us</p>
          <h2 className="section-title">Contact Us</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
            {[
              ['📍', 'Address', '123 Healing Street, Green Park, New Delhi - 110016'],
              ['📞', 'Phone', '+91 98765 43210'],
              ['📧', 'Email', 'drarpana@homeopathyclinic.com'],
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
        <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', height: '350px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
          <iframe
            title="Clinic Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0!2d77.2!3d28.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzAwLjAiTiA3N8KwMTInMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}