# SMTI Pontianak - VR Tour 360

Project Virtual Tour 360° untuk SMK SMTI Pontianak menggunakan A-Frame.

## Struktur Proyek Profesional

- `/assets` - Semua aset statis
  - `/panoramas` - Foto 360° (.jpg)
  - `/ui` - Aset antarmuka (GIF, Icon, Logo)
- `/css` - File stylesheet
- `/js` - File JavaScript (A-Frame components, UI logic)
- `/pages` - Halaman untuk setiap lokasi tour
- `index.html` - Titik masuk utama (Pintu Masuk)

## Cara Menambah Lokasi Baru

1. Siapkan foto 360° di `/assets/panoramas/`.
2. Buat file HTML baru di `/pages/` (duplikasi dari `2_Portal.html`).
3. Sesuaikan atribut `src` pada `<a-sky>` dan posisi navigasi panah.
4. Update target URL pada file sebelumnya untuk menghubungkan ke halaman baru.

## Pengaturan UI
Pengaturan tampilan overlay dapat diubah melalui `css/style.css` dan logika interaksi ada di `js/ui-manager.js`.
