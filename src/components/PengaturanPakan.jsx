import React, { useState } from 'react';

// Berikan nilai default objek kosong { tglMulai: '', tglSelesai: '' } agar tidak error jika data kosong
export default function PengaturanPakan({ data = { tglMulai: '', tglSelesai: '' }, onUpdate, onBack, loading }) {
  const [form, setForm] = useState(data);
  const [list, setList] = useState([
    { id: 1, jam: '08:00', durasi: '5' },
    { id: 2, jam: '17:00', durasi: '5' }
  ]);
  const [jamBaru, setJamBaru] = useState('');
  const [durasiBaru, setDurasiBaru] = useState('');
  const [menuId, setMenuId] = useState(null);

  const handleTambah = (e) => {
    e.preventDefault();
    setList([...list, { id: Date.now(), jam: jamBaru, durasi: durasiBaru }]);
    setJamBaru('');
    setDurasiBaru('');
  };

  const handleHapus = (id) => {
    if (window.confirm("Yakin ingin menghapus jadwal ini?")) {
      setList(list.filter(item => item.id !== id));
    }
    setMenuId(null);
  };

  const handleEdit = (item) => {
    const jamEdit = prompt("Ubah Jam (HH:MM):", item.jam);
    const durasiEdit = prompt("Ubah Durasi (Detik):", item.durasi);
    if (jamEdit && durasiEdit) {
      setList(list.map(i => i.id === item.id ? { ...i, jam: jamEdit, durasi: durasiEdit } : i));
    }
    setMenuId(null);
  };

  return (
    <div style={{ width: '100%' }}>
      <button type="button" className="btn-primary" style={{ backgroundColor: '#1e293b', border: '1px solid #334155', marginBottom: '15px' }} onClick={onBack}>
        ← Kembali ke Menu
      </button>

      <h3 style={{ color: '#38bdf8', textAlign: 'center', margin: '0 0 15px 0' }}>Pengaturan Jadwal Pakan</h3>

      {/* Form Utama Rentang Tanggal */}
      <form onSubmit={(e) => { e.preventDefault(); onUpdate(form); }} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold' }}>RENTANG TANGGAL</label>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input type="number" className="form-input" value={form.tglMulai || ''} onChange={(e) => setForm({...form, tglMulai: e.target.value})} required />
          <span style={{ color: '#94a3b8' }}>s/d</span>
          <input type="number" className="form-input" value={form.tglSelesai || ''} onChange={(e) => setForm({...form, tglSelesai: e.target.value})} required />
        </div>

        <button type="submit" className="btn-primary" style={{ backgroundColor: '#38bdf8', color: '#0f172a' }} disabled={loading}>
          {loading ? 'MENYIMPAN...' : 'PERBARUI DATA & AKTIFKAN'}
        </button>
      </form>

      <hr style={{ borderColor: '#334155', margin: '20px 0' }} />

      {/* Form Tambah Jadwal Baru */}
      <form onSubmit={handleTambah} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px', background: '#0f172a', padding: '12px', borderRadius: '10px' }}>
        <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 'bold' }}>+ Tambah Jadwal Pakan</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input type="time" className="form-input" value={jamBaru} onChange={(e) => setJamBaru(e.target.value)} required />
          <input type="number" className="form-input" placeholder="Detik" value={durasiBaru} onChange={(e) => setDurasiBaru(e.target.value)} required />
        </div>
        <button type="submit" className="btn-primary" style={{ backgroundColor: '#059669', padding: '8px', fontSize: '0.85rem' }}>
          Simpan Jadwal
        </button>
      </form>

      {/* Daftar Jadwal */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {list.map((item) => (
          <div key={item.id} style={{ background: '#334155', padding: '10px 14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>🕒 {item.jam} WIB</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Durasi: {item.durasi} detik</div>
            </div>

            {/* Tombol Titik Tiga Vertikal (⋮) */}
            <div style={{ position: 'relative' }}>
              <button 
                type="button" 
                onClick={() => setMenuId(menuId === item.id ? null : item.id)} 
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.3rem', cursor: 'pointer', padding: '0 5px', lineHeight: 1 }}
                title="Menu"
              >
                ⋮
              </button>

              {/* Opsi Menu Dropdown: Edit & Hapus */}
              {menuId === item.id && (
                <div style={{ position: 'absolute', right: 0, top: '25px', background: '#1e293b', border: '1px solid #475569', borderRadius: '6px', zIndex: 5, overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                  <button type="button" onClick={() => handleEdit(item)} style={{ display: 'block', width: '100%', padding: '8px 14px', background: 'none', border: 'none', color: '#38bdf8', textAlign: 'left', cursor: 'pointer', fontSize: '0.75rem', borderBottom: '1px solid #334155' }}>Edit</button>
                  <button type="button" onClick={() => handleHapus(item.id)} style={{ display: 'block', width: '100%', padding: '8px 14px', background: 'none', border: 'none', color: '#ef4444', textAlign: 'left', cursor: 'pointer', fontSize: '0.75rem' }}>Hapus</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}