import React from 'react';

export default function Welcome({ setCurrentScreen }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      minHeight: '100vh',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      
      {/* Logo Ikon Ikan */}
      <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>
  <svg width="70" height="70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" fill="#38bdf8"/>
    <path d="M19 5L15 9" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round"/>
    <path d="M19 19L15 15" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round"/>
  </svg>
</div>
      
      {/* 2. Judul Aplikasi */}
      <h1 style={{ color: '#ffffff', fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px', textAlign: 'center' }}>
        SMART PAKAN IKAN
      </h1>
      
      {/* 3. Slogan */}
      <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '25px', textAlign: 'center' }}>
        Kelola Pakan Ikanmu Dengan Cerdas!
      </p>

      {/* Tombol Daftar */}
      <button 
        type="button"
        onClick={() => setCurrentScreen('daftar')} 
        style={{ 
          width: '100%', 
          maxWidth: '280px', 
          marginBottom: '15px', 
          padding: '12px', 
          background: '#10b981', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '25px', 
          fontWeight: 'bold', 
          cursor: 'pointer'
        }} 
      >
        Daftar
      </button>

      {/* 5. Tautan Masuk */}
      <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center' }}>
        Sudah punya akun?{' '}
        <button 
          type="button"
          onClick={() => setCurrentScreen('masuk')} 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#38bdf8', 
            cursor: 'pointer', 
            fontWeight: 'bold', 
            fontSize: '0.85rem', 
            padding: 0 
          }} 
        >
          Masuk di sini
        </button>
      </p>
    </div>
  );
}