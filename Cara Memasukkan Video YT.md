# 📹 Cara Memasukkan Video YouTube ke VR Tour

> Gampang banget kok!! Ikutin aja 3 langkah di bawah ini 👇

---

## Langkah 1 — Tambahin script ke `<head>` halaman kamu

Buka file HTML titik yang mau dikasih video, terus cari bagian `<head>`.
Tambahin baris ini **tepat setelah** baris `button-component.js`:

```html
<!-- Scripts -->
<script src="https://aframe.io/releases/1.7.1/aframe.min.js"></script>
<script src="js/gif-shader.js"></script>
<script src="js/button-component.js"></script>
<script src="js/video-component.js"></script>  ← TAMBAH INI
```

---

## Langkah 2 — Paste snippet ini ke dalam `<a-scene>`

Copy blok kode di bawah ini, terus taruh di dalam `<a-scene>` (di bawah bagian "Paste Snippet Code Tombol"):

```html
<!-- ===== YouTube Video Snippet (Copy Me!) ===== -->
<a-entity id="youtube-card-NAMA_UNIK"
    youtube-card="videoId: ID_VIDEO_YOUTUBE; title: Judul Video Disini"
    position="0 1.5 -5"
    rotation="0 0 0"
    scale="1 1 1">
</a-entity>
<!-- ============================================= -->
```

> ⚠️ **Ingat:** Ganti `NAMA_UNIK` dengan sesuatu yang unik, misalnya nama file + angka. Contoh: `youtube-card-3Lt2a-1`

---

## Langkah 3 — Cari ID video YouTube-nya

Dari URL YouTube biasa, ID video adalah bagian setelah `youtu.be/` atau `?v=`:

```
https://youtu.be/dQw4w9WgXcQ      → ID = dQw4w9WgXcQ
https://youtube.com/watch?v=dQw4w9WgXcQ   → ID = dQw4w9WgXcQ
```

Taruh ID tersebut di snippet:
```html
youtube-card="videoId: dQw4w9WgXcQ; title: Nama Video Kamu"
```

---

## Contoh Lengkap

```html
<a-entity id="youtube-card-profil-jurusan"
    youtube-card="videoId: dQw4w9WgXcQ; title: Profil Jurusan Teknik Pemesinan"
    position="0 1.5 -5"
    rotation="0 0 0"
    scale="1 1 1">
</a-entity>
```

---

## Cara Atur Posisi Video

Setelah dipaste, videonya mungkin muncul di posisi yang aneh. Untuk atur posisinya:

1. Buka file HTML di browser
2. Tekan **`Ctrl + Alt + I`** untuk buka A-Frame Inspector
3. Klik entitas video di panel kiri
4. Drag-drag di scene atau ubah nilai `position` dan `rotation` di panel kanan
5. Copy nilai-nilainya ke dalam kode HTML kamu

---

## Link Video di Google Drive

Video YouTube untuk VR Tour ini tersimpan di:
👉 `https://drive.google.com/drive/u/0/folders/17NuCwMAp9EPYcgSNMlXYbUcBlGdUBMPa`

---

## Opsi Tambahan (Opsional)

Kalau mau ubah ukuran card video-nya, tambahin `width` dan `height`:

```html
youtube-card="videoId: ...; title: ...; width: 6; height: 3.375"
```

> Default-nya `width: 4` dan `height: 2.25` (rasio 16:9).

---

*Untuk panduan lengkap cara nambah lokasi baru ke VR Tour, baca `PANDUAN_KONTRIBUSI.md`!*
