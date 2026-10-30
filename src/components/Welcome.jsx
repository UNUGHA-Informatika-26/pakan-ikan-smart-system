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
      <div style={{ marginBottom: '15px' }}>
        <img src="/foto-192.png" alt="Logo Pakan Ikan" style={{ width: '70px', height: '70px', objectFit: 'contain' }} />
      </div>

      <h1 style={{ color: '#ffffff', fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px', textAlign: 'center' }}>
        SMART PAKAN IKAN
      </h1>
      
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