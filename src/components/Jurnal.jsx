import React, { useState, useEffect, useCallback, useMemo } from 'react';

export default function Jurnal({ onBack }) {
  const [catatan, setCatatan] = useState(() => {
    try {
      const saved = localStorage.getItem("jurnalDataV2");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [inputTeks, setInputTeks] = useState("");

  useEffect(() => {
    localStorage.setItem("jurnalDataV2", JSON.stringify(catatan));
  }, [catatan]);

  // Menggunakan useCallback agar fungsi tidak dibuat ulang terus di memori
  const tambahCatatan = useCallback(() => {
    if (inputTeks.trim() !== "") {
      setCatatan(prev => [
        ...prev, 
        { teks: inputTeks, tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }
      ]);
      setInputTeks("");
    }
  }, [inputTeks]);

  const hapusCatatan = useCallback((index) => {
    setCatatan(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Menggunakan useMemo untuk menghitung jumlah catatan penting secara efisien
  const totalCatatanPenting = useMemo(() => {
    return catatan.filter(item => item.teks.toLowerCase().includes('penting')).length;
  }, [catatan]);

  return (
    <div style={{ width: '100%' }}>
      <button className="btn-primary" style={{ backgroundColor: '#475569' }} onClick={onBack}>
        ← Kembali ke Menu
      </button>

      <h3 style={{ color: '#38bdf8', marginTop: '15px' }}>Log Catatan Harian</h3>
      <p style={{ fontSize: '0.8rem', color: '#34d399' }}>Catatan Penting: {totalCatatanPenting}</p>

      <div style={{ marginBottom: '20px', background: '#334155', padding: '15px', borderRadius: '12px' }}>
        <textarea 
          placeholder="Tulis kegiatan farming hari ini..."
          value={inputTeks}
          onChange={(e) => setInputTeks(e.target.value)}
          className="form-input"
          style={{ minHeight: '90px', resize: 'vertical' }}
        />
        <button className="btn-primary" onClick={tambahCatatan}>
          💾 Simpan Ke Riwayat
        </button>
      </div>

      <div>
        {catatan.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>Belum ada catatan.</div>
        ) : (
          [...catatan].reverse().map((item, index) => {
            const indexAsli = catatan.length - 1 - index;
            return (
              <div key={indexAsli} style={{ background: '#334155', padding: '12px', marginBottom: '10px', borderRadius: '10px', borderLeft: '4px solid #10b981', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <small style={{ color: '#34d399', fontSize: '0.75rem' }}>{item.tanggal}</small>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem' }}>{item.teks}</p>
                </div>
                <button onClick={() => hapusCatatan(indexAsli)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}>
                  Hapus
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}