import React, { useState } from 'react';

export default function Masuk({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Proses login sederhana, arahkan ke menu utama
    onNavigate('menu');
  };

  return (
    <div style={{ width: '100%' }}>
      <button 
        type="button"
        className="btn-primary" 
        style={{ backgroundColor: '#1e293b', border: '1px solid #334155', marginBottom: '20px' }} 
        onClick={() => onNavigate('welcome')}
      >
        ← Kembali
      </button>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ color: '#38bdf8', margin: '0 0 5px 0' }}>Masuk Akun</h3>
        <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>Silakan masuk untuk mengontrol alat</p>
      </div>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>EMAIL</label>
          <input 
            type="email" 
            className="form-input" 
            placeholder="nama@email.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>KATA SANDI</label>
          <input 
            type="password" 
            className="form-input" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
          MASUK
        </button>
      </form>
    </div>
  );
}