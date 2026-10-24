
import { createClient } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';

const supabase = createClient('https://tqfspwtaexpxlmflaskd.supabase.co', 'sb_publishable_QTf6sd3BIoxhRf7u67-1JA_lPiLm_EB');

function App() {
// --- STATE MANAGEMENT ---
  // Menggunakan localStorage agar posisi halaman/auth tidak hilang saat refresh
  const [currentScreen, setCurrentScreen] = useState(() => {
    try {
      return localStorage.getItem('app_screen') || 'welcome';
    } catch (e) {
      return 'welcome';
    }
  });

// --- STATE MANAGEMENT ---
  const [activePage, setActivePage] = useState('beranda');
  const [loading, setLoading] = useState(true);
  const [inputTeks, setInputTeks] = useState("");
  
  // State untuk form Pendaftaran (Daftar)
  const [rNama, setRNama] = useState("");
  const [rMail, setRMail] = useState("");
  const [rHp, setRHp] = useState("");
  const [rPass, setRPass] = useState("");
  const [rPass2, setRPass2] = useState("");
  const [showRPass, setShowRPass] = useState(false);
  const [showRPass2, setShowRPass2] = useState(false);
  const [regErr, setRegErr] = useState("");

  // State untuk form Masuk (Login)
  const [lMail, setLMail] = useState("");
  const [lPass, setLPass] = useState("");
  const [showLPass, setShowLPass] = useState(false);
  const [loginErr, setLoginErr] = useState("");

  // Data Jadwal Pakan
  const [data, setData] = useState({
    tglMulai: 1, tglSelesai: 30,
    jamPagi: 8, menitPagi: 0,
    jamSore: 17, menitSore: 0,
    durasi: 5
  });

  // Data Wi-Fi (Bebas karakter & spasi)
  const [wifi, setWifi] = useState({
    ssid: '',
    password: ''
  });

  // State Catatan (Mengambil data awal dari localStorage jika ada)
  const [catatan, setCatatan] = useState(() => {
    try {
      const saved = localStorage.getItem("jurnalDataV2");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // --- EFEK (SIDE EFFECTS) ---
  
  // 1. Inisialisasi awal & Fetch Data Supabase
  useEffect(() => {
    document.body.style.backgroundColor = '#0f172a';
    document.body.style.margin = '0';
    document.body.style.padding = '20px';
    document.body.style.minHeight = '100vh';
    fetchData();
  }, []);

 // 2. Otomatis simpan data catatan ke localStorage setiap ada perubahan state
  useEffect(() => {
    localStorage.setItem("jurnalDataV2", JSON.stringify(catatan));
  }, [catatan]);
  
  // --- FUNGSI-FUNGSI ---
  
  // Ambil Data dari Supabase
  const fetchData = async () => {
    try {
      const { data: dbData, error } = await supabase
        .from('jadwal_pakan')
        .select('*')
        .eq('pengenal', 1)
        .single();

      if (errorPakan) console.error("Error pakan:", errorPakan.message);

      if (dbData) {
        setData({
          tglMulai: dbData.tgl_mulai, tglSelesai: dbData.tgl_selesai,
          jamPagi: dbData.jam_pagi, menitPagi: dbData.menit_pagi,
          jamSore: dbData.jam_sore, menitSore: dbData.menit_sore,
          durasi: dbData.durasi_detik
        });
      }

      // 2. Fetch Data Wi-Fi dari tabel 'setting_wifi'
      const { data: dbWifi, error: errorWifi } = await supabase
        .from('setting_wifi')
        .select('*')
        .eq('id', 1)
        .single();

    if (errorWifi) console.error("Error wifi:", errorWifi.message);
      if (dbWifi) {
        setWifi({
          ssid: dbWifi.ssid || '',
          password: dbWifi.password || ''
        });
      }

    } catch (error) {
      console.error("Gagal memuat data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update Data ke Supabase
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('jadwal_pakan')
        .update({
          jam_pagi: parseInt(data.jamPagi),
          menit_pagi: parseInt(data.menitPagi),
          jam_sore: parseInt(data.jamSore),
          menit_sore: parseInt(data.menitSore),
          durasi_detik: parseInt(data.durasi)
        })
        .eq('pengenal', 1);

      if (error) throw error;
      alert("Data berhasil dikirim ke alat!");
    } catch (error) {
      alert("Gagal update: " + error.message);
    } finally {
      setLoading(false);
    }
  };

    // Update Wi-Fi ke Supabase
  const handleUpdateWifi = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('setting_wifi')
        .update({
          ssid: wifi.ssid,          // Mengirim string murni (mendukung spasi & karakter unik)
          password: wifi.password   // Mengirim string murni
        })
        .eq('id', 1);

      if (error) throw error;
      alert("Konfigurasi Wi-Fi berhasil dikirim ke alat!");
    } catch (error) {
      alert("Gagal memperbarui Wi-Fi: " + error.message);
    } finally {
      setLoading(false);
    }
  };


  // Tambah Catatan Jurnal Jokal
  const tambahCatatan = () => {
    if (inputTeks.trim() !== "") {
      const catatanBaru = [
        ...catatan, 
        { teks: inputTeks, tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }
      ];
      setCatatan(catatanBaru);
      setInputTeks("");
    }
  };

  // Hapus Catatan Jurnal Lokal
  const hapusCatatan = (index) => {
    const sisaCatatan = catatan.filter((_, i) => i !== index);
    setCatatan(sisaCatatan);
  };

  // --- STYLING (OBJECT) ---
  const containerStyle = { fontFamily: "'Segoe UI', sans-serif", maxWidth: '400px', margin: '0 auto', padding: '30px', backgroundColor: '#1e293b', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', color: '#f1f5f9' };
  const inputStyle = { width: '100%', padding: '12px', border: '1px solid #334155', borderRadius: '10px', fontSize: '1.1rem', backgroundColor: '#0f172a', color: '#fff', boxSizing: 'border-box' };
  const buttonStyle = { width: '100%', padding: '15px', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' };
  const menuCardStyle = { padding: '20px', backgroundColor: '#334155', borderRadius: '15px', cursor: 'pointer', textAlign: 'center', transition: '0.3s' };
  const backButtonStyle = { ...buttonStyle, backgroundColor: '#475569', marginBottom: '20px' };

  // Style Tambahan untuk Auth (Pendaftaran & Masuk)
  const styles = {
    screen: { display: 'flex', flexDirection: 'column', width: '100%' },
    authName: { fontSize: '24px', fontWeight: 'bold', color: '#10b981', textAlign: 'center', marginBottom: '8px' },
    authLead: { fontSize: '0.9rem', color: '#94a3b8', textAlign: 'center', marginBottom: '20px' },
    tagline: { fontSize: '0.95rem', color: '#94a3b8', marginBottom: '25px' },
    field: { marginBottom: '15px', textAlign: 'left' },
    authInput: { width: '100%', height: '45px', padding: '10px 15px', boxSizing: 'border-box', backgroundColor: '#162238', border: '1px solid #2a3b5c', borderRadius: '8px', color: '#fff', fontSize: '14px', outline: 'none' },
    pillBtn: { width: '100%', padding: '14px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' },
    alt: { textAlign: 'center', fontSize: '0.85rem', color: '#94a3b8', marginTop: '15px' },
    linkBtn: { background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold', padding: 0, fontSize: 'inherit' },
    err: { color: '#ef4444', fontSize: '0.85rem', margin: '5px 0', textAlign: 'center' }
  };

  if (loading) return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Memuat...</div>;  


return (
    <div style={containerStyle}>

     {/* HEADER UTAMA */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ margin: '0', color: '#10b981' }}>🌱 SMART FARMING</h2>
        <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '5px 0 0 0' }}>KSTM AL IHYA</p>
      </div>

      <main>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

          {/* ========================================== */}
          {/* 1. SELAMAT DATANG (WELCOME)                */}
          {/* ========================================== */}
          {currentScreen === 'welcome' && (
            <section className="screen auth-screen center" style={{...styles.screen, textAlign:'center', justifyContent:'center', minHeight:'320px'}}>
              <h1 style={styles.authName}>SMART PAKAN IKAN</h1>
              <p style={styles.tagline}>Kelola Pakan Ikanmu Dengan Cerdas!</p>
              <button style={styles.pillBtn} onClick={() => changeScreen('daftar')} type="button">Daftar</button>
              <p style={styles.alt}>Sudah punya akun? <button style={styles.linkBtn} onClick={() => changeScreen('masuk')} type="button">Masuk di sini</button></p>
            </section>
          )}

          {/* ========================================== */}
          {/* 2. DAFTAR (REGISTRASI)                     */}
          {/* ========================================== */}
          {currentScreen === 'daftar' && (
            <section className="screen auth-screen" style={styles.screen}>
              <h1 style={styles.authName}>SMART PAKAN IKAN</h1>
              <p style={styles.authLead}>Silakan isi data untuk mendaftar:</p>
              <form onSubmit={handleRegister} style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                
                <div style={styles.field}>
                  <label style={{display:'block', marginBottom:'6px', fontSize:'0.8rem', color:'#94a3b8', fontWeight:'bold'}}>Nama Lengkap</label>
                  <input style={styles.authInput} type="text" placeholder="Masukkan Nama" value={rNama} onChange={e=>setRNama(e.target.value)} />
                </div>
                
                <div style={styles.field}>
                  <label style={{display:'block', marginBottom:'6px', fontSize:'0.8rem', color:'#94a3b8', fontWeight:'bold'}}>Email</label>
                  <input style={styles.authInput} type="email" placeholder="nama@email.com" value={rMail} onChange={e=>setRMail(e.target.value)} />
                </div>
                
                <div style={styles.field}>
                  <label style={{display:'block', marginBottom:'6px', fontSize:'0.8rem', color:'#94a3b8', fontWeight:'bold'}}>Nomor Telepon</label>
                  <input style={styles.authInput} type="tel" placeholder="0812..." value={rHp} onChange={e=>setRHp(e.target.value)} />
                </div>
                
                {/* Buat Kata Sandi dengan Ikon Mata */}
                <div style={styles.field}>
                  <label style={{display:'block', marginBottom:'6px', fontSize:'0.8rem', color:'#94a3b8', fontWeight:'bold'}}>Buat Kata Sandi</label>
                  <div style={{ position: 'relative', width: '100%', display: 'block' }}>
                    <input 
                      style={{ ...styles.authInput, paddingRight: '45px' }} 
                      type={showRPass ? 'text' : 'password'} 
                      placeholder="Min. 8 karakter" 
                      value={rPass} 
                      onChange={e => setRPass(e.target.value)} 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowRPass(!showRPass)}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#8d9bb8', height: '24px', width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {showRPass ? (
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Konfirmasi Kata Sandi dengan Ikon Mata */}
                <div style={styles.field}>
                  <label style={{display:'block', marginBottom:'6px', fontSize:'0.8rem', color:'#94a3b8', fontWeight:'bold'}}>Konfirmasi Kata Sandi</label>
                  <div style={{ position: 'relative', width: '100%', display: 'block' }}>
                    <input 
                      style={{ ...styles.authInput, paddingRight: '45px' }} 
                      type={showRPass2 ? 'text' : 'password'} 
                      placeholder="Ulangi Kata Sandi" 
                      value={rPass2} 
                      onChange={e => setRPass2(e.target.value)} 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowRPass2(!showRPass2)}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#8d9bb8', height: '24px', width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {showRPass2 ? (
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      )}
                    </button>
                  </div>
                </div>

                {regErr && <p style={styles.err}>{regErr}</p>}
                <button style={{...styles.pillBtn, width:'100%', marginTop:'10px'}} type="submit">Daftar Sekarang</button>
              </form>
              <p style={styles.alt}>Sudah punya akun? <button style={styles.linkBtn} onClick={() => changeScreen('masuk')} type="button">Masuk di sini</button></p>
            </section>
          )}

          {/* ========================================== */}
          {/* 3. MASUK (LOGIN)                           */}
          {/* ========================================== */}
          {currentScreen === 'masuk' && (
            <section className="screen auth-screen" style={styles.screen}>
              <h1 style={styles.authName}>SMART PAKAN IKAN</h1>
              <p style={styles.authLead}>Silakan masuk ke akun Anda:</p>
              <form onSubmit={handleLogin} style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                
                <div style={styles.field}>
                  <label style={{display:'block', marginBottom:'6px', fontSize:'0.8rem', color:'#94a3b8', fontWeight:'bold'}}>Email</label>
                  <input style={styles.authInput} type="email" placeholder="nama@email.com" value={lMail} onChange={e=>setLMail(e.target.value)} />
                </div>
                
                {/* Kata Sandi dengan Ikon Mata di Menu Masuk */}
                <div style={styles.field}>
                  <label style={{display:'block', marginBottom:'6px', fontSize:'0.8rem', color:'#94a3b8', fontWeight:'bold'}}>Kata Sandi</label>
                  <div style={{ position: 'relative', width: '100%', display: 'block' }}>
                    <input 
                      style={{ ...styles.authInput, paddingRight: '45px' }} 
                      type={showLPass ? 'text' : 'password'} 
                      placeholder="Min. 8 karakter" 
                      value={lPass} 
                      onChange={e => setLPass(e.target.value)} 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowLPass(!showLPass)}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#8d9bb8', height: '24px', width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {showLPass ? (
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      )}
                    </button>
                  </div>
                </div>

                {loginErr && <p style={styles.err}>{loginErr}</p>}
                <button style={{...styles.pillBtn, width:'100%', marginTop:'10px'}} type="submit">Masuk</button>
              </form>
              <p style={{...styles.alt, marginTop:'20px'}}>Belum punya akun? <button style={styles.linkBtn} onClick={() => changeScreen('daftar')} type="button">Daftar di sini</button></p>
            </section>
          )} 
      
          {/* ========================================== */}
          {/* 4. DASHBOARD UTAMA & MENU APLIKASI         */}
          {/* ========================================== */}

          {currentScreen === 'beranda_app' && (
            <div>
              {activePage === 'beranda' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>


          {/* Menu Pengaturan Pakan */}
          <div style={menuCardStyle} onClick={() => setActivePage('pengaturan')}>
            <div style={{ fontSize: '30px', marginBottom: '5px' }}>🐟</div>
            <div style={{ fontWeight: 'bold' }}>PENGATURAN PAKAN</div>
            <small style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Sinkronisasi Alat Otomatis</small>
          </div>
          
          {/* Menu Jurnal Harian */}
          <div style={menuCardStyle} onClick={() => setActivePage('jurnal')}>
            <div style={{ fontSize: '30px', marginBottom: '5px' }}>📝</div>
            <div style={{ fontWeight: 'bold' }}>JURNAL HARIAN</div>
            {/* RIWAYAT JUMLAH CATATAN AKTIF */}
            <small style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: '500' }}>
              {catatan.length} Catatan Tersimpan
            </small>
          </div>

        {/* MENU BARU: Pengaturan Wi-Fi */}
          <div style={{ ...menuCardStyle, backgroundColor: '#334155' }} onClick={() => setActivePage('wifi')}>
            <div style={{ fontSize: '30px', marginBottom: '5px' }}>📶</div>
            <div style={{ fontWeight: 'bold', color: '#38bdf8' }}>PENGATURAN WI-FI</div>
            <small style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Ganti Koneksi Internet Alat</small>
          </div>

        </div>
      )}

      {/* ========================================== */}
      {/* 2. TAMPILAN PENGATURAN PAKAN              */}
      {/* ========================================== */}
      {activePage === 'pengaturan' && (
        <div style={{ width: '100%' }}>
          <button style={backButtonStyle} onClick={() => setActivePage('beranda')}>
            ← Kembali ke Menu
          </button>
          
          <div style={{ backgroundColor: '#1e293b', textAlign: 'center' }}>
            <h3 style={{ color: '#38bdf8', marginTop: '0', marginBottom: '20px' }}>Pengaturan Jadwal Pakan</h3>
            
            {/* Rentang Tanggal */}
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>RENTANG TANGGAL</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="number" style={inputStyle} value={data.tglMulai} onChange={(e) => setData({...data, tglMulai: e.target.value})} />
                <input type="number" style={inputStyle} value={data.tglSelesai} onChange={(e) => setData({...data, tglSelesai: e.target.value})} />
              </div>
            </div>

            {/* Jadwal Pagi */}
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>JADWAL PAGI</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="number" style={inputStyle} value={data.jamPagi} onChange={(e) => setData({...data, jamPagi: e.target.value})} />
                <span>:</span>
                <input type="number" style={inputStyle} value={data.menitPagi} onChange={(e) => setData({...data, menitPagi: e.target.value})} />
              </div>
            </div>

            {/* Jadwal Sore */}
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>JADWAL SORE</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="number" style={inputStyle} value={data.jamSore} onChange={(e) => setData({...data, jamSore: e.target.value})} />
                <span>:</span>
                <input type="number" style={inputStyle} value={data.menitSore} onChange={(e) => setData({...data, menitSore: e.target.value})} />
              </div>
            </div>

            {/* Durasi */}
            <div style={{ marginBottom: '25px', textAlign: 'left' }}>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>DURASI (DETIK)</label>
              <input type="number" style={inputStyle} value={data.durasi} onChange={(e) => setData({...data, durasi: e.target.value})} />
            </div>

            <button style={buttonStyle} onClick={handleUpdate}>PERBARUI DATA & AKTIFKAN</button>
          </div>
        </div>
      )}

{/* ========================================== */}
{/* 3. TAMPILAN JURNAL HARIAN                 */}
{/* ========================================== */}
{activePage === 'jurnal' && (
  <div style={{ width: '100%' }}>
    {/* Tombol Kembali */}
    <button style={backButtonStyle} onClick={() => setActivePage('beranda')}>
      ← Kembali ke Menu
    </button>

    <h3 style={{ color: '#38bdf8', marginTop: '0', marginBottom: '15px' }}>Log Catatan Harian</h3>

    {/* Form Input Catatan Baru */}
    <div style={{ marginBottom: '25px', background: '#334155', padding: '15px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <textarea 
        placeholder="Tulis kegiatan farming hari ini (misal: pemberian suplemen, kondisi air, atau cek bobot ikan)..."
        value={inputTeks}
        onChange={(e) => setInputTeks(e.target.value)}
        style={{ width: '100%', minHeight: '90px', marginBottom: '12px', background: '#0f172a', color: 'white', borderRadius: '8px', padding: '12px', border: '1px solid #475569', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }}
      />
      <button style={{ ...buttonStyle, marginTop: '0', backgroundColor: '#10b981' }} onClick={tambahCatatan}>
        💾 Simpan Ke Riwayat
      </button>
    </div>

    {/* ========================================== */}
    {/* BAGIAN DAFTAR RIWAYAT CATATAN YANG TERSIMPAN */}
    {/* ========================================== */}
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h4 style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem', letterSpacing: '0.05em' }}>RIWAYAT AKTIVITAS</h4>
        <span style={{ fontSize: '0.8rem', backgroundColor: '#0f172a', padding: '2px 8px', borderRadius: '12px', color: '#34d399', fontWeight: 'bold' }}>
          {catatan.length} Total
        </span>
      </div>
      
      {catatan.length === 0 ? (
        /* Tampilan Jika Riwayat Masih Kosong */
        <div style={{ textAlign: 'center', color: '#64748b', padding: '30px 20px', background: '#1e293b', borderRadius: '12px', border: '2px dashed #334155', fontSize: '0.9rem' }}>
          <div style={{ fontSize: '24px', marginBottom: '5px' }}>📭</div>
          Belum ada catatan yang tersimpan.
        </div>
      ) : (
        /* Menampilkan Catatan Terbaru di Posisi Paling Atas (Reverse) */
        [...catatan].reverse().map((item, index) => {
          // Menghitung indeks asli array agar fungsi hapus tidak salah target
          const indexAsli = catatan.length - 1 - index; 
          
          return (
            <div key={indexAsli} style={{ 
              background: '#334155', 
              padding: '16px', 
              marginBottom: '12px', 
              borderRadius: '12px', 
              borderLeft: '4px solid #10b981', // Garis aksen hijau vertikal
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start'
            }}>
              {/* Konten Teks Catatan */}
              <div style={{ flex: 1, marginRight: '15px', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.75rem' }}>📅</span>
                  <small style={{ color: '#34d399', fontSize: '0.75rem', fontWeight: 'bold' }}>{item.tanggal}</small>
                </div>
                <p style={{ margin: '0', color: '#f1f5f9', whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  {item.teks}
                </p>
              </div>
              
              {/* Tombol Hapus Catatan */}
              <button 
                onClick={() => {
                  if(window.confirm("Apakah Anda yakin ingin menghapus catatan ini?")) {
                    hapusCatatan(indexAsli);
                  }
                }}
                style={{ 
                  background: '#ef4444', 
                  color: 'white', 
                  border: 'none', 
                  padding: '6px 10px', 
                  borderRadius: '6px', 
                  cursor: 'pointer', 
                  fontSize: '0.75rem', 
                  flexShrink: 0, 
                  fontWeight: 'bold',
                  transition: '0.2s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
              >
                Hapus
              </button>
            </div>
                );
              })
            )}
          </div>
        </div>
      )}

{/* ========================================== */}
      {/* 4. TAMPILAN HALAMAN PENGATURAN WI-FI (BARU)*/}
      {/* ========================================== */}
      {activePage === 'wifi' && (
        <div style={{ width: '100%' }}>
          <button style={backButtonStyle} onClick={() => setActivePage('beranda')}>
            ← Kembali ke Menu
          </button>
          
          <div style={{ backgroundColor: '#1e293b', textAlign: 'left' }}>
            <h3 style={{ color: '#38bdf8', marginTop: '0', marginBottom: '20px', textAlign: 'center' }}>Pengaturan Wi-Fi Alat</h3>
            
            {/* Input Nama Wi-Fi (SSID) */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>NAMA WI-FI (SSID)</label>
              <input 
                type="text" 
                style={inputStyle} 
                placeholder="Masukkan nama Wi-Fi Anda (Bebas Spasi)" 
                value={wifi.ssid} 
                onChange={(e) => setWifi({...wifi, ssid: e.target.value})} 
              />
            </div>

            {/* Input Password Wi-Fi */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>KATA SANDI (PASSWORD)</label>
              <input 
                type="text" 
                style={inputStyle} 
                placeholder="Masukkan kata sandi Wi-Fi" 
                value={wifi.password} 
                onChange={(e) => setWifi({...wifi, password: e.target.value})} 
              />
              <small style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '5px', display: 'block' }}>
                * Kosongkan jika jaringan bersifat publik/open.
              </small>
            </div>

            <button style={{ ...buttonStyle, backgroundColor: '#38bdf8', color: '#0f172a' }} onClick={handleUpdateWifi}>
              📡 SINKRONISASI WI-FI KE ALAT
            </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default App;