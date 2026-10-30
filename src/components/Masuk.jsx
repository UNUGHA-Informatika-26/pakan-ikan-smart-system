import React from 'react';

export default function Masuk({ handleLogin, lMail, setLMail, lPass, setLPass, loginErr, setCurrentScreen, styles }) {
  return (
    <section className="screen auth-screen" style={styles?.screen || { padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <img src="/foto-192.png" alt="Logo" style={{ width: '50px', height: '50px', objectFit: 'contain', marginBottom: '5px' }} />
        <h1 style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 'bold' }}>SMART PAKAN IKAN</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Silakan masuk ke akun Anda:</p>
      </div>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '320px', margin: '0 auto' }}>
        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Email</label>
          <input style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }} type="email" placeholder="nama@email.com" value={lMail} onChange={e => setLMail(e.target.value)} />
        </div>

        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Kata Sandi</label>
          <input style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }} type="password" placeholder="Min. 8 karakter" value={lPass} onChange={e => setLPass(e.target.value)} />
        </div>

        {loginErr && <p style={{ color: '#ef4444', fontSize: '0.8rem' }}>{loginErr}</p>}
        
        <button style={{ width: '100%', marginTop: '10px', padding: '10px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' }} type="submit">
          Masuk
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '15px', color: '#94a3b8', fontSize: '0.8rem' }}>
        Belum punya akun?{' '}
        <button 
          style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem', padding: 0 }} 
          onClick={() => setCurrentScreen('daftar')} 
          type="button"
        >
          Daftar di sini
        </button>
      </p>
    </section>
  );
}