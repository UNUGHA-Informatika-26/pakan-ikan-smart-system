import { createClient } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';
import './App.css';

// Import semua komponen modular (Termasuk Akun)
import Welcome from './components/Welcome';
import Daftar from './components/Daftar';
import Masuk from './components/Masuk';
import Beranda from './components/Beranda';
import PengaturanPakan from './components/PengaturanPakan';
import Jurnal from './components/Jurnal';
import Wifi from './components/Wifi';
import Rab from './components/Rab';
import Akun from './components/Akun'; // <-- 1. IMPORT KOMPONEN AKUN DI SINI

const supabase = createClient('https://tqfspwtaexpxlmflaskd.supabase.co', 'sb_publishable_QTf6sd3BIoxhRf7u67-1JA_lPiLm_EB');

function App() {
  // State Navigasi Utama (welcome, daftar, masuk, menu)
  const [currentScreen, setCurrentScreen] = useState(() => {
    return localStorage.getItem('app_screen') || 'welcome';
  });

  // State Sub-Menu di dalam Beranda (beranda, pengaturan, jurnal, wifi, rab, akun)
  const [activePage, setActivePage] = useState('beranda');
  const [loading, setLoading] = useState(false);

  // Data Akun Pengguna (Disimpan ke localStorage agar tidak hilang saat di-refresh)
  const [akunData, setAkunData] = useState(() => {
    try {
      const savedAkun = localStorage.getItem('user_akun_data');
      return savedAkun ? JSON.parse(savedAkun) : {
        nama: 'Dewi Santika',
        email: 'dewi.santika@gmail.com',
        noHp: '081234567890'
      };
    } catch (e) {
      return { nama: 'Dewi Santika', email: 'dewi.santika@gmail.com', noHp: '081234567890' };
    }
  });

  // Simpan otomatis data Akun ke localStorage setiap ada perubahan
  useEffect(() => {
    localStorage.setItem('user_akun_data', JSON.stringify(akunData));
  }, [akunData]);

  // Data Pakan
  const [pakanData, setPakanData] = useState({
    tglMulai: 1, tglSelesai: 30,
    jamPagi: 8, menitPagi: 0,
    jamSore: 17, menitSore: 0,
    durasi: 5
  });

  // Data Wi-Fi
  const [wifiData, setWifiData] = useState({ ssid: '', password: '' });

  // Data Catatan Jurnal Harian
  const [catatan, setCatatan] = useState(() => {
    try {
      const saved = localStorage.getItem("jurnalDataV2");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Data Jurnal RAB Petani (Disimpan ke localStorage)
  const [rabList, setRabList] = useState(() => {
    try {
      const saved = localStorage.getItem("rabListData");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Simpan otomatis data RAB ke localStorage setiap ada perubahan
  useEffect(() => {
    localStorage.setItem("rabListData", JSON.stringify(rabList));
  }, [rabList]);

  // Fungsi Aman Pindah Layar + Simpan ke LocalStorage agar tidak blank screen
  const changeScreen = (screenName) => {
    setCurrentScreen(screenName);
    localStorage.setItem('app_screen', screenName);
  };

  // Fetch data awal dari Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: dbData } = await supabase.from('jadwal_pakan').select('*').eq('pengenal', 1).single();
        if (dbData) {
          setPakanData({
            tglMulai: dbData.tgl_mulai, tglSelesai: dbData.tgl_selesai,
            jamPagi: dbData.jam_pagi, menitPagi: dbData.menit_pagi,
            jamSore: dbData.jam_sore, menitSore: dbData.menit_sore,
            durasi: dbData.durasi_detik
          });
        }

        const { data: dbWifi } = await supabase.from('setting_wifi').select('*').eq('id', 1).single();
        if (dbWifi) {
          setWifiData({ ssid: dbWifi.ssid || '', password: dbWifi.password || '' });
        }
      } catch (error) {
        console.error("Gagal memuat data:", error);
      }
    };
    fetchData();
  }, []);

  // Update Data Pakan ke Supabase
  const handleUpdatePakan = async (newData) => {
    setLoading(true);
    try {
      const { error } = await supabase.from('jadwal_pakan').update({
        jam_pagi: parseInt(newData.jamPagi),
        menit_pagi: parseInt(newData.menitPagi),
        jam_sore: parseInt(newData.jamSore),
        menit_sore: parseInt(newData.menitSore),
        durasi_detik: parseInt(newData.durasi)
      }).eq('pengenal', 1);

      if (error) throw error;
      setPakanData(newData);
      alert("Data berhasil dikirim ke alat!");
    } catch (error) {
      alert("Gagal update: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update Wi-Fi ke Supabase
  const handleUpdateWifi = async (newWifi) => {
    setLoading(true);
    try {
      const { error } = await supabase.from('setting_wifi').update({
        ssid: newWifi.ssid,
        password: newWifi.password
      }).eq('id', 1);

      if (error) throw error;
      setWifiData(newWifi);
      alert("Konfigurasi Wi-Fi berhasil dikirim ke alat!");
    } catch (error) {
      alert("Gagal memperbarui Wi-Fi: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handler Simpan / Edit RAB
  const handleSaveRab = (formData, editIndex) => {
    const tglStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const newEntry = {
      d: tglStr,
      s: 'Pakan Normal',
      f: '1.28',
      raw: formData
    };

    if (editIndex !== null) {
      const updated = [...rabList];
      updated[editIndex] = newEntry;
      setRabList(updated);
      alert("Jurnal RAB berhasil diperbarui!");
    } else {
      setRabList([...rabList, newEntry]);
      alert("Jurnal RAB berhasil disimpan!");
    }
  };

  // Handler Hapus RAB
  const handleDeleteRab = (index) => {
    setRabList(rabList.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      
      {/* HEADER UTAMA APLIKASI */}
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h2 style={{ margin: '0', color: '#38bdf8', fontSize: '1.25rem', fontWeight: 'bold' }}>PAKAN IKAN CERDAS</h2>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '4px 0 0 0', letterSpacing: '0.05em' }}>KSTM AL IHYA</p>
      </div>

      <main>
        {/* 1. Halaman Welcome */}
       {currentScreen === 'welcome' && <Welcome setCurrentScreen={setCurrentScreen} />}
        {/* 2. Halaman Daftar */}
        {currentScreen === 'daftar' && <Daftar onNavigate={changeScreen} />}

        {/* 3. Halaman Masuk */}
        {currentScreen === 'masuk' && <Masuk onNavigate={changeScreen} />}

        {/* 4. Menu Utama & Fitur Aplikasi */}
        {currentScreen === 'menu' && (
          <>
            {activePage === 'beranda' && (
              <Beranda 
                setActivePage={setActivePage} 
                onLogout={() => changeScreen('welcome')} 
                catatanLength={catatan.length} 
              />
            )}

            {activePage === 'rab' && (
              <Rab 
                rabList={rabList} 
                onSaveRab={handleSaveRab} 
                onDeleteRab={handleDeleteRab} 
                onBack={() => setActivePage('beranda')} 
              />
            )}

            {activePage === 'pengaturan' && (
              <PengaturanPakan 
                data={pakanData} 
                onUpdate={handleUpdatePakan} 
                onBack={() => setActivePage('beranda')} 
                loading={loading} 
              />
            )}

            {activePage === 'jurnal' && (
              <Jurnal 
                onBack={() => setActivePage('beranda')} 
              />
            )}

            {activePage === 'wifi' && (
              <Wifi 
                wifiData={wifiData} 
                onUpdateWifi={handleUpdateWifi} 
                onBack={() => setActivePage('beranda')} 
                loading={loading} 
              />
            )}

            {/* 2. TAMBAHKAN KONDISI HALAMAN AKUN DI SINI */}
            {activePage === 'akun' && (
              <Akun 
                akunData={akunData}
                onUpdateAkun={setAkunData}
                onBack={() => setActivePage('beranda')} 
                onLogout={() => changeScreen('welcome')} 
              />
            )}
          </>
        )}
      </main>

    </div>
  );
}

export default App;