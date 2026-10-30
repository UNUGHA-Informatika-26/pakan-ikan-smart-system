import React from 'react';

export default function Daftar({ handleRegister, rNama, setRNama, rMail, setRMail, rHp, setRHp, rPass, setRPass, rPass2, setRPass2, regErr, setCurrentScreen, styles }) {
  return (
    <section className="screen auth-screen" style={styles?.screen || { padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <img src="/foto-192.png" alt="Logo" style={{ width: '50px', height: '50px', objectFit: 'contain', marginBottom: '5px' }} />
        <h1 style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 'bold' }}>SMART PAKAN IKAN</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Silakan isi data untuk mendaftar:</p>
      </div>

      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '320px', margin: '0 auto' }}>
        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Nama Lengkap</label>
          <input style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }} type="text" placeholder="Masukkan Nama Anda" value={rNama} onChange={e => setRNama(e.target.value)} />
        </div>
        
        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Email</label>
          <input style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }} type="email" placeholder="nama@email.com" value={rMail} onChange={e => setRMail(e.target.value)} />
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Nomor Telepon</label>
          <input style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }} type="tel" placeholder="0812 3456 7890" value={rHp} onChange={e => setRHp(e.target.value)} />
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Buat Kata Sandi</label>
          <input style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }} type="password" placeholder="Min. 8 karakter" value={rPass} onChange={e => setRPass(e.target.value)} />
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Konfirmasi Kata Sandi</label>
          <input style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }} type="password" placeholder="Ulangi Kata Sandi" value={rPass2} onChange={e => setRPass2(e.target.value)} />
        </div>

        {regErr && <p style={{ color: '#ef4444', fontSize: '0.8rem' }}>{regErr}</p>}
        
        <button style={{ width: '100%', marginTop: '5px', padding: '10px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' }} type="submit">
          Daftar Sekarang
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '15px', color: '#94a3b8', fontSize: '0.8rem' }}>
        Sudah punya akun?{' '}
        <button 
          style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', padding: 0 }} 
          onClick={() => setCurrentScreen('masuk')} 
          type="button"
        >
          Masuk di sini
        </button>
      </p>
    </section>
  );
}