import React, { useState } from 'react';
import { submitAppointment } from '../../utils/sheetApi';

export default function AppointmentForm() {
  const [form, setForm] = useState({ name: '', age: '', phone: '', email: '', symptoms: '', date: '', time: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      await submitAppointment(form);
      setStatus('success');
      setForm({ name: '', age: '', phone: '', email: '', symptoms: '', date: '', time: '' });
    } catch {
      setStatus('error');
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%', padding: '0.9rem 1.2rem',
    border: '1.5px solid rgba(122,158,126,0.3)',
    borderRadius: '12px', fontFamily: 'Jost, sans-serif',
    fontSize: '0.95rem', background: 'white',
    color: 'var(--text-dark)', outline: 'none',
    transition: 'border-color 0.3s', boxSizing: 'border-box'
  };

  return (
    <section id="appointment" style={{
      padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 6rem)',
      background: 'linear-gradient(135deg, #e8f0e8, #faf7f0)',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{ color: 'var(--gold)', letterSpacing: '3px', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Get Started</p>
        <h2 className="section-title">Book an Appointment</h2>
        <p className="section-subtitle">Fill in your details and we'll confirm your slot within 24 hours</p>
      </div>

      <div style={{
        maxWidth: '750px', margin: '0 auto',
        background: 'white', borderRadius: '24px',
        padding: 'clamp(1.5rem, 5vw, 3rem)',
        boxShadow: '0 20px 80px rgba(0,0,0,0.08)'
      }}>
        <form onSubmit={submit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.2rem', marginBottom: '1.2rem'
          }}>
            {[
              { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your full name' },
              { label: 'Age', name: 'age', type: 'number', placeholder: 'Your age' },
              { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
              { label: 'Email Address', name: 'email', type: 'email', placeholder: 'your@email.com' },
              { label: 'Preferred Date', name: 'date', type: 'date', placeholder: '' },
              { label: 'Preferred Time', name: 'time', type: 'time', placeholder: '' },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label style={{ fontFamily: 'Jost', fontSize: '0.82rem', color: 'var(--sage-dark)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem', display: 'block', fontWeight: 500 }}>{label}</label>
                <input type={type} name={name} value={form[name]} onChange={handle}
                  placeholder={placeholder} required style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--sage)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(122,158,126,0.3)'} />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ fontFamily: 'Jost', fontSize: '0.82rem', color: 'var(--sage-dark)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem', display: 'block', fontWeight: 500 }}>Symptoms / Reason for Visit</label>
            <textarea name="symptoms" value={form.symptoms} onChange={handle}
              placeholder="Describe your symptoms..." required rows={4}
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={e => e.target.style.borderColor = 'var(--sage)'}
              onBlur={e => e.target.style.borderColor = 'rgba(122,158,126,0.3)'} />
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}>
            {loading ? '⏳ Booking...' : '🌿 Book Appointment'}
          </button>

          {status === 'success' && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(122,158,126,0.1)', borderRadius: '12px', color: 'var(--sage-dark)', fontFamily: 'Jost', textAlign: 'center' }}>
              ✅ Appointment booked! We'll confirm within 24 hours.
            </div>
          )}
          {status === 'error' && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,100,100,0.1)', borderRadius: '12px', color: '#c0392b', fontFamily: 'Jost', textAlign: 'center' }}>
              ❌ Something went wrong. Please call us directly.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
