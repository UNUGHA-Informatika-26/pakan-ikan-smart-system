import React, { useState } from 'react';

export default function PengaturanPakan({ data, onUpdate, onBack, loading }) {
  // Menggunakan state tunggal (objek) agar lebih ringkas dan ringan
  const [form, setForm] = useState(data);

  // Handler universal untuk mengubah input form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Tombol Kembali */}
      <button className="btn-primary" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', marginBottom: '20px' }} onClick={onBack}>
        ← Kembali ke Menu
      </button>

      <div style={{ textAlign: 'center' }}>
        <h3 style={{ color: '#38bdf8', marginTop: '0', marginBottom: '20px', fontSize: '1.1rem' }}>
          Pengaturan Jadwal Pakan
        </h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
          
          {/* Rentang Tanggal */}
          <div>
            <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '6px', letterSpacing: '0.05em' }}>
              RENTANG TANGGAL
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="number" className="form-input" name="tglMulai" value={form.tglMulai} onChange={handleChange} />
              <input type="number" className="form-input" name="tglSelesai" value={form.tglSelesai} onChange={handleChange} />
            </div>
          </div>

          {/* Jadwal Pagi */}
          <div>
            <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '6px', letterSpacing: '0.05em' }}>
              JADWAL PAGI
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="number" className="form-input" name="jamPagi" value={form.jamPagi} onChange={handleChange} />
              <span style={{ color: '#fff', fontWeight: 'bold' }}>:</span>
              <input type="number" className="form-input" name="menitPagi" value={form.menitPagi} onChange={handleChange} />
            </div>
          </div>

          {/* Jadwal Sore (Diperbaiki dari gambar yang tertulis sakit) */}
          <div>
            <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '6px', letterSpacing: '0.05em' }}>
              JADWAL SORE
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="number" className="form-input" name="jamSore" value={form.jamSore} onChange={handleChange} />
              <span style={{ color: '#fff', fontWeight: 'bold' }}>:</span>
              <input type="number" className="form-input" name="menitSore" value={form.menitSore} onChange={handleChange} />
            </div>
          </div>

          {/* Durasi */}
          <div>
            <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '6px', letterSpacing: '0.05em' }}>
              DURASI (DETIK)
            </label>
            <input type="number" className="form-input" name="durasi" value={form.durasi} onChange={handleChange} />
          </div>

          {/* Tombol Perbarui */}
          <button type="submit" className="btn-primary" style={{ backgroundColor: '#38bdf8', color: '#0f172a', fontWeight: 'bold', marginTop: '10px' }} disabled={loading}>
            {loading ? 'MENYIMPAN...' : 'PERBARUI DATA & AKTIFKAN'}
          </button>

        </form>
      </div>
    </div>
  );
}