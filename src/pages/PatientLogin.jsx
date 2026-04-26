import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOTP } from '../utils/firebase';

export default function PatientLogin() {
  const [step, setStep] = useState('phone'); // phone → otp → name
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const generatePatientId = (phone) => `PAT_${phone}_${Date.now()}`;

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const confirmationResult = await sendOTP(phone);
      setConfirmation(confirmationResult);
      setStep('otp');
    } catch (err) {
      setError('Failed to send OTP. Check phone number and try again.');
      console.error(err);
      window.recaptchaVerifier = null;
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await confirmation.confirm(otp);

      // Check if existing patient
      const patients = JSON.parse(localStorage.getItem('registeredPatients') || '[]');
      const existing = patients.find(p => p.phone === phone || p.phone === `+91${phone}`);

      if (existing) {
        localStorage.setItem('currentPatient', JSON.stringify(existing));
        navigate('/patient-portal');
      } else {
        setIsNewUser(true);
        setStep('name');
      }
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    }
    setLoading(false);
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    const newPatient = {
      name,
      phone,
      email,
      password,
      patientId: generatePatientId(phone)
    };
    const patients = JSON.parse(localStorage.getItem('registeredPatients') || '[]');
    patients.push(newPatient);
    localStorage.setItem('registeredPatients', JSON.stringify(patients));
    localStorage.setItem('currentPatient', JSON.stringify(newPatient));
    navigate('/patient-portal');
  };

  const inputStyle = {
    width: '100%', padding: '0.9rem 1.2rem',
    border: '1.5px solid rgba(122,158,126,0.3)',
    borderRadius: '12px', fontFamily: 'Jost, sans-serif',
    fontSize: '0.95rem', background: 'white',
    color: '#2c2c2c', outline: 'none', boxSizing: 'border-box'
  };

  const labelStyle = {
    fontSize: '0.82rem', color: '#4a7a50',
    textTransform: 'uppercase', letterSpacing: '0.5px',
    fontWeight: 500, display: 'block', marginBottom: '0.4rem'
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #e8f0e8, #faf7f0)',
      fontFamily: 'Jost, sans-serif', padding: '2rem'
    }}>
      {/* Invisible reCAPTCHA */}
      <div id="recaptcha-container"></div>

      <div style={{
        background: 'white', borderRadius: '24px',
        padding: '2.5rem', width: '100%', maxWidth: '440px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌿</div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#4a7a50', fontWeight: 700 }}>
            Patient Portal
          </h1>
          <p style={{ color: '#888', fontSize: '0.88rem', marginTop: '0.4rem' }}>
            {step === 'phone' && 'Enter your phone number to continue'}
            {step === 'otp' && `OTP sent to +91 ${phone}`}
            {step === 'name' && 'Complete your profile'}
          </p>
        </div>

        {/* Steps indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          {['phone', 'otp', 'name'].map((s, i) => (
            <div key={s} style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: step === s ? '#4a7a50' : 
                         ((['phone','otp','name'].indexOf(step) > i) ? '#a8c5a0' : '#e0e0e0'),
              transition: 'all 0.3s'
            }} />
          ))}
        </div>

        {/* Step 1 — Phone */}
        {step === 'phone' && (
          <form onSubmit={handleSendOTP}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Phone Number</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{
                  padding: '0.9rem 1rem', background: '#f5f9f5',
                  border: '1.5px solid rgba(122,158,126,0.3)',
                  borderRadius: '12px', fontFamily: 'Jost',
                  fontSize: '0.95rem', color: '#4a7a50', whiteSpace: 'nowrap'
                }}>+91</div>
                <input
                  type="tel" value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit number" required
                  style={{ ...inputStyle, flex: 1 }}
                  onFocus={e => e.target.style.borderColor = '#7a9e7e'}
                  onBlur={e => e.target.style.borderColor = 'rgba(122,158,126,0.3)'}
                />
              </div>
            </div>

            {error && (
              <div style={{ background: 'rgba(255,100,100,0.1)', color: '#c0392b', padding: '0.8rem', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>
                ❌ {error}
              </div>
            )}

            <button type="submit" disabled={loading || phone.length !== 10} style={{
              width: '100%', padding: '1rem', border: 'none',
              background: phone.length === 10 ? '#4a7a50' : '#ccc',
              color: 'white', borderRadius: '12px',
              fontFamily: 'Jost', fontSize: '1rem', cursor: phone.length === 10 ? 'pointer' : 'not-allowed'
            }}>
              {loading ? '⏳ Sending OTP...' : '📱 Send OTP'}
            </button>
          </form>
        )}

        {/* Step 2 — OTP */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOTP}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Enter OTP</label>
              <input
                type="text" value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="6-digit OTP" required maxLength={6}
                style={{ ...inputStyle, textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.5rem' }}
                onFocus={e => e.target.style.borderColor = '#7a9e7e'}
                onBlur={e => e.target.style.borderColor = 'rgba(122,158,126,0.3)'}
              />
              <p style={{ fontSize: '0.8rem', color: '#aaa', textAlign: 'center', marginTop: '0.5rem' }}>
                OTP valid for 5 minutes
              </p>
            </div>

            {error && (
              <div style={{ background: 'rgba(255,100,100,0.1)', color: '#c0392b', padding: '0.8rem', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>
                ❌ {error}
              </div>
            )}

            <button type="submit" disabled={loading || otp.length !== 6} style={{
              width: '100%', padding: '1rem', border: 'none',
              background: otp.length === 6 ? '#4a7a50' : '#ccc',
              color: 'white', borderRadius: '12px',
              fontFamily: 'Jost', fontSize: '1rem', cursor: otp.length === 6 ? 'pointer' : 'not-allowed'
            }}>
              {loading ? '⏳ Verifying...' : '✅ Verify OTP'}
            </button>

            <button type="button" onClick={() => { setStep('phone'); setOtp(''); setError(''); window.recaptchaVerifier = null; }}
              style={{ width: '100%', padding: '0.7rem', border: 'none', background: 'none', color: '#7a9e7e', fontFamily: 'Jost', fontSize: '0.88rem', cursor: 'pointer', marginTop: '0.8rem' }}>
              ← Change Number
            </button>
          </form>
        )}

        {/* Step 3 — Name (New User) */}
        {step === 'name' && (
          <form onSubmit={handleCreateAccount}>
            <div style={{ background: 'rgba(74,122,80,0.08)', borderRadius: '10px', padding: '0.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: '#4a7a50' }}>✅ Phone verified: +91 {phone}</span>
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="Your full name" required style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#7a9e7e'}
                onBlur={e => e.target.style.borderColor = 'rgba(122,158,126,0.3)'} />
            </div>

            <div style={{ marginBottom: '1.2rem' }}>
              <label style={labelStyle}>Email (Optional)</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#7a9e7e'}
                onBlur={e => e.target.style.borderColor = 'rgba(122,158,126,0.3)'} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Set Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Create a password" required style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#7a9e7e'}
                onBlur={e => e.target.style.borderColor = 'rgba(122,158,126,0.3)'} />
            </div>

            <button type="submit" style={{
              width: '100%', padding: '1rem', border: 'none',
              background: '#4a7a50', color: 'white', borderRadius: '12px',
              fontFamily: 'Jost', fontSize: '1rem', cursor: 'pointer'
            }}>
              🌿 Create Account
            </button>
          </form>
        )}

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <a href="/" style={{ color: '#7a9e7e', fontSize: '0.85rem', textDecoration: 'none' }}>← Back to Home</a>
        </div>
      </div>
    </div>
  );
}
