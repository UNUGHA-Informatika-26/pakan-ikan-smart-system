import React, { useState } from 'react';

// Fungsi helper format Rupiah (Rp 10.000,00)
const formatRupiah = (angka) => {
  if (!angka || isNaN(angka)) return 'Rp 0,00';
  const numberString = Number(angka).toFixed(2).replace('.', ',');
  const split = numberString.split(',');
  let sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    let separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah + ',00';
  return 'Rp ' + rupiah;
};

export default function Rab({ onBack }) {
  // State form utama (hanya Bibit Ikan & Pelet)
  const [form, setForm] = useState({
    bibitQty: '', bibitHarga: '',
    peletQty: '', peletHarga: ''
  });

  // State untuk pengeluaran tambahan kustom
  const [extraPengeluaran, setExtraPengeluaran] = useState([]);
  const [menuExtraId, setMenuExtraId] = useState(null);

  // State untuk jurnal tersimpan & mode edit
  const [jurnalList, setJurnalList] = useState([]);
  const [menuJurnalId, setMenuJurnalId] = useState(null);
  const [editJurnalId, setEditJurnalId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
    setMenuExtraId(null);
  };

  const handleHapusJurnal = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus jurnal RAB ini?")) {
      setJurnalList(jurnalList.filter(j => j.id !== id));
    }
    setMenuJurnalId(null);
  };

  const handleEditJurnal = (item) => {
    setForm({
      bibitQty: item.bibitQty || '', bibitHarga: item.bibitHarga || '',
      peletQty: item.peletQty || '', peletHarga: item.peletHarga || ''
    });
    setExtraPengeluaran(item.extraPengeluaran || []);
    setEditJurnalId(item.id);
    setMenuJurnalId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Algoritma perhitungan total pengeluaran (Bibit + Pelet + Tambahan)
  const hitungTotal = (currentForm, currentExtra) => {
    let total = 
      Number(currentForm.bibitHarga || 0) +
      Number(currentForm.peletHarga || 0);

    if (currentExtra && currentExtra.length > 0) {
      currentExtra.forEach(ex => {
        total += Number(ex.harga || 0);
      });
    }
    return total;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalPengeluaran = hitungTotal(form, extraPengeluaran);

    if (editJurnalId) {
      setJurnalList(jurnalList.map(j => j.id === editJurnalId ? {
        ...j,
        ...form,
        extraPengeluaran,
        total: totalPengeluaran
      } : j));
      setEditJurnalId(null);
      alert("Jurnal RAB Berhasil Diperbarui!");
    } else {
      const dataBaru = {
        id: Date.now(),
        ...form,
        extraPengeluaran,
        total: totalPengeluaran,
        tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
      };
      setJurnalList([dataBaru, ...jurnalList]);
      alert("Jurnal RAB Berhasil Disimpan!");
    }

    // Reset Form
    setForm({ bibitQty: '', bibitHarga: '', peletQty: '', peletHarga: '' });
    setExtraPengeluaran([]);
  };

  return (
    <div style={{ width: '100%' }}>
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
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
          {editJurnalId ? 'Edit Jurnal RAB' : 'Masukkan rincian Bibit & Pelet (tidak wajib diisi semua)'}
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
        
        {/* 1. Harga Bibit Ikan */}
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>HARGA BIBIT IKAN</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="number" className="form-input" name="bibitQty" placeholder="Jumlah (Ekor)" value={form.bibitQty} onChange={handleChange} />
            <input type="number" className="form-input" name="bibitHarga" placeholder="Harga (Rp)" value={form.bibitHarga} onChange={handleChange} />
          </div>
        </div>

        {/* 2. Harga Pelet */}
        <div>
          <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>HARGA PELET</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input type="number" className="form-input" name="peletQty" placeholder="Berat (Gram)" value={form.peletQty} onChange={handleChange} />
            <input type="number" className="form-input" name="peletHarga" placeholder="Harga (Rp)" value={form.peletHarga} onChange={handleChange} />
          </div>
        </div>

        {/* --- PENAMBAHAN PENGELUARAN MANUAL --- */}
        {extraPengeluaran.map((item, index) => (
          <div key={item.id} style={{ position: 'relative', background: '#1e293b', padding: '10px', borderRadius: '10px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 'bold' }}>PENGELUARAN TAMBAHAN {index + 1}</label>
              
              <div style={{ position: 'relative' }}>
                <button 
                  type="button" 
                  onClick={() => setMenuExtraId(menuExtraId === item.id ? null : item.id)} 
                  style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', padding: '0 5px' }}
                >
                  ⋮
                </button>

                {menuExtraId === item.id && (
                  <div style={{ position: 'absolute', right: 0, top: '25px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', zIndex: 10, overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.4)' }}>
                    <button type="button" onClick={() => handleHapusExtra(item.id)} style={{ display: 'block', width: '100%', padding: '6px 12px', background: 'none', border: 'none', color: '#ef4444', textAlign: 'left', cursor: 'pointer', fontSize: '0.75rem' }}>Hapus</button>
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <input type="text" className="form-input" placeholder="Nama Pengeluaran (Contoh: Obat Ikan)" value={item.nama} onChange={(e) => handleExtraChange(item.id, 'nama', e.target.value)} />
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="text" className="form-input" placeholder="Jumlah & Satuan (Contoh: 2 Botol)" value={item.satuan} onChange={(e) => handleExtraChange(item.id, 'satuan', e.target.value)} />
                <input type="number" className="form-input" placeholder="Harga (Rp)" value={item.harga} onChange={(e) => handleExtraChange(item.id, 'harga', e.target.value)} />
              </div>
            </div>
          </div>
        ))}

        <button 
          type="button" 
          onClick={handleTambahPengeluaran}
          style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', textAlign: 'center', padding: '8px 0', borderTop: '1px solid #334155', borderBottom: '1px solid #334155', margin: '5px 0' }}
        >
          + Tambah Pengeluaran
        </button>

        {/* Tombol Simpan / Perbarui */}
        <button 
          type="submit" 
          className="btn-primary" 
          style={{ backgroundColor: editJurnalId ? '#38bdf8' : '#10b981', color: '#ffffff', fontWeight: 'bold', marginTop: '10px' }}
        >
          {editJurnalId ? 'Simpan Perubahan Jurnal' : 'Simpan ke Jurnal RAB'}
        </button>
      </form>

      {/* --- BAGIAN DAFTAR JURNAL TERSIMPAN --- */}
      <div style={{ marginTop: '25px', borderTop: '1px solid #334155', paddingTop: '15px' }}>
        <h4 style={{ color: '#38bdf8', fontSize: '0.85rem', marginBottom: '10px', textAlign: 'center' }}>Jurnal RAB Tersimpan</h4>
        
        {jurnalList.length === 0 ? (
          <div style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', textAlign: 'center', color: '#64748b', fontSize: '0.75rem', border: '1px dashed #334155' }}>
            Belum ada jurnal RAB tersimpan.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {jurnalList.map((item) => (
              <div key={item.id} style={{ position: 'relative', background: '#1e293b', padding: '12px', borderRadius: '8px', border: '1px solid #334155', fontSize: '0.75rem' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ color: '#38bdf8', fontWeight: 'bold' }}>📅 {item.tanggal}</div>
                  
                  <div style={{ position: 'relative' }}>
                    <button 
                      type="button" 
                      onClick={() => setMenuJurnalId(menuJurnalId === item.id ? null : item.id)} 
                      style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', padding: '0 5px' }}
                    >
                      ⋮
                    </button>

                    {menuJurnalId === item.id && (
                      <div style={{ position: 'absolute', right: 0, top: '25px', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', zIndex: 10, overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
                        <button type="button" onClick={() => handleEditJurnal(item)} style={{ display: 'block', width: '100%', padding: '8px 14px', background: 'none', border: 'none', color: '#38bdf8', textAlign: 'left', cursor: 'pointer', fontSize: '0.75rem', borderBottom: '1px solid #334155' }}>Edit</button>
                        <button type="button" onClick={() => handleHapusJurnal(item.id)} style={{ display: 'block', width: '100%', padding: '8px 14px', background: 'none', border: 'none', color: '#ef4444', textAlign: 'left', cursor: 'pointer', fontSize: '0.75rem' }}>Hapus</button>
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

                {/* Total Pengeluaran */}
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