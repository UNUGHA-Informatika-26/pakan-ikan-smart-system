import React, { useState } from 'react';

export default function Rab({ rabList, onSaveRab, onDeleteRab, onBack }) {
  // State untuk form RAB
  const [form, setForm] = useState({
    pakan: '',
    berat: '',
    suhu: '',
    ph: '',
    mati: '',
    total: '',
    biaya: '',
    desk: ''
  });

  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveRab(form, editIndex);
    // Reset form setelah simpan
    setForm({ pakan: '', berat: '', suhu: '', ph: '', mati: '', total: '', biaya: '', desk: '' });
    setEditIndex(null);
  };

  const handleEditClick = (index, item) => {
    setEditIndex(index);
    if (item.raw) {
      setForm(item.raw);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Tombol Kembali */}
      <button 
        className="btn-primary" 
        style={{ backgroundColor: '#1e293b', border: '1px solid #334155', marginBottom: '20px' }} 
        onClick={onBack}
        type="button"
      >
        ← Kembali ke Menu
      </button>

      <h3 style={{ color: '#38bdf8', marginTop: '0', marginBottom: '15px', textAlign: 'center' }}>
        {editIndex !== null ? 'Edit Jurnal RAB' : 'Rencana Anggaran & Jurnal RAB'}
      </h3>

      {/* Form Input RAB */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px' }}>
        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold' }}>JUMLAH PAKAN (KG)</label>
          <input type="number" className="form-input" name="pakan" placeholder="Contoh: 5" value={form.pakan} onChange={handleChange} required />
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold' }}>ESTIMASI BERAT IKAN (GRAM)</label>
          <input type="number" className="form-input" name="berat" placeholder="Contoh: 250" value={form.berat} onChange={handleChange} required />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold' }}>SUHU AIR (°C)</label>
            <input type="number" className="form-input" name="suhu" placeholder="28" value={form.suhu} onChange={handleChange} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold' }}>pH AIR</label>
            <input type="number" step="0.1" className="form-input" name="ph" placeholder="7.0" value={form.ph} onChange={handleChange} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold' }}>CATATAN / KETERANGAN</label>
          <textarea className="form-input" name="desk" placeholder="Kondisi kolam atau catatan tambahan..." value={form.desk} onChange={handleChange} style={{ minHeight: '60px', resize: 'vertical' }} />
        </div>

        <button type="submit" className="btn-primary" style={{ backgroundColor: '#10b981', marginTop: '5px' }}>
          {editIndex !== null ? 'Simpan Perubahan RAB' : 'Simpan ke Jurnal RAB'}
        </button>
        
        {editIndex !== null && (
          <button 
            type="button" 
            className="btn-primary" 
            style={{ backgroundColor: '#64748b', marginTop: '0' }} 
            onClick={() => { setEditIndex(null); setForm({ pakan: '', berat: '', suhu: '', ph: '', mati: '', total: '', biaya: '', desk: '' }); }}
          >
            Batal Edit
          </button>
        )}
      </form>

      {/* Daftar Jurnal RAB Tersimpan */}
      <div>
        <h4 style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '10px' }}>Jurnal RAB Tersimpan</h4>
        {rabList.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#64748b', padding: '20px', background: '#1e293b', borderRadius: '12px', border: '2px dashed #334155' }}>
            Belum ada jurnal RAB tersimpan.
          </div>
        ) : (
          rabList.map((r, i) => (
            <div key={i} style={{ background: '#334155', padding: '14px', marginBottom: '10px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ textAlign: 'left', flex: 1, marginRight: '10px' }}>
                <small style={{ color: '#34d399', fontWeight: 'bold' }}>{r.d} - {r.s}</small>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: '#f1f5f9' }}>{r.raw?.desk || `Pakan: ${r.raw?.pakan}kg, Berat: ${r.raw?.berat}g`}</p>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                <button 
                  onClick={() => handleEditClick(i, r)} 
                  style={{ background: '#38bdf8', color: '#0f172a', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => { if(window.confirm("Yakin ingin menghapus jurnal ini?")) onDeleteRab(i); }} 
                  style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}