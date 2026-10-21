# Sistem Pakan Ikan Pintar

Repositori ini berisi dokumentasi dan kode program proyek **Sistem Pakan Ikan Pintar** yang dikembangkan untuk memenuhi tugas mata kuliah **Analisis & Pengujian Sistem**.

Proyek ini bertujuan untuk merancang dan mengembangkan sistem berbasis mikrokontroler ESP32 yang dapat menampilkan informasi waktu dan mengendalikan kipas sebagai output berdasarkan logika program yang diterapkan.

## 📌 Gambaran Umum

Sistem menggunakan ESP32 sebagai mikrokontroler utama yang terhubung dengan LCD 16x2 I2C untuk menampilkan informasi tanggal, bulan, tahun, dan timer. ESP32 juga mengirimkan sinyal kontrol ON/OFF untuk mengendalikan kipas sesuai dengan program yang dijalankan.

## ⚙️ Komponen Sistem

- **ESP32** — mikrokontroler utama untuk memproses program dan mengendalikan sistem.
- **LCD 16x2 I2C** — menampilkan informasi tanggal, waktu, dan timer.
- **Kipas** — perangkat output yang dikendalikan melalui sinyal ON/OFF.
- **Power Supply 5V / 3.3V** — menyediakan daya untuk komponen sistem.

## 🏗️ Arsitektur Sistem

Alur kerja sistem secara umum:

1. Power supply menyediakan daya untuk ESP32 dan kipas.
2. ESP32 menjalankan program sesuai logika yang telah dibuat.
3. Informasi tanggal, waktu, dan timer ditampilkan pada LCD 16x2 I2C.
4. ESP32 mengirimkan sinyal kontrol untuk menghidupkan atau mematikan kipas.
5. Sistem menjalankan fungsi sesuai dengan program yang diimplementasikan.

## 🎯 Tujuan Proyek

- Menganalisis kebutuhan sistem.
- Merancang arsitektur perangkat keras dan perangkat lunak.
- Mengimplementasikan sistem berbasis ESP32.
- Melakukan pengujian terhadap fungsi dan kinerja sistem.
- Mendokumentasikan hasil pengembangan sistem.

## 🧪 Analisis dan Pengujian Sistem

Pengujian sistem dapat dilakukan pada beberapa bagian berikut:

- Pengujian ESP32 dalam menjalankan program.
- Pengujian LCD dalam menampilkan informasi.
- Pengujian timer sesuai dengan logika program.
- Pengujian kendali ON/OFF kipas.
- Pengujian catu daya pada komponen sistem.
- Pengujian integrasi seluruh komponen.

## 🛠️ Teknologi yang Digunakan

- Mikrokontroler ESP32
- Arduino IDE (jika digunakan dalam implementasi)
- LCD 16x2 I2C
- Bahasa pemrograman C/C++ (jika menggunakan Arduino IDE)

## 📁 Struktur Repositori

Struktur repositori mengikuti berkas yang tersedia dalam proyek, yang dapat mencakup:

- Kode program sistem
- Dokumentasi arsitektur sistem
- Diagram dan rancangan sistem
- Dokumen analisis kebutuhan
- Dokumentasi pengujian

## 👥 Informasi Proyek

- **Nama Proyek:** Sistem Pakan Ikan Pintar
- **Mata Kuliah:** Analisis & Pengujian Sistem
- **Platform:** ESP32
- **Jenis Sistem:** Sistem berbasis mikrokontroler

## 📝 Catatan

Fitur dan komponen yang dijelaskan dalam README ini perlu disesuaikan dengan implementasi aktual pada kode program dan perangkat keras yang digunakan.
