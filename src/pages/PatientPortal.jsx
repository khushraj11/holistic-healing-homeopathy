import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPatientRecords, submitAppointment } from '../utils/sheetApi';

export default function PatientPortal() {
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [form, setForm] = useState({ symptoms: '', date: '', time: '' });
  const [booking, setBooking] = useState(false);
  const [bookStatus, setBookStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const p = localStorage.getItem('currentPatient');
    if (!p) { navigate('/patient-login'); return; }
    const parsed = JSON.parse(p);
    setPatient(parsed);
    loadRecords(parsed.patientId);
  }, [navigate]);

  const loadRecords = async (patientId) => {
    if (!patientId) { setLoading(false); return; }
    setLoading(true);
    try {
      const res = await fetchPatientRecords(patientId);
      setRecords(res.data || []);
    } catch { setRecords([]); }
    setLoading(false);
  };

  const bookAppointment = async (e) => {
    e.preventDefault();
    setBooking(true);
    setBookStatus('');
    try {
      await submitAppointment({
        name: patient.name,
        phone: patient.phone,
        email: patient.email || '',
        age: patient.age || '',
        symptoms: form.symptoms,
        date: form.date,
        time: form.time,
        patientId: patient.patientId,
      });
      setBookStatus('success');
      setForm({ symptoms: '', date: '', time: '' });
      setTimeout(() => {
        setShowBooking(false);
        setBookStatus('');
        loadRecords(patient.patientId);
      }, 2000);
    } catch { setBookStatus('error'); }
    setBooking(false);
  };

  const logout = () => {
    localStorage.removeItem('currentPatient');
    navigate('/');
  };

  if (!patient) return null;
  const completed = records.filter(r => r.status === 'Completed').length;

  const inputStyle = {
    width: '100%', padding: '0.8rem 1rem',
    border: '1.5px solid rgba(122,158,126,0.3)',
    borderRadius: '10px', fontFamily: 'Jost, sans-serif',
    fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box'
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e8f0e8, #faf7f0)', fontFamily: 'Jost, sans-serif' }}>
      <div style={{ background: '#4a7a50', color: 'white', padding: '1.2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 700 }}>🌿 Patient Portal</div>
          <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>Holistic Healing Homeopathy — Dr. Arpana Raj</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.88rem', opacity: 0.9 }}>👤 {patient.name}</span>
          <button onClick={logout} style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', color: 'white', padding: '0.4rem 1rem', borderRadius: '20px', cursor: 'pointer', fontFamily: 'Jost', fontSize: '0.82rem' }}>Logout</button>
        </div>
      </div>

      <div style={{ padding: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>

        {/* Welcome */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ width: '55px', height: '55px', borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg, #7a9e7e, #4a7a50)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>👤</div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#4a7a50', marginBottom: '0.2rem' }}>Welcome, {patient.name}!</h2>
            <p style={{ color: '#888', fontSize: '0.85rem' }}>📞 {patient.phone} • ID: {patient.patientId?.substring(0, 15)}...</p>
          </div>
          <button onClick={() => loadRecords(patient.patientId)} style={{ background: 'rgba(74,122,80,0.1)', border: '1px solid rgba(74,122,80,0.3)', color: '#4a7a50', padding: '0.5rem 1rem', borderRadius: '20px', cursor: 'pointer', fontFamily: 'Jost', fontSize: '0.82rem' }}>🔄 Refresh</button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[['📋', 'Total Visits', records.length], ['✅', 'Completed', completed], ['⏳', 'Pending', records.length - completed]].map(([icon, label, val]) => (
            <div key={label} style={{ background: 'white', borderRadius: '14px', padding: '1.2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{icon}</div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#4a7a50', fontWeight: 700 }}>{val}</div>
              <div style={{ fontSize: '0.78rem', color: '#999' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Book Appointment */}
        <div style={{ marginBottom: '1.5rem' }}>
          <button onClick={() => setShowBooking(!showBooking)} style={{ background: '#4a7a50', color: 'white', padding: '0.8rem 2rem', borderRadius: '30px', border: 'none', fontFamily: 'Jost', fontSize: '0.95rem', cursor: 'pointer', width: '100%' }}>
            {showBooking ? '✕ Cancel' : '🌿 Book New Appointment'}
          </button>

          {showBooking && (
            <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', marginTop: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: '#4a7a50', marginBottom: '1.2rem' }}>📅 New Appointment</h3>
              <form onSubmit={bookAppointment}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#4a7a50', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '0.4rem' }}>Date</label>
                    <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#4a7a50', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '0.4rem' }}>Time</label>
                    <input type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} required style={inputStyle} />
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', color: '#4a7a50', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '0.4rem' }}>Symptoms</label>
                  <textarea value={form.symptoms} onChange={e => setForm({...form, symptoms: e.target.value})} placeholder="Describe your symptoms..." required rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
                <button type="submit" disabled={booking} style={{ width: '100%', padding: '0.9rem', background: '#4a7a50', color: 'white', border: 'none', borderRadius: '12px', fontFamily: 'Jost', fontSize: '0.95rem', cursor: 'pointer' }}>
                  {booking ? '⏳ Booking...' : '✅ Confirm Appointment'}
                </button>
                {bookStatus === 'success' && (
                  <div style={{ marginTop: '0.8rem', padding: '0.8rem', background: 'rgba(74,122,80,0.1)', borderRadius: '10px', color: '#4a7a50', textAlign: 'center', fontSize: '0.9rem' }}>
                    ✅ Appointment booked!
                  </div>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Records */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#4a7a50', marginBottom: '1.5rem' }}>💊 My Appointments & Records</h3>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#aaa' }}>⏳ Loading...</div>
          ) : records.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#aaa', background: '#f9f9f9', borderRadius: '12px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📋</div>
              <p>No appointments yet. Book one above!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {records.map((rec, i) => (
                <div key={i} style={{ border: '1.5px solid rgba(122,158,126,0.2)', borderRadius: '14px', padding: '1.2rem', background: rec.diagnosis ? '#f9fdf9' : '#fafafa' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ background: 'rgba(122,158,126,0.15)', color: '#4a7a50', padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 500 }}>Visit #{i + 1}</span>
                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ color: '#aaa', fontSize: '0.8rem' }}>📅 {rec.date} {rec.time && `@ ${rec.time}`}</span>
                      <span style={{
                        background: rec.status === 'Completed' ? 'rgba(46,125,50,0.1)' : rec.status === 'Confirmed' ? 'rgba(74,122,80,0.1)' : 'rgba(201,168,76,0.15)',
                        color: rec.status === 'Completed' ? '#2e7d32' : rec.status === 'Confirmed' ? '#4a7a50' : '#c9a84c',
                        padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 500
                      }}>{rec.status || 'Pending'}</span>
                    </div>
                  </div>

                  <div style={{ padding: '0.8rem', background: '#f5f9f5', borderRadius: '10px', marginBottom: '0.8rem' }}>
                    <div style={{ fontSize: '0.72rem', color: '#7a9e7e', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' }}>🤒 Symptoms</div>
                    <div style={{ fontSize: '0.9rem', color: '#2c2c2c', lineHeight: 1.6 }}>{rec.symptoms || '—'}</div>
                  </div>

                  {(rec.diagnosis || rec.medication || rec.notes) ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.8rem' }}>
                      {[['🔍 Diagnosis', rec.diagnosis], ['💊 Medication', rec.medication], ["📝 Doctor's Notes", rec.notes]].map(([label, val]) => val ? (
                        <div key={label} style={{ padding: '0.8rem', background: '#f0f9f0', borderRadius: '10px', border: '1px solid rgba(74,122,80,0.15)' }}>
                          <div style={{ fontSize: '0.72rem', color: '#7a9e7e', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' }}>{label}</div>
                          <div style={{ fontSize: '0.88rem', color: '#2c2c2c', lineHeight: 1.6 }}>{val}</div>
                        </div>
                      ) : null)}
                    </div>
                  ) : (
                    <div style={{ padding: '0.7rem', background: '#fff9f0', borderRadius: '10px', border: '1px solid rgba(201,168,76,0.2)', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.82rem', color: '#c9a84c' }}>⏳ Prescription will appear after consultation</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
