import React from 'react';

export default function Welcome({ onNavigate }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>
        PAKAN IKAN CERDAS
      </h1>
      <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '30px' }}>
        Kelola Pakan Ikanmu Dengan Cerdas!
      </p>

      {/* Tombol ke Halaman Daftar */}
      <button 
        type="button" 
        className="btn-primary" 
        onClick={() => onNavigate('daftar')}
        style={{ marginBottom: '15px' }}
      >
        Daftar
      </button>

      {/* Tautan ke Halaman Masuk */}
      <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '20px' }}>
        Sudah punya akun?{' '}
        <button 
          type="button" 
          onClick={() => onNavigate('masuk')} 
          style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold', fontSize: 'inherit', padding: 0 }}
        >
          Masuk di sini
        </button>
      </p>
    </div>
  );
}