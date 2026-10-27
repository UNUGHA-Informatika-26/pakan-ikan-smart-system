import React, { useState } from 'react';

// Fungsi helper Rupiah menggunakan Intl.NumberFormat (Sangat Ringan & Native)
const formatRupiah = (angka) => {
  if (!angka || isNaN(angka)) return 'Rp 0,00';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(angka);
};

export default function Rab({ onBack }) {
  const [form, setForm] = useState({ bibitQty: '', bibitHarga: '', peletQty: '', peletHarga: '' });
  const [extraPengeluaran, setExtraPengeluaran] = useState([]);
  const [jurnalList, setJurnalList] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleTambahPengeluaran = () => {
    setExtraPengeluaran([...extraPengeluaran, { id: Date.now(), nama: '', qty: '', satuan: '', harga: '' }]);
  };

  const handleExtraChange = (id, field, value) => {
    setExtraPengeluaran(extraPengeluaran.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleHapusExtra = (id) => {
    setExtraPengeluaran(extraPengeluaran.filter(item => item.id !== id));
    setActiveMenuId(null);
  };

  const handleHapusJurnal = (index) => {
    if (window.confirm("Hapus jurnal ini?")) {
      const list = [...jurnalList];
      list.splice(index, 1);
      setJurnalList(list);
    }
    setActiveMenuId(null);
  };

  const handleEditJurnal = (item, index) => {
    setForm({
      bibitQty: item.bibitQty || '',
      bibitHarga: item.bibitHarga || '',
      peletQty: item.peletQty || '',
      peletHarga: item.peletHarga || ''
    });
    setExtraPengeluaran(item.extraPengeluaran ? [...item.extraPengeluaran] : []);
    setEditIndex(index);
    setActiveMenuId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Algoritma total kilat
    let total = Number(form.bibitHarga || 0) + Number(form.peletHarga || 0);
    extraPengeluaran.forEach(ex => { total += Number(ex.harga || 0); });

    const dataItem = {
      id: editIndex !== null ? jurnalList[editIndex].id : Date.now(),
      tanggal: editIndex !== null ? jurnalList[editIndex].tanggal : new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      ...form,
      extraPengeluaran: [...extraPengeluaran],
      total
    };

    if (editIndex !== null) {
      const list = [...jurnalList];
      list[editIndex] = dataItem;
      setJurnalList(list);
      setEditIndex(null);
      alert("Jurnal Diperbarui!");
    } else {
      setJurnalList([dataItem, ...jurnalList]);
      alert("Jurnal Disimpan!");
    }

    setForm({ bibitQty: '', bibitHarga: '', peletQty: '', peletHarga: '' });
    setExtraPengeluaran([]);
  };

  return (
    <div style={{ width: '100%' }}>
      <button type="button" className="btn-primary" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', marginBottom: '15px' }} onClick={onBack}>
        ← Kembali ke Menu
      </button>

      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <h3 style={{ color: '#38bdf8', fontSize: '1.1rem', margin: '0 0 5px 0' }}>Rencana Anggaran & Jurnal RAB</h3>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
          {editIndex !== null ? '⚠️ Mode Edit Jurnal' : 'Masukkan rincian pengeluaran (opsional)'}
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>HARGA BIBIT IKAN</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="number" className="form-input" name="bibitQty" placeholder="Jumlah (Ekor)" value={form.bibitQty} onChange={handleChange} />
            <input type="number" className="form-input" name="bibitHarga" placeholder="Harga (Rp)" value={form.bibitHarga} onChange={handleChange} />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>HARGA PELET</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="number" className="form-input" name="peletQty" placeholder="Berat (Gram)" value={form.peletQty} onChange={handleChange} />
            <input type="number" className="form-input" name="peletHarga" placeholder="Harga (Rp)" value={form.peletHarga} onChange={handleChange} />
          </div>
        </div>

        {extraPengeluaran.map((item, index) => (
          <div key={item.id} style={{ position: 'relative', background: '#1e293b', padding: '10px', borderRadius: '10px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 'bold' }}>PENGELUARAN TAMBAHAN {index + 1}</label>
              
              <div style={{ position: 'relative' }}>
                <button type="button" onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', padding: '0 5px' }}>
                  ⋮
                </button>
                {activeMenuId === item.id && (
                  <div style={{ position: 'absolute', right: 0, top: '25px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', zIndex: 10, boxShadow: '0 4px 10px rgba(0,0,0,0.4)' }}>
                    <button type="button" onClick={() => handleHapusExtra(item.id)} style={{ display: 'block', width: '100%', padding: '6px 12px', background: 'none', border: 'none', color: '#ef4444', textAlign: 'left', cursor: 'pointer', fontSize: '0.75rem' }}>Hapus</button>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <input type="text" className="form-input" placeholder="Nama Pengeluaran" value={item.nama} onChange={(e) => handleExtraChange(item.id, 'nama', e.target.value)} />
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="text" className="form-input" placeholder="Jumlah & Satuan" value={item.satuan} onChange={(e) => handleExtraChange(item.id, 'satuan', e.target.value)} />
                <input type="number" className="form-input" placeholder="Harga (Rp)" value={item.harga} onChange={(e) => handleExtraChange(item.id, 'harga', e.target.value)} />
              </div>
            </div>
          </div>
        ))}

        <button type="button" onClick={handleTambahPengeluaran} style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', textAlign: 'center', padding: '8px 0', borderTop: '1px solid #334155', borderBottom: '1px solid #334155', margin: '5px 0' }}>
          + Tambah Pengeluaran
        </button>

        <button type="submit" className="btn-primary" style={{ backgroundColor: editIndex !== null ? '#38bdf8' : '#10b981', color: '#ffffff', fontWeight: 'bold', marginTop: '10px' }}>
          {editIndex !== null ? 'Simpan Perubahan Jurnal' : 'Simpan ke Jurnal RAB'}
        </button>
      </form>

      <div style={{ marginTop: '25px', borderTop: '1px solid #334155', paddingTop: '15px' }}>
        <h4 style={{ color: '#38bdf8', fontSize: '0.85rem', marginBottom: '10px', textAlign: 'center' }}>Jurnal RAB Tersimpan</h4>
        
        {jurnalList.length === 0 ? (
          <div style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', textAlign: 'center', color: '#64748b', fontSize: '0.75rem', border: '1px dashed #334155' }}>
            Belum ada jurnal RAB tersimpan.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {jurnalList.map((item, index) => (
              <div key={item.id} style={{ position: 'relative', background: '#1e293b', padding: '12px', borderRadius: '8px', border: '1px solid #334155', fontSize: '0.75rem' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ color: '#38bdf8', fontWeight: 'bold' }}>📅 {item.tanggal}</div>
                  
                  <div style={{ position: 'relative' }}>
                    <button type="button" onClick={() => setActiveMenuId(activeMenuId === `jurnal-${index}` ? null : `jurnal-${index}`)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', padding: '0 5px' }}>
                      ⋮
                    </button>

                    {activeMenuId === `jurnal-${index}` && (
                      <div style={{ position: 'absolute', right: 0, top: '25px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', zIndex: 10, overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
                        <button type="button" onClick={() => handleEditJurnal(item, index)} style={{ display: 'block', width: '100%', padding: '8px 14px', background: 'none', border: 'none', color: '#38bdf8', textAlign: 'left', cursor: 'pointer', fontSize: '0.75rem', borderBottom: '1px solid #334155' }}>Edit</button>
                        <button type="button" onClick={() => handleHapusJurnal(index)} style={{ display: 'block', width: '100%', padding: '8px 14px', background: 'none', border: 'none', color: '#ef4444', textAlign: 'left', cursor: 'pointer', fontSize: '0.75rem' }}>Hapus</button>
                      </div>
                    )}
                  </div>
                </div>

                {item.bibitHarga && <div>🐟 Bibit: {item.bibitQty} ekor ({formatRupiah(item.bibitHarga)})</div>}
                {item.peletHarga && <div>🥣 Pelet: {item.peletQty} gram ({formatRupiah(item.peletHarga)})</div>}
                
                {item.extraPengeluaran && item.extraPengeluaran.map((ex, idx) => (
                  ex.nama && (
                    <div key={idx} style={{ color: '#f59e0b', marginTop: '2px' }}>
                      📌 {ex.nama}: {ex.satuan} ({formatRupiah(ex.harga)})
                    </div>
                  )
                ))}

                <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px dashed #334155', color: '#10b981', fontWeight: 'bold', fontSize: '0.8rem' }}>
                  💰 Total Pengeluaran: {formatRupiah(item.total)}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}