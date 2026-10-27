import React, { useState } from 'react';

export default function Masuk({ onNavigate }) {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Proses login berhasil, arahkan ke menu utama
    onNavigate('menu');
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Tombol Kembali ke Menu Sebelumnya */}
      <button 
        type="button"
        className="btn-primary" 
        style={{ backgroundColor: '#1e293b', border: '1px solid #334155', marginBottom: '20px' }} 
        onClick={() => onNavigate('welcome')}
      >
        ← Kembali ke Menu
      </button>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <p style={{ fontSize: '0.8rem', color: '#38bdf8', margin: '0 0 15px 0', fontWeight: '500' }}>
          Silakan masuk ke akun Anda:
        </p>
      </div>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
        
        {/* E-mail */}
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '6px', letterSpacing: '0.05em' }}>
            E-MAIL
          </label>
          <input 
            type="email" 
            className="form-input" 
            name="email"
            placeholder="nama@email.com" 
            value={form.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* Kata Sandi */}
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '6px', letterSpacing: '0.05em' }}>
            KATA SANDI
          </label>
          <input 
            type="password" 
            className="form-input" 
            name="password"
            placeholder="••••••••" 
            value={form.password} 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* Tombol Masuk */}
        <button 
          type="submit" 
          className="btn-primary" 
          style={{ backgroundColor: '#f1f5f9', color: '#0f172a', fontWeight: 'bold', marginTop: '10px' }}
        >
          Masuk
        </button>
      </form>

      {/* Tautan ke Halaman Daftar */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 4px 0' }}>Belum punya akun?</p>
        <button 
          type="button" 
          onClick={() => onNavigate('daftar')} 
          style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem', textDecoration: 'underline', padding: 0 }}
        >
          Daftar di sini
        </button>
      </div>
    </div>
  );
}