import React from 'react';

export default function Daftar({ handleRegister, rNama, setRNama, rMail, setRMail, rHp, setRHp, rPass, setRPass, rPass2, setRPass2, regErr, onNavigate }) {
  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <h3 style={{ color: '#38bdf8', fontSize: '1.1rem', margin: '0 0 5px 0' }}>SMART PAKAN IKAN</h3>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>Silakan isi data untuk mendaftar:</p>
      </div>

      {regErr && (
        <div style={{ background: '#7f1d1d', color: '#fca5a5', padding: '8px', borderRadius: '6px', fontSize: '0.75rem', marginBottom: '10px', textAlign: 'center' }}>
          {regErr}
        </div>
      )}

      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '3px' }}>Nama Lengkap</label>
          <input type="text" className="form-input" placeholder="Nama Anda" value={rNama} onChange={(e) => setRNama(e.target.value)} required />
        </div>

        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '3px' }}>E-mail</label>
          <input type="email" className="form-input" placeholder="nama@email.com" value={rMail} onChange={(e) => setRMail(e.target.value)} required />
        </div>

        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '3px' }}>Nomor Telepon</label>
          <input type="tel" className="form-input" placeholder="08xxxxxxxxxx" value={rHp} onChange={(e) => setRHp(e.target.value)} required />
        </div>

        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '3px' }}>Buat Kata Sandi</label>
          <input type="password" className="form-input" placeholder="Minimal 8 karakter" value={rPass} onChange={(e) => setRPass(e.target.value)} required />
        </div>

        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '3px' }}>Konfirmasi Kata Sandi</label>
          <input type="password" className="form-input" placeholder="Ulangi kata sandi" value={rPass2} onChange={(e) => setRPass2(e.target.value)} required />
        </div>

        <button type="submit" className="btn-primary" style={{ backgroundColor: '#10b981', color: '#ffffff', fontWeight: 'bold', marginTop: '5px', cursor: 'pointer' }}>
          Daftar Sekarang
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.75rem', color: '#94a3b8' }}>
        Sudah punya akun?{' '}
        <span style={{ color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => onNavigate('masuk')}>
          Masuk di sini
        </span>
      </div>
    </div>
  );
}