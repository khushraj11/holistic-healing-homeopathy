import React, { useState, useEffect } from 'react';
import { submitAppointment } from '../../utils/sheetApi';
import { sendConfirmationEmail } from '../../utils/emailService';

export default function AppointmentForm() {
  const [form, setForm] = useState({ name: '', age: '', phone: '', email: '', symptoms: '', date: '', time: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedInPatient, setLoggedInPatient] = useState(null);

  useEffect(() => {
    const p = localStorage.getItem('currentPatient');
    if (p) {
      const parsed = JSON.parse(p);
      setLoggedInPatient(parsed);
      setForm(f => ({
        ...f,
        name: parsed.name || '',
        phone: parsed.phone || '',
        email: parsed.email || '',
      }));
    }
  }, []);

  const handle = (e) => {
    if (loggedInPatient && (e.target.name === 'phone' || e.target.name === 'name')) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      await submitAppointment({
        ...form,
        patientId: loggedInPatient?.patientId || '',
      });
      if (form.email) await sendConfirmationEmail(form);
      setStatus('success');
      setForm(f => ({
        name: loggedInPatient?.name || '',
        phone: loggedInPatient?.phone || '',
        email: loggedInPatient?.email || '',
        age: '', symptoms: '', date: '', time: ''
      }));
    } catch {
      setStatus('error');
    }
    setLoading(false);
  };

  const inputStyle = (locked) => ({
    width: '100%', padding: '0.9rem 1.2rem',
    border: `1.5px solid ${locked ? 'rgba(74,122,80,0.5)' : 'rgba(122,158,126,0.3)'}`,
    borderRadius: '12px', fontFamily: 'Jost, sans-serif',
    fontSize: '0.95rem',
    background: locked ? 'rgba(74,122,80,0.05)' : 'white',
    color: 'var(--text-dark)', outline: 'none',
    transition: 'border-color 0.3s', boxSizing: 'border-box',
    cursor: locked ? 'not-allowed' : 'text'
  });

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

      {/* Not logged in banner */}
      {!loggedInPatient && (
        <div style={{
          maxWidth: '750px', margin: '0 auto 1.5rem',
          background: 'rgba(201,168,76,0.08)',
          border: '1.5px solid rgba(201,168,76,0.25)',
          borderRadius: '12px', padding: '1rem 1.5rem',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'
        }}>
          <div style={{ fontFamily: 'Jost', fontSize: '0.88rem', color: '#7a6010' }}>
            💡 <strong>Create an account</strong> to track your appointment history and view prescriptions online.
          </div>
          <a href="/patient-login" style={{
            background: 'var(--gold)', color: 'white',
            padding: '0.5rem 1.2rem', borderRadius: '20px',
            textDecoration: 'none', fontFamily: 'Jost',
            fontSize: '0.85rem', whiteSpace: 'nowrap'
          }}>Login / Register</a>
        </div>
      )}

      {/* Logged in banner */}
      {loggedInPatient && (
        <div style={{
          maxWidth: '750px', margin: '0 auto 1.5rem',
          background: 'rgba(74,122,80,0.08)',
          border: '1.5px solid rgba(74,122,80,0.25)',
          borderRadius: '12px', padding: '1rem 1.5rem',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'
        }}>
          <div style={{ fontFamily: 'Jost', fontSize: '0.88rem', color: '#4a7a50' }}>
            ✅ Booking as <strong>{loggedInPatient.name}</strong> — your appointment will be saved to your portal automatically.
          </div>
          <a href="/patient-portal" style={{
            background: '#4a7a50', color: 'white',
            padding: '0.5rem 1.2rem', borderRadius: '20px',
            textDecoration: 'none', fontFamily: 'Jost',
            fontSize: '0.85rem', whiteSpace: 'nowrap'
          }}>My Portal →</a>
        </div>
      )}

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
              { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your full name', locked: !!loggedInPatient },
              { label: 'Age', name: 'age', type: 'number', placeholder: 'Your age', locked: false },
              { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+91 XXXXX XXXXX', locked: !!loggedInPatient },
              { label: 'Email Address', name: 'email', type: 'email', placeholder: 'your@email.com', locked: false },
              { label: 'Preferred Date', name: 'date', type: 'date', placeholder: '', locked: false },
              { label: 'Preferred Time', name: 'time', type: 'time', placeholder: '', locked: false },
            ].map(({ label, name, type, placeholder, locked }) => (
              <div key={name}>
                <label style={{
                  fontFamily: 'Jost', fontSize: '0.82rem',
                  color: locked ? '#4a7a50' : 'var(--sage-dark)',
                  textTransform: 'uppercase', letterSpacing: '0.5px',
                  marginBottom: '0.4rem', display: 'block', fontWeight: 500
                }}>
                  {label} {locked && '🔒'}
                </label>
                <input
                  type={type} name={name} value={form[name]}
                  onChange={handle} placeholder={placeholder}
                  required={name !== 'email'} readOnly={locked}
                  style={inputStyle(locked)}
                  onFocus={e => { if (!locked) e.target.style.borderColor = 'var(--sage)'; }}
                  onBlur={e => { if (!locked) e.target.style.borderColor = 'rgba(122,158,126,0.3)'; }}
                />
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              fontFamily: 'Jost', fontSize: '0.82rem', color: 'var(--sage-dark)',
              textTransform: 'uppercase', letterSpacing: '0.5px',
              marginBottom: '0.4rem', display: 'block', fontWeight: 500
            }}>Symptoms / Reason for Visit</label>
            <textarea
              name="symptoms" value={form.symptoms} onChange={handle}
              placeholder="Please describe your symptoms or reason for consultation..."
              required rows={4}
              style={{ ...inputStyle(false), resize: 'vertical' }}
              onFocus={e => e.target.style.borderColor = 'var(--sage)'}
              onBlur={e => e.target.style.borderColor = 'rgba(122,158,126,0.3)'}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary"
            style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}>
            {loading ? '⏳ Booking your appointment...' : '🌿 Book Appointment'}
          </button>

          {status === 'success' && (
            <div style={{
              marginTop: '1rem', padding: '1rem',
              background: 'rgba(122,158,126,0.1)', borderRadius: '12px',
              color: 'var(--sage-dark)', fontFamily: 'Jost', textAlign: 'center'
            }}>
              ✅ Appointment booked successfully! {form.email && 'A confirmation email has been sent.'} We will confirm your slot within 24 hours.
            </div>
          )}
          {status === 'error' && (
            <div style={{
              marginTop: '1rem', padding: '1rem',
              background: 'rgba(255,100,100,0.1)', borderRadius: '12px',
              color: '#c0392b', fontFamily: 'Jost', textAlign: 'center'
            }}>
              ❌ Something went wrong. Please call us directly to book your appointment.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
