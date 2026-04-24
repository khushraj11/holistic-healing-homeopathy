import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (form.email === 'drarpana@clinic.com' && form.password === 'Arpana@2025') {
      localStorage.setItem('doctorAuth', 'true');
      navigate('/dashboard');
    } else {
      setError('Invalid credentials!');
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%', padding: '0.9rem 1.2rem',
    border: '1.5px solid rgba(122,158,126,0.3)',
    borderRadius: '12px', fontFamily: 'Jost, sans-serif',
    fontSize: '0.95rem', background: 'white',
    outline: 'none', marginTop: '0.4rem',
    color: '#2c2c2c', transition: 'border-color 0.3s'
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #2c3e2d, #4a7a50)',
      fontFamily: 'Jost, sans-serif', padding: '2rem'
    }}>
      <div style={{
        background: 'white', borderRadius: '24px',
        padding: '3rem', width: '100%', maxWidth: '420px',
        boxShadow: '0 40px 100px rgba(0,0,0,0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🩺</div>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '2rem', color: '#4a7a50', fontWeight: 700
          }}>Dr. Arpana Raj</h1>
          <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.3rem' }}>
            Doctor Login — Clinic Dashboard
          </p>
        </div>

        <form onSubmit={submit}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontSize: '0.82rem', color: '#4a7a50', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>Email</label>
            <input type="email" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="drarpana@clinic.com" required style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#7a9e7e'}
              onBlur={e => e.target.style.borderColor = 'rgba(122,158,126,0.3)'} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.82rem', color: '#4a7a50', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>Password</label>
            <input type="password" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••" required style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#7a9e7e'}
              onBlur={e => e.target.style.borderColor = 'rgba(122,158,126,0.3)'} />
          </div>

          {error && (
            <div style={{ background: 'rgba(255,100,100,0.1)', color: '#c0392b', padding: '0.8rem', borderRadius: '10px', fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'center' }}>
              ❌ {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '1rem', background: '#4a7a50',
            color: 'white', border: 'none', borderRadius: '12px',
            fontFamily: 'Jost', fontSize: '1rem', cursor: 'pointer',
            transition: 'all 0.3s'
          }}>
            {loading ? '⏳ Logging in...' : '🩺 Login to Dashboard'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <a href="/" style={{ color: '#7a9e7e', fontSize: '0.85rem', textDecoration: 'none' }}>
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}