import React, { useState } from 'react';

export default function Daftar({ onNavigate }) {
  const [form, setForm] = useState({
    nama: '',
    email: '',
    telepon: '',
    password: '',
    confirmPassword: ''
  });

  // State untuk toggle tampil/sembunyi password
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Kata sandi tidak cocok!");
      return;
    }
    alert("Pendaftaran berhasil! Silakan masuk.");
    onNavigate('masuk');
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Tombol Kembali */}
      <button 
        type="button" 
        className="btn-primary" 
        style={{ backgroundColor: '#1e293b', border: '1px solid #334155', marginBottom: '15px' }} 
        onClick={() => onNavigate('welcome')}
      >
        ← Kembali
      </button>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 5px 0' }}>PAKAN IKAN CERDAS</h3>
        <p style={{ fontSize: '0.8rem', color: '#38bdf8', margin: 0 }}>Silakan isi data untuk mendaftar:</p>
      </div>

      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
        
        {/* Nama Lengkap */}
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Nama Lengkap</label>
          <input 
            type="text" 
            className="form-input" 
            name="nama"
            placeholder="Masukkan Nama" 
            value={form.nama} 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* E-mail */}
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>E-mail</label>
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

        {/* Nomor Telepon */}
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Nomor Telepon</label>
          <input 
            type="tel" 
            className="form-input" 
            name="telepon"
            placeholder="0812..." 
            value={form.telepon} 
            onChange={handleChange} 
            required 
          />
        </div>

        {/* Buat Kata Sandi */}
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Buat Kata Sandi</label>
          <div style={{ position: 'relative' }}>
            <input 
              type={showPass ? "text" : "password"} 
              className="form-input" 
              name="password"
              placeholder="••••••••" 
              value={form.password} 
              onChange={handleChange} 
              required 
              style={{ paddingRight: '35px' }}
            />
            <button 
              type="button" 
              onClick={() => setShowPass(!showPass)}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '0.9rem' }}
            >
              {showPass ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
        </div>

        {/* Ulangi Kata Sandi */}
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Kata Sandi</label>
          <div style={{ position: 'relative' }}>
            <input 
              type={showConfirmPass ? "text" : "password"} 
              className="form-input" 
              name="confirmPassword"
              placeholder="Ulangi Kata Sandi" 
              value={form.confirmPassword} 
              onChange={handleChange} 
              required 
              style={{ paddingRight: '35px' }}
            />
            <button 
              type="button" 
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '0.9rem' }}
            >
              {showConfirmPass ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
        </div>

        {/* Tombol Daftar Sekarang */}
        <button 
          type="submit" 
          className="btn-primary" 
          style={{ backgroundColor: '#f1f5f9', color: '#0f172a', fontWeight: 'bold', marginTop: '10px', borderRadius: '20px' }}
        >
          Daftar Sekarang
        </button>
      </form>

      {/* Tautan Masuk */}
      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0 0 4px 0' }}>Sudah punya akun?</p>
        <button 
          type="button" 
          onClick={() => onNavigate('masuk')} 
          style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.75rem', textDecoration: 'underline', padding: 0 }}
        >
          Masuk di sini
        </button>
      </div>
    </div>
  );
}