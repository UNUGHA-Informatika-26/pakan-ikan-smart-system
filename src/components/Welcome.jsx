import React from 'react';

export default function Welcome({ setCurrentScreen }) {
  return (
    <section className="screen auth-screen" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '100vh', padding: '20px', boxSizing: 'border-box' }}>
      
      {/* Logo Ikon Ikan */}
      <div style={{ marginBottom: '15px' }}>
        <img src="/foto-192.png" alt="Logo Pakan Ikan" style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
      </div>

      <h1 style={{ color: '#ffffff', fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px' }}>
        SMART PAKAN IKAN
      </h1>
      
      <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '25px', lineHeight: '1.4' }}>
        Kelola Pakan Ikanmu Dengan Cerdas!
      </p>

      <button 
        style={{ width: '80%', maxWidth: '280px', marginBottom: '15px', padding: '12px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer', zIndex: 10 }} 
        onClick={() => setCurrentScreen('daftar')} 
        type="button"
      >
        Daftar
      </button>

      <p style={{ color: '#94a3b8', fontSize: '0.85rem', zIndex: 10 }}>
        Sudah punya akun?{' '}
        <button 
          style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem', padding: 0 }} 
          onClick={() => setCurrentScreen('masuk')} 
          type="button"
        >
          Masuk di sini
        </button>
      </p>
    </section>
  );
}