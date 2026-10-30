import React, { useState } from 'react'; // 1. Tambahkan useState di sini

export default function Daftar({ handleRegister, rNama, setRNama, rMail, setRMail, rHp, setRHp, rPass, setRPass, rPass2, setRPass2, regErr, setCurrentScreen, styles }) {
  
  // 2. Tambahkan state untuk mengontrol buka/tutup mata password
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false); // Opsional untuk konfirmasi sandi

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

        {/* 3. BAGIAN BUAT KATA SANDI (Diberi position: relative & tombol ikon mata) */}
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
            style={{ position: 'absolute', right: '12px', top: '32px', background: 'none', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center' }}
          >
            {showPass ? (
              /* Mata Terbuka (Tanpa Silang) */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            ) : (
              /* Mata Tertutup (Dengan Garis Silang) */
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            )}
          </button>
        </div>

        {/* 4. BAGIAN KONFIRMASI KATA SANDI (Opsional, diberi ikon mata juga agar konsisten) */}
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
            style={{ position: 'absolute', right: '12px', top: '32px', background: 'none', border: 'none', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center' }}
          >
            {showPass2 ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            )}
          </button>
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