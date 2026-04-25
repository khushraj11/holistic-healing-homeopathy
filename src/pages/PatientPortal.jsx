import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPatientRecords } from '../utils/sheetApi';

export default function PatientPortal() {
  const [patient, setPatient] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const p = localStorage.getItem('currentPatient');
    if (!p) { navigate('/patient-login'); return; }
    const parsed = JSON.parse(p);
    setPatient(parsed);
    loadRecords(parsed.phone);
  }, [navigate]);

  const loadRecords = async (phone) => {
    setLoading(true);
    try {
      const res = await fetchPatientRecords(phone);
      setRecords(res.data || []);
    } catch { setRecords([]); }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('currentPatient');
    navigate('/');
  };

  if (!patient) return null;

  const completed = records.filter(r => r.status === 'Completed').length;
  const hasRecords = records.some(r => r.diagnosis || r.medication || r.notes);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e8f0e8, #faf7f0)', fontFamily: 'Jost, sans-serif' }}>

      {/* Header */}
      <div style={{
        background: '#4a7a50', color: 'white',
        padding: '1.2rem 1.5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1rem'
      }}>
        <div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 700 }}>🌿 Patient Portal</div>
          <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>Holistic Healing Homeopathy — Dr. Arpana Raj</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.88rem', opacity: 0.9 }}>👤 {patient.name}</span>
          <button onClick={logout} style={{
            background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)',
            color: 'white', padding: '0.4rem 1rem', borderRadius: '20px',
            cursor: 'pointer', fontFamily: 'Jost', fontSize: '0.82rem'
          }}>Logout</button>
        </div>
      </div>

      <div style={{ padding: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>

        {/* Welcome */}
        <div style={{
          background: 'white', borderRadius: '16px', padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.07)', marginBottom: '1.5rem',
          display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap'
        }}>
          <div style={{
            width: '55px', height: '55px', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #7a9e7e, #4a7a50)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'
          }}>👤</div>
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#4a7a50', marginBottom: '0.2rem' }}>
              Welcome, {patient.name}!
            </h2>
            <p style={{ color: '#888', fontSize: '0.88rem' }}>
              📞 {patient.phone} {patient.email && `• ${patient.email}`}
            </p>
          </div>
          <button onClick={() => loadRecords(patient.phone)} style={{
            marginLeft: 'auto', background: 'rgba(74,122,80,0.1)',
            border: '1px solid rgba(74,122,80,0.3)', color: '#4a7a50',
            padding: '0.5rem 1rem', borderRadius: '20px',
            cursor: 'pointer', fontFamily: 'Jost', fontSize: '0.82rem'
          }}>🔄 Refresh</button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            ['📋', 'Total Visits', records.length],
            ['✅', 'Completed', completed],
            ['⏳', 'Pending', records.length - completed],
          ].map(([icon, label, val]) => (
            <div key={label} style={{
              background: 'white', borderRadius: '14px', padding: '1.2rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.06)', textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{icon}</div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#4a7a50', fontWeight: 700 }}>{val}</div>
              <div style={{ fontSize: '0.78rem', color: '#999' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Book Appointment Button */}
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <a href="/#appointment" style={{
            background: '#4a7a50', color: 'white',
            padding: '0.8rem 2rem', borderRadius: '30px',
            textDecoration: 'none', fontFamily: 'Jost', fontSize: '0.95rem',
            display: 'inline-block'
          }}>🌿 Book New Appointment</a>
        </div>

        {/* Records */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#4a7a50', marginBottom: '1.5rem' }}>
            💊 My Appointments & Records
          </h3>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#aaa' }}>⏳ Loading your records...</div>
          ) : records.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#aaa', background: '#f9f9f9', borderRadius: '12px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
              <p style={{ marginBottom: '0.5rem' }}>No appointments found for your phone number.</p>
              <p style={{ fontSize: '0.85rem' }}>Make sure you used the same phone number when booking.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {records.map((rec, i) => (
                <div key={i} style={{
                  border: '1.5px solid rgba(122,158,126,0.2)',
                  borderRadius: '14px', padding: '1.2rem',
                  background: rec.diagnosis ? 'linear-gradient(135deg, #f9fdf9, #fff)' : '#fafafa'
                }}>
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{
                      background: 'rgba(122,158,126,0.15)', color: '#4a7a50',
                      padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 500
                    }}>Visit #{i + 1}</span>
                    <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ color: '#aaa', fontSize: '0.8rem' }}>📅 {rec.date} {rec.time && `@ ${rec.time}`}</span>
                      <span style={{
                        background: rec.status === 'Completed' ? 'rgba(46,125,50,0.1)' : rec.status === 'Confirmed' ? 'rgba(74,122,80,0.1)' : 'rgba(201,168,76,0.15)',
                        color: rec.status === 'Completed' ? '#2e7d32' : rec.status === 'Confirmed' ? '#4a7a50' : '#c9a84c',
                        padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 500
                      }}>{rec.status || 'Pending'}</span>
                    </div>
                  </div>

                  {/* Symptoms always show */}
                  <div style={{ padding: '0.8rem', background: '#f5f9f5', borderRadius: '10px', marginBottom: '0.8rem' }}>
                    <div style={{ fontSize: '0.75rem', color: '#7a9e7e', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' }}>🤒 Symptoms</div>
                    <div style={{ fontSize: '0.9rem', color: '#2c2c2c', lineHeight: 1.6 }}>{rec.symptoms || '—'}</div>
                  </div>

                  {/* Doctor Records — only if doctor has filled */}
                  {(rec.diagnosis || rec.medication || rec.notes) ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.8rem' }}>
                      {[
                        ['🔍 Diagnosis', rec.diagnosis],
                        ['💊 Medication', rec.medication],
                        ['📝 Doctor\'s Notes', rec.notes],
                      ].map(([label, val]) => val && (
                        <div key={label} style={{ padding: '0.8rem', background: '#f0f9f0', borderRadius: '10px', border: '1px solid rgba(74,122,80,0.15)' }}>
                          <div style={{ fontSize: '0.75rem', color: '#7a9e7e', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' }}>{label}</div>
                          <div style={{ fontSize: '0.9rem', color: '#2c2c2c', lineHeight: 1.6 }}>{val}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ padding: '0.8rem', background: '#fff9f0', borderRadius: '10px', border: '1px solid rgba(201,168,76,0.2)', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: '#c9a84c' }}>⏳ Doctor's prescription will appear here after your consultation</span>
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
