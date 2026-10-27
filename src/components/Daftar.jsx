import React, { useState } from 'react';

export default function Daftar({ onNavigate }) {
  const [form, setForm] = useState({ nama: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Pendaftaran berhasil! Silakan masuk.");
    onNavigate('masuk');
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
        <h3 style={{ color: '#38bdf8', margin: '0 0 5px 0' }}>Daftar Akun Baru</h3>
        <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>Buat akun untuk mulai menggunakan sistem</p>
      </div>

      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>NAMA LENGKAP</label>
          <input 
            type="text" 
            className="form-input" 
            name="nama"
            placeholder="Nama Anda" 
            value={form.nama} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>EMAIL</label>
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

        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>KATA SANDI</label>
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

        <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
          DAFTAR SEKARANG
        </button>
      </form>
    </div>
  );
}