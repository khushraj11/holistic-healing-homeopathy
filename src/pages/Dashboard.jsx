import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAppointments, updatePatient } from '../utils/sheetApi';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ diagnosis: '', medication: '', notes: '', status: '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('doctorAuth')) { navigate('/login'); return; }
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchAppointments();
      setAppointments(res.data || []);
    } catch { setAppointments([]); }
    setLoading(false);
  };

  const openPatient = (apt) => {
    setSelected(apt);
    setForm({
      diagnosis: apt.diagnosis || '',
      medication: apt.medication || '',
      notes: apt.notes || '',
      status: apt.status || 'Pending'
    });
    setSaved(false);
  };

  const saveRecord = async () => {
    setSaving(true);
    try {
      await updatePatient({ id: selected.id, ...form });
      setSaved(true);
      setAppointments(prev => prev.map(a =>
        a.id === selected.id ? { ...a, ...form } : a
      ));
      setSelected(prev => ({ ...prev, ...form }));
    } catch { alert('Save failed!'); }
    setSaving(false);
  };

  const logout = () => {
    localStorage.removeItem('doctorAuth');
    navigate('/');
  };

  const filtered = appointments.filter(a =>
    a.name?.toLowerCase().includes(search.toLowerCase()) ||
    a.phone?.includes(search) ||
    a.symptoms?.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'Pending').length,
    completed: appointments.filter(a => a.status === 'Completed').length,
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f9f5', fontFamily: 'Jost, sans-serif' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #2c3e2d, #4a7a50)',
        color: 'white', padding: '1.2rem 3rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 700 }}>
            🌿 Dr. Arpana Raj — Dashboard
          </div>
          <div style={{ fontSize: '0.82rem', opacity: 0.75 }}>Homeopathy Clinic Management</div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={loadData} style={{
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
            color: 'white', padding: '0.5rem 1.2rem', borderRadius: '20px',
            cursor: 'pointer', fontFamily: 'Jost', fontSize: '0.85rem'
          }}>🔄 Refresh</button>
          <button onClick={logout} style={{
            background: 'rgba(255,100,100,0.2)', border: '1px solid rgba(255,100,100,0.4)',
            color: 'white', padding: '0.5rem 1.2rem', borderRadius: '20px',
            cursor: 'pointer', fontFamily: 'Jost', fontSize: '0.85rem'
          }}>Logout</button>
        </div>
      </div>

      <div style={{ padding: '2rem 3rem' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
          {[
            ['📋', 'Total Appointments', stats.total, '#4a7a50'],
            ['⏳', 'Pending', stats.pending, '#c9a84c'],
            ['✅', 'Completed', stats.completed, '#2e7d32'],
          ].map(([icon, label, val, color]) => (
            <div key={label} style={{
              background: 'white', borderRadius: '16px', padding: '1.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)', textAlign: 'center',
              borderTop: `4px solid ${color}`
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', color, fontWeight: 700 }}>{val}</div>
              <div style={{ fontSize: '0.82rem', color: '#999' }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: '2rem' }}>

          {/* Patient List */}
          <div style={{ background: 'white', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#4a7a50' }}>
                👥 All Patients
              </h2>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search name/phone..."
                style={{
                  padding: '0.5rem 1rem', border: '1.5px solid rgba(122,158,126,0.3)',
                  borderRadius: '20px', fontFamily: 'Jost', fontSize: '0.85rem',
                  outline: 'none', width: '180px'
                }}
              />
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#aaa' }}>⏳ Loading...</div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#aaa' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
                <p>No appointments yet!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '600px', overflowY: 'auto' }}>
                {filtered.map((apt, i) => (
                  <div key={i} onClick={() => openPatient(apt)}
                    style={{
                      padding: '1rem 1.2rem', borderRadius: '12px',
                      border: selected?.id === apt.id ? '2px solid #4a7a50' : '1.5px solid rgba(122,158,126,0.2)',
                      cursor: 'pointer', transition: 'all 0.2s',
                      background: selected?.id === apt.id ? 'rgba(74,122,80,0.05)' : 'white'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(74,122,80,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = selected?.id === apt.id ? 'rgba(74,122,80,0.05)' : 'white'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: '0.95rem', color: '#2c2c2c' }}>{apt.name}</div>
                        <div style={{ fontSize: '0.82rem', color: '#888', marginTop: '0.2rem' }}>
                          📞 {apt.phone} • Age: {apt.age}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#aaa', marginTop: '0.2rem' }}>
                          🗓 {apt.date} {apt.time}
                        </div>
                      </div>
                      <span style={{
                        background: apt.status === 'Completed' ? 'rgba(46,125,50,0.1)' : apt.status === 'Confirmed' ? 'rgba(74,122,80,0.1)' : 'rgba(201,168,76,0.15)',
                        color: apt.status === 'Completed' ? '#2e7d32' : apt.status === 'Confirmed' ? '#4a7a50' : '#c9a84c',
                        padding: '0.3rem 0.8rem', borderRadius: '20px',
                        fontSize: '0.75rem', fontWeight: 500
                      }}>{apt.status || 'Pending'}</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#888', marginTop: '0.5rem', fontStyle: 'italic' }}>
                      🤒 {apt.symptoms?.substring(0, 60)}...
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Patient Detail */}
          {selected && (
            <div style={{ background: 'white', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#4a7a50' }}>
                  👤 Patient Record
                </h2>
                <button onClick={() => setSelected(null)} style={{
                  background: 'none', border: 'none', fontSize: '1.2rem',
                  cursor: 'pointer', color: '#aaa'
                }}>✕</button>
              </div>

              {/* Patient Info */}
              <div style={{ background: '#f5f9f5', borderRadius: '12px', padding: '1rem', marginBottom: '1.2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                  {[
                    ['👤 Name', selected.name],
                    ['🎂 Age', selected.age],
                    ['📞 Phone', selected.phone],
                    ['📧 Email', selected.email],
                    ['🗓 Date', selected.date],
                    ['🕐 Time', selected.time],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <div style={{ fontSize: '0.75rem', color: '#7a9e7e', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
                      <div style={{ fontSize: '0.9rem', color: '#2c2c2c', fontWeight: 500, marginTop: '0.2rem' }}>{val || '—'}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '0.8rem', paddingTop: '0.8rem', borderTop: '1px solid rgba(122,158,126,0.2)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#7a9e7e', textTransform: 'uppercase', letterSpacing: '0.5px' }}>🤒 Symptoms</div>
                  <div style={{ fontSize: '0.9rem', color: '#2c2c2c', marginTop: '0.2rem', lineHeight: 1.6 }}>{selected.symptoms}</div>
                </div>
              </div>

              {/* Status */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.82rem', color: '#4a7a50', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                  style={{
                    width: '100%', padding: '0.8rem 1rem', marginTop: '0.4rem',
                    border: '1.5px solid rgba(122,158,126,0.3)', borderRadius: '12px',
                    fontFamily: 'Jost', fontSize: '0.9rem', outline: 'none', background: 'white'
                  }}>
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>

              {/* Diagnosis */}
              {[
                ['diagnosis', '🔍 Diagnosis', 'Enter diagnosis...', 3],
                ['medication', '💊 Medication & Potency', 'e.g. Belladonna 30C — 3 drops twice daily', 3],
                ['notes', '📝 Doctor Notes', 'Additional notes, lifestyle advice...', 4],
              ].map(([field, label, placeholder, rows]) => (
                <div key={field} style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.82rem', color: '#4a7a50', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 500 }}>{label}</label>
                  <textarea
                    value={form[field]}
                    onChange={e => setForm({ ...form, [field]: e.target.value })}
                    placeholder={placeholder} rows={rows}
                    style={{
                      width: '100%', padding: '0.8rem 1rem', marginTop: '0.4rem',
                      border: '1.5px solid rgba(122,158,126,0.3)', borderRadius: '12px',
                      fontFamily: 'Jost', fontSize: '0.9rem', outline: 'none',
                      resize: 'vertical', lineHeight: 1.6
                    }}
                    onFocus={e => e.target.style.borderColor = '#7a9e7e'}
                    onBlur={e => e.target.style.borderColor = 'rgba(122,158,126,0.3)'}
                  />
                </div>
              ))}

              <button onClick={saveRecord} disabled={saving} style={{
                width: '100%', padding: '1rem', background: '#4a7a50',
                color: 'white', border: 'none', borderRadius: '12px',
                fontFamily: 'Jost', fontSize: '1rem', cursor: 'pointer',
                transition: 'all 0.3s'
              }}>
                {saving ? '⏳ Saving...' : '💾 Save Record'}
              </button>

              {saved && (
                <div style={{
                  marginTop: '1rem', padding: '0.8rem', background: 'rgba(74,122,80,0.1)',
                  borderRadius: '10px', color: '#4a7a50', textAlign: 'center', fontSize: '0.9rem'
                }}>
                  ✅ Record saved! Patient can now view this.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}