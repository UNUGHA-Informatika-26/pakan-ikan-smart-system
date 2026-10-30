import { createClient } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';
import './App.css';

// Import semua komponen modular
import Welcome from './components/Welcome';
import Daftar from './components/Daftar';
import Masuk from './components/Masuk';
import Beranda from './components/Beranda';
import PengaturanPakan from './components/PengaturanPakan';
import Jurnal from './components/Jurnal';
import Wifi from './components/Wifi';
import Rab from './components/Rab';
import Akun from './components/Akun';

const supabase = createClient('https://tqfspwtaexpxlmflaskd.supabase.co', 'sb_publishable_QTf6sd3BIoxhRf7u67-1JA_lPiLm_EB');

function App() {
  // State Navigasi Utama (welcome, daftar, masuk, menu)
  const [currentScreen, setCurrentScreen] = useState(() => {
    return localStorage.getItem('app_screen') || 'welcome';
  });

  const [activePage, setActivePage] = useState('beranda');
  const [loading, setLoading] = useState(false);

  // State Form Input Register & Login
  const [rNama, setRNama] = useState('');
  const [rMail, setRMail] = useState('');
  const [rHp, setRHp] = useState('');
  const [rPass, setRPass] = useState('');
  const [rPass2, setRPass2] = useState('');
  const [regErr, setRegErr] = useState('');

  const [lMail, setLMail] = useState('');
  const [lPass, setLPass] = useState('');
  const [loginErr, setLoginErr] = useState('');

  // Data Akun Pengguna
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

  // Data Jurnal RAB Petani
  const [rabList, setRabList] = useState(() => {
    try {
      const saved = localStorage.getItem("rabListData");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("rabListData", JSON.stringify(rabList));
  }, [rabList]);

  // Fungsi Pindah Layar + Simpan ke LocalStorage
  const changeScreen = (screenName) => {
    setCurrentScreen(screenName);
    localStorage.setItem('app_screen', screenName);
  };

  // Handler Proses Pendaftaran dengan Validasi Ketat (.com / domain wajib)
  const handleRegister = (e) => {
    e.preventDefault();
    setRegErr('');

    // Validasi Kolom Kosong
    if (!rNama || !rMail || !rHp || !rPass || !rPass2) {
      setRegErr('Semua kolom wajib diisi!');
      return;
    }

    // Validasi Format Email (wajib mengandung '@' dan berakhiran '.com' atau domain lain yang valid)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(rMail) || !rMail.toLowerCase().includes('.com')) {
      setRegErr('Format email tidak valid! Wajib menggunakan format email yang benar dan berakhiran .com (contoh: nama@email.com)');
      return;
    }

    // Validasi Nomor Telepon (wajib diawali '08' dan panjang 10-13 digit)
    const phoneRegex = /^08\d{8,11}$/;
    if (!phoneRegex.test(rHp)) {
      setRegErr('Nomor telepon tidak valid! Harus diawali "08" dan terdiri dari 10-12 digit angka.');
      return;
    }

    // Validasi Panjang Kata Sandi (Minimal 8 karakter)
    if (rPass.length < 8) {
      setRegErr('Kata sandi terlalu pendek! Minimal harus 8 karakter.');
      return;
    }

    // Validasi Kesesuaian Konfirmasi Kata Sandi
    if (rPass !== rPass2) {
      setRegErr('Konfirmasi kata sandi tidak sama!');
      return;
    }

    // Jika Semua Validasi Lolos
    const dataAkunBaru = {
      nama: rNama,
      email: rMail,
      noHp: rHp
    };
    setAkunData(dataAkunBaru);
    localStorage.setItem('user_akun_data', JSON.stringify(dataAkunBaru));

    alert('Pendaftaran berhasil! Selamat datang.');
    changeScreen('menu');
  };

  // Handler Proses Masuk (Login) dengan Validasi Ketat (.com)
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginErr('');

    if (!lMail || !lPass) {
      setLoginErr('Email dan kata sandi wajib diisi!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(lMail) || !lMail.toLowerCase().includes('.com')) {
      setLoginErr('Format email untuk masuk tidak valid! Harus berakhiran .com');
      return;
    }

    if (lPass.length < 8) {
      setLoginErr('Kata sandi minimal 8 karakter!');
      return;
    }

    alert('Berhasil masuk!');
    changeScreen('menu');
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

  const handleDeleteRab = (index) => {
    setRabList(rabList.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      {/* Halaman Welcome */}
      {currentScreen === 'welcome' && <Welcome setCurrentScreen={changeScreen} />}
      
      {/* Halaman Daftar */}
      {currentScreen === 'daftar' && (
        <Daftar 
          handleRegister={handleRegister}
          rNama={rNama} setRNama={setRNama}
          rMail={rMail} setRMail={setRMail}
          rHp={rHp} setRHp={setRHp}
          rPass={rPass} setRPass={setRPass}
          rPass2={rPass2} setRPass2={setRPass2}
          regErr={regErr}
          onNavigate={changeScreen}
        />
      )}

      {/* Halaman Masuk */}
      {currentScreen === 'masuk' && (
        <Masuk 
          handleLogin={handleLogin}
          lMail={lMail} setLMail={setLMail}
          lPass={lPass} setLPass={setLPass}
          loginErr={loginErr}
          onNavigate={changeScreen}
        />
      )}

      {/* Menu Utama & Fitur Aplikasi */}
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
    </div>
  );
}

export default App;