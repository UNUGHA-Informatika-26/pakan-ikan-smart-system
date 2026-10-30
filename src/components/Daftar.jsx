import React, { useState } from 'react';

export default function Daftar({ handleRegister, rNama, setRNama, rMail, setRMail, rHp, setRHp, rPass, setRPass, rPass2, setRPass2, regErr, onNavigate, styles }) {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  return (
    <section className="screen auth-screen" style={styles?.screen || { padding: '20px', maxWidth: '400px', margin: '0 auto', boxSizing: 'border-box', position: 'relative', zIndex: 10 }}>
      
      {/* Tombol Kembali ke Beranda */}
      <div style={{ marginBottom: '10px', position: 'relative', zIndex: 20 }}>
        <button 
          type="button"
          onClick={() => onNavigate('welcome')}
          style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '0.85rem', padding: '5px 0', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold' }}
        >
          ← Kembali ke Beranda
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <h1 style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 'bold' }}>SMART PAKAN IKAN</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Silakan isi data untuk mendaftar:</p>
      </div>

      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '320px', margin: '0 auto' }}>
        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Nama Lengkap</label>
          <input style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff', boxSizing: 'border-box' }} type="text" placeholder="Masukkan Nama Anda" value={rNama} onChange={e => setRNama(e.target.value)} />
        </div>
        
        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Email</label>
          <input style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff', boxSizing: 'border-box' }} type="email" placeholder="nama@email.com" value={rMail} onChange={e => setRMail(e.target.value)} />
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Nomor Telepon</label>
          <input style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff', boxSizing: 'border-box' }} type="tel" placeholder="0812 3456 7890" value={rHp} onChange={e => setRHp(e.target.value)} />
        </div>

        <div style={{ position: 'relative' }}>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Buat Kata Sandi</label>
          <input 
            style={{ width: '100%', padding: '10px 40px 10px 10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff', boxSizing: 'border-box' }} 
            type={showPass ? "text" : "password"} 
            placeholder="Min. 8 karakter" 
            value={rPass} 
            onChange={e => setRPass(e.target.value)} 
          />
          <button 
            type="button" 
            onClick={() => setShowPass(!showPass)} 
            style={{ position: 'absolute', right: '12px', top: '32px', background: 'none', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center', zIndex: 20 }}
          >
            {showPass ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
            )}
          </button>
        </div>

        <div style={{ position: 'relative' }}>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Konfirmasi Kata Sandi</label>
          <input 
            style={{ width: '100%', padding: '10px 40px 10px 10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff', boxSizing: 'border-box' }} 
            type={showPass2 ? "text" : "password"} 
            placeholder="Ulangi Kata Sandi" 
            value={rPass2} 
            onChange={e => setRPass2(e.target.value)} 
          />
          <button 
            type="button" 
            onClick={() => setShowPass2(!showPass2)} 
            style={{ position: 'absolute', right: '12px', top: '32px', background: 'none', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center', zIndex: 20 }}
          >
            {showPass2 ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
            )}
          </button>
        </div>

        {regErr && <p style={{ color: '#ef4444', fontSize: '0.8rem' }}>{regErr}</p>}
        
        <button style={{ width: '100%', marginTop: '5px', padding: '10px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer', zIndex: 20 }} type="submit">
          Daftar Sekarang
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '15px', color: '#94a3b8', fontSize: '0.8rem', position: 'relative', zIndex: 20 }}>
        Sudah punya akun?{' '}
        <button 
          style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', padding: '5px', zIndex: 30 }} 
          onClick={() => onNavigate('masuk')} 
          type="button"
        >
          Masuk di sini
        </button>
      </p>
    </section>
  );
}