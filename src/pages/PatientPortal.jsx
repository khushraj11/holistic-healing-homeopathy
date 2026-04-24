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
  }, []);

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

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e8f0e8, #faf7f0)', fontFamily: 'Jost, sans-serif' }}>

      {/* Header */}
      <div style={{
        background: '#4a7a50', color: 'white',
        padding: '1.5rem 3rem', display: 'flex',
        justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 700 }}>🌿 Patient Portal</div>
          <div style={{ fontSize: '0.82rem', opacity: 0.8 }}>Dr. Arpana Raj's Homeopathy Clinic</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 500 }}>👤 {patient.name}</div>
            <div style={{ fontSize: '0.82rem', opacity: 0.75 }}>{patient.phone}</div>
          </div>
          <button onClick={logout} style={{
            background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)',
            color: 'white', padding: '0.5rem 1.2rem', borderRadius: '20px',
            cursor: 'pointer', fontFamily: 'Jost', fontSize: '0.85rem'
          }}>Logout</button>
        </div>
      </div>

      <div style={{ padding: '2rem 3rem', maxWidth: '900px', margin: '0 auto' }}>

        {/* Welcome */}
        <div style={{
          background: 'white', borderRadius: '20px', padding: '1.5rem 2rem',
          boxShadow: '0 8px 30px rgba(0,0,0,0.07)', marginBottom: '2rem',
          display: 'flex', alignItems: 'center', gap: '1.5rem'
        }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #7a9e7e, #4a7a50)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem', flexShrink: 0
          }}>👤</div>
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', color: '#4a7a50', marginBottom: '0.2rem' }}>
              Welcome, {patient.name}!
            </h2>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>View your diagnosis and appointment records below.</p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          {[
            ['📋', 'Total Visits', records.length],
            ['✅', 'Completed', completed],
            ['⏳', 'Pending', records.length - completed],
          ].map(([icon, label, val]) => (
            <div key={label} style={{
              background: 'white', borderRadius: '16px', padding: '1.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)', textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', color: '#4a7a50', fontWeight: 700 }}>{val}</div>
              <div style={{ fontSize: '0.82rem', color: '#999' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Records */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#4a7a50', marginBottom: '1.5rem' }}>
            💊 My Medical Records
          </h3>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#aaa' }}>⏳ Loading records...</div>
          ) : records.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#aaa', background: '#f9f9f9', borderRadius: '12px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
              <p>No records yet. Records appear after your doctor updates them.</p>
              <a href="/#appointment" style={{ color: '#7a9e7e', marginTop: '1rem', display: 'inline-block' }}>
                Book an appointment →
              </a>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {records.map((rec, i) => (
                <div key={i} style={{
                  border: '1.5px solid rgba(122,158,126,0.2)',
                  borderRadius: '16px', padding: '1.5rem',
                  background: 'linear-gradient(135deg, #f9fdf9, #fff)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{
                      background: 'rgba(122,158,126,0.15)', color: '#4a7a50',
                      padding: '0.3rem 1rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 500
                    }}>Visit #{i + 1}</span>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <span style={{ color: '#aaa', fontSize: '0.82rem' }}>📅 {rec.date} {rec.time}</span>
                      <span style={{
                        background: rec.status === 'Completed' ? 'rgba(46,125,50,0.1)' : 'rgba(201,168,76,0.15)',
                        color: rec.status === 'Completed' ? '#2e7d32' : '#c9a84c',
                        padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.75rem'
                      }}>{rec.status}</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {[
                      ['🤒 Symptoms', rec.symptoms],
                      ['🔍 Diagnosis', rec.diagnosis],
                      ['💊 Medication', rec.medication],
                      ['📝 Doctor\'s Notes', rec.notes],
                    ].map(([label, val]) => val && (
                      <div key={label} style={{ padding: '0.8rem', background: '#f5f9f5', borderRadius: '10px' }}>
                        <div style={{ fontSize: '0.75rem', color: '#7a9e7e', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' }}>{label}</div>
                        <div style={{ fontSize: '0.9rem', color: '#2c2c2c', lineHeight: 1.6 }}>{val || '—'}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}