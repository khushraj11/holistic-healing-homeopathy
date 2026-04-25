import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PatientLogin() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isRegister) {
        const patients = JSON.parse(localStorage.getItem('registeredPatients') || '[]');
        const exists = patients.find(p => p.phone === form.phone);
        if (exists) { setError('Phone already registered!'); setLoading(false); return; }
        const newPatient = { ...form, id: Date.now() };
        patients.push(newPatient);
        localStorage.setItem('registeredPatients', JSON.stringify(patients));
        localStorage.setItem('currentPatient', JSON.stringify(newPatient));
      } else {
        const patients = JSON.parse(localStorage.getItem('registeredPatients') || '[]');
        const patient = patients.find(p => p.phone === form.phone && p.password === form.password);
        if (!patient) { setError('Invalid phone or password!'); setLoading(false); return; }
        localStorage.setItem('currentPatient', JSON.stringify(patient));
      }
      navigate('/patient-portal');
    } catch {
      setError('Something went wrong.');
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%', padding: '0.9rem 1.2rem',
    border: '1.5px solid rgba(122,158,126,0.3)',
    borderRadius: '12px', fontFamily: 'Jost, sans-serif',
    fontSize: '0.95rem', background: 'white',
    color: '#2c2c2c', outline: 'none', boxSizing: 'border-box'
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #e8f0e8, #faf7f0)',
      fontFamily: 'Jost, sans-serif', padding: '2rem'
    }}>
      <div style={{
        background: 'white', borderRadius: '24px',
        padding: '2.5rem', width: '100%', maxWidth: '460px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌿</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#4a7a50', fontWeight: 700 }}>
            Patient Portal
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem', marginTop: '0.3rem' }}>
            {isRegister ? 'Create your account' : 'Sign in to view your records'}
          </p>
        </div>

        {/* Toggle */}
        <div style={{ display: 'flex', background: '#f5f5f5', borderRadius: '12px', padding: '4px', marginBottom: '2rem' }}>
          {['Login', 'Register'].map((tab, i) => (
            <button key={tab} onClick={() => { setIsRegister(i === 1); setError(''); }}
              style={{
                flex: 1, padding: '0.6rem', border: 'none', cursor: 'pointer',
                borderRadius: '10px', fontFamily: 'Jost, sans-serif', fontSize: '0.9rem',
                background: isRegister === (i === 1) ? '#4a7a50' : 'transparent',
                color: isRegister === (i === 1) ? 'white' : '#666',
                transition: 'all 0.3s'
              }}>{tab}</button>
          ))}
        </div>

        <form onSubmit={submit}>
          {isRegister && (
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ fontSize: '0.82rem', color: '#4a7a50', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>Full Name</label>
              <input name="name" type="text" value={form.name} onChange={handle}
                placeholder="Your full name" required={isRegister} style={inputStyle} />
            </div>
          )}
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontSize: '0.82rem', color: '#4a7a50', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>Phone Number</label>
            <input name="phone" type="tel" value={form.phone} onChange={handle}
              placeholder="Registered phone number" required style={inputStyle} />
          </div>
          {isRegister && (
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ fontSize: '0.82rem', color: '#4a7a50', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>Email</label>
              <input name="email" type="email" value={form.email} onChange={handle}
                placeholder="your@email.com" style={inputStyle} />
            </div>
          )}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.82rem', color: '#4a7a50', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500, display: 'block', marginBottom: '0.4rem' }}>Password</label>
            <input name="password" type="password" value={form.password} onChange={handle}
              placeholder="••••••••" required style={inputStyle} />
          </div>

          {error && (
            <div style={{ background: 'rgba(255,100,100,0.1)', color: '#c0392b', padding: '0.8rem', borderRadius: '10px', fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'center' }}>
              ❌ {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '1rem', border: 'none',
            background: '#4a7a50', color: 'white', borderRadius: '12px',
            fontFamily: 'Jost, sans-serif', fontSize: '1rem', cursor: 'pointer'
          }}>
            {loading ? '⏳ Please wait...' : isRegister ? '🌿 Create Account' : '🌿 Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="/" style={{ color: '#7a9e7e', fontSize: '0.88rem', textDecoration: 'none' }}>← Home</a>
          <a href="/#appointment" style={{ color: '#c9a84c', fontSize: '0.88rem', textDecoration: 'none' }}>Book Appointment →</a>
        </div>
      </div>
    </div>
  );
}
