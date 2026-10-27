import React, { useState } from 'react';

export default function Rab({ onBack }) {
  // State untuk form utama
  const [form, setForm] = useState({
    bibitQty: '', bibitHarga: '',
    alasQty: '', alasHarga: '',
    peletQty: '', peletHarga: '',
    dolomitQty: '', dolomitHarga: '',
    garamQty: '', garamHarga: '',
    vitaminQty: '', vitaminHarga: ''
  });

  // State untuk pengeluaran tambahan kustom
  const [extraPengeluaran, setExtraPengeluaran] = useState([]);
  const [menuId, setMenuId] = useState(null);

  // State untuk daftar jurnal tersimpan
  const [jurnalList, setJurnalList] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Tambah kolom pengeluaran manual baru
  const handleTambahPengeluaran = () => {
    setExtraPengeluaran([
      ...extraPengeluaran,
      { id: Date.now(), nama: '', qty: '', satuan: '', harga: '' }
    ]);
  };

  const handleExtraChange = (id, field, value) => {
    setExtraPengeluaran(extraPengeluaran.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleHapusExtra = (id) => {
    setExtraPengeluaran(extraPengeluaran.filter(item => item.id !== id));
    setMenuId(null);
  };

  const handleEditExtra = (id) => {
    setMenuId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataBaru = {
      id: Date.now(),
      ...form,
      extraPengeluaran,
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setJurnalList([dataBaru, ...jurnalList]);
    alert("Jurnal RAB Berhasil Disimpan!");
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Tombol Kembali */}
      <button 
        type="button" 
        className="btn-primary" 
        style={{ backgroundColor: '#1e293b', border: '1px solid #334155', marginBottom: '15px' }} 
        onClick={onBack}
      >
        ← Kembali ke Menu
      </button>

      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <h3 style={{ color: '#38bdf8', fontSize: '1.1rem', margin: '0 0 5px 0' }}>Rencana Anggaran & Jurnal RAB</h3>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>Masukkan rincian pengeluaran operasional</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
        
        {/* 1. Harga Bibit Ikan */}
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>HARGA BIBIT IKAN</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="number" className="form-input" name="bibitQty" placeholder="Jumlah (Ekor)" value={form.bibitQty} onChange={handleChange} required />
            <input type="number" className="form-input" name="bibitHarga" placeholder="Harga (Rp)" value={form.bibitHarga} onChange={handleChange} required />
          </div>
        </div>

        {/* 2. Harga Alas Kolam */}
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>HARGA ALAS KOLAM</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="number" className="form-input" name="alasQty" placeholder="Ukuran (Meter)" value={form.alasQty} onChange={handleChange} required />
            <input type="number" className="form-input" name="alasHarga" placeholder="Harga (Rp)" value={form.alasHarga} onChange={handleChange} required />
          </div>
        </div>

        {/* 3. Harga Pelet */}
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>HARGA PELET</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="number" className="form-input" name="peletQty" placeholder="Berat (Gram)" value={form.peletQty} onChange={handleChange} required />
            <input type="number" className="form-input" name="peletHarga" placeholder="Harga (Rp)" value={form.peletHarga} onChange={handleChange} required />
          </div>
        </div>

        {/* 4. Harga Kapur Dolomit */}
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>HARGA KAPUR DOLOMIT</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="number" className="form-input" name="dolomitQty" placeholder="Berat (Gram)" value={form.dolomitQty} onChange={handleChange} required />
            <input type="number" className="form-input" name="dolomitHarga" placeholder="Harga (Rp)" value={form.dolomitHarga} onChange={handleChange} required />
          </div>
        </div>

        {/* 5. Harga Garam */}
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>HARGA GARAM</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="number" className="form-input" name="garamQty" placeholder="Berat (Gram)" value={form.garamQty} onChange={handleChange} required />
            <input type="number" className="form-input" name="garamHarga" placeholder="Harga (Rp)" value={form.garamHarga} onChange={handleChange} required />
          </div>
        </div>

        {/* 6. Harga Vitamin Ikan */}
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>HARGA VITAMIN IKAN</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="number" className="form-input" name="vitaminQty" placeholder="Jumlah" value={form.vitaminQty} onChange={handleChange} required />
            <input type="number" className="form-input" name="vitaminHarga" placeholder="Harga (Rp)" value={form.vitaminHarga} onChange={handleChange} required />
          </div>
        </div>

        {/* --- PENAMBAHAN PENGELUARAN MANUAL --- */}
        {extraPengeluaran.map((item, index) => (
          <div key={item.id} style={{ position: 'relative', background: '#1e293b', padding: '10px', borderRadius: '10px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 'bold' }}>PENGELUARAN TAMBAHAN {index + 1}</label>
              
              {/* Tombol Titik Tiga Vertikal (⋮) */}
              <div style={{ position: 'relative' }}>
                <button 
                  type="button" 
                  onClick={() => setMenuId(menuId === item.id ? null : item.id)} 
                  style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', padding: '0 5px' }}
                >
                  ⋮
                </button>

                {/* Dropdown Edit / Hapus */}
                {menuId === item.id && (
                  <div style={{ position: 'absolute', right: 0, top: '25px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', zIndex: 10, overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.4)' }}>
                    <button type="button" onClick={() => handleEditExtra(item.id)} style={{ display: 'block', width: '100%', padding: '6px 12px', background: 'none', border: 'none', color: '#38bdf8', textAlign: 'left', cursor: 'pointer', fontSize: '0.75rem', borderBottom: '1px solid #334155' }}>Edit</button>
                    <button type="button" onClick={() => handleHapusExtra(item.id)} style={{ display: 'block', width: '100%', padding: '6px 12px', background: 'none', border: 'none', color: '#ef4444', textAlign: 'left', cursor: 'pointer', fontSize: '0.75rem' }}>Hapus</button>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <input type="text" className="form-input" placeholder="Nama Pengeluaran (Contoh: Obat Ikan)" value={item.nama} onChange={(e) => handleExtraChange(item.id, 'nama', e.target.value)} required />
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="text" className="form-input" placeholder="Jumlah & Satuan (Contoh: 2 Botol)" value={item.satuan} onChange={(e) => handleExtraChange(item.id, 'satuan', e.target.value)} required />
                <input type="number" className="form-input" placeholder="Harga (Rp)" value={item.harga} onChange={(e) => handleExtraChange(item.id, 'harga', e.target.value)} required />
              </div>
            </div>
          </div>
        ))}

        {/* Tombol Tambah Pengeluaran */}
        <button 
          type="button" 
          onClick={handleTambahPengeluaran}
          style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', textAlign: 'center', padding: '8px 0', borderTop: '1px solid #334155', borderBottom: '1px solid #334155', margin: '5px 0' }}
        >
          + Tambah Pengeluaran
        </button>

        {/* Tombol Simpan */}
        <button 
          type="submit" 
          className="btn-primary" 
          style={{ backgroundColor: '#10b981', color: '#ffffff', fontWeight: 'bold', marginTop: '10px' }}
        >
          Simpan ke Jurnal RAB
        </button>
      </form>

      {/* Bagian Daftar Jurnal Tersimpan */}
      <div style={{ marginTop: '25px', borderTop: '1px solid #334155', paddingTop: '15px' }}>
        <h4 style={{ color: '#38bdf8', fontSize: '0.85rem', marginBottom: '10px', textAlign: 'center' }}>Jurnal RAB Tersimpan</h4>
        
        {jurnalList.length === 0 ? (
          <div style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', textAlign: 'center', color: '#64748b', fontSize: '0.75rem', border: '1px dashed #334155' }}>
            Belum ada jurnal RAB tersimpan.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {jurnalList.map((item) => (
              <div key={item.id} style={{ background: '#1e293b', padding: '10px 12px', borderRadius: '8px', border: '1px solid #334155', fontSize: '0.75rem' }}>
                <div style={{ color: '#38bdf8', fontWeight: 'bold', marginBottom: '6px' }}>📅 {item.tanggal}</div>
                <div>🐟 Bibit: {item.bibitQty} ekor (Rp {Number(item.bibitHarga).toLocaleString()})</div>
                <div>🟦 Alas Kolam: {item.alasQty} meter (Rp {Number(item.alasHarga).toLocaleString()})</div>
                <div>🥣 Pelet: {item.peletQty} gram (Rp {Number(item.peletHarga).toLocaleString()})</div>
                <div>⚪ Dolomit: {item.dolomitQty} gram (Rp {Number(item.dolomitHarga).toLocaleString()})</div>
                <div>🧂 Garam: {item.garamQty} gram (Rp {Number(item.garamHarga).toLocaleString()})</div>
                <div>💊 Vitamin: {item.vitaminQty} (Rp {Number(item.vitaminHarga).toLocaleString()})</div>
                {item.extraPengeluaran && item.extraPengeluaran.map((ex, idx) => (
                  <div key={idx} style={{ color: '#f59e0b', marginTop: '2px' }}>
                    📌 {ex.nama}: {ex.satuan} (Rp {Number(ex.harga).toLocaleString()})
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}