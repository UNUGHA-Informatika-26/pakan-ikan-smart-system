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
      
      {/* Logo Ikan SVG Transparan (Tanpa Background Hitam) */}
      <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>
        <svg width="75" height="75" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 12C20 15.3137 16.4183 18 12 18C10.154 18 8.46132 17.5147 7.10557 16.691L3 18L4.309 13.8944C3.48528 12.5387 3 10.846 3 9C3 4.58172 6.58172 1 11 1C15.4183 1 19 4.58172 19 9C19 10.0315 18.8028 11.0205 18.4411 11.9392C19.4187 11.9793 20 12 20 12Z" fill="#10b981"/>
          <circle cx="14" cy="8" r="1.5" fill="#0f172a"/>
          <path d="M3 9L7 11" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      
      <h1 style={{ color: '#ffffff', fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px', textAlign: 'center' }}>
        SMART PAKAN IKAN
      </h1>
      
      <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '25px', textAlign: 'center' }}>
        Kelola Pakan Ikanmu Dengan Cerdas!
      </p>

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
          cursor: 'pointer',
          zIndex: 10
        }} 
      >
        Daftar
      </button>

      <p style={{ color: '#94a3b8', fontSize: '0.85rem', textAlign: 'center', zIndex: 10 }}>
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
            padding: 0,
            zIndex: 10
          }} 
        >
          Masuk di sini
        </button>
      </p>
    </div>
  );
}