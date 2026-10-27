import React, { useState } from 'react';

export default function Masuk({ onNavigate }) {
  // State dijadikan satu objek untuk meringankan memori
  const [formData, setFormData] = useState({ email: '', pass: '' });
  const [err, setErr] = useState('');
  const [showPass, setShowPass] = useState(false);

  // Fungsi handler universal untuk input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!formData.email.includes('@')) return setErr('Email tidak valid.');
    if (formData.pass.length < 8) return setErr('Kata sandi minimal 8 karakter.');

    setErr('');
    alert('Berhasil masuk!');
    onNavigate('menu'); // Pindah ke halaman menu utama
  };

  return (
    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <h3 style={{ color: '#38bdf8', textAlign: 'center' }}>Masuk ke Akun</h3>
      
      <div>
        <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 'bold' }}>Email</label>
        <input 
          className="form-input" 
          type="email" 
          name="email" 
          placeholder="nama@email.com" 
          value={formData.email} 
          onChange={handleChange} 
        />
      </div>

      <div>
        <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 'bold' }}>Kata Sandi</label>
        <div style={{ position: 'relative' }}>
          <input 
            className="form-input" 
            type={showPass ? 'text' : 'password'} 
            name="pass" 
            placeholder="Min. 8 karakter" 
            value={formData.pass} 
            onChange={handleChange} 
          />
          <button 
            type="button" 
            onClick={() => setShowPass(!showPass)}
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#8d9bb8', cursor: 'pointer' }}
          >
            {showPass ? 'Sembunyikan' : 'Lihat'}
          </button>
        </div>
      </div>

      {err && <p style={{ color: '#ef4444', fontSize: '0.85rem', textAlign: 'center', margin: 0 }}>{err}</p>}
      
      <button type="submit" className="btn-primary">Masuk</button>
      
      <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#94a3b8' }}>
        Belum punya akun? <button type="button" onClick={() => onNavigate('daftar')} style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold' }}>Daftar di sini</button>
      </p>
    </form>
  );
}