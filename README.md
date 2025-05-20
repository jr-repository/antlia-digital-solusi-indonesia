
# Antlia - Solusi Teknologi Digital Indonesia

Website resmi Antlia yang menyediakan berbagai solusi teknologi digital seperti ERP, WMS, CRM, HRM dan IoT untuk bisnis Anda.

## Cara Deploy ke GitHub Pages

### Persiapan Awal

1. Pastikan Anda memiliki akun GitHub dan repository sudah dibuat: https://github.com/jr-repository/antlia.git

2. Pastikan Anda telah menginstal Git di komputer lokal Anda. Jika belum, unduh dan instal dari [git-scm.com](https://git-scm.com/).

3. Clone repository yang sudah dibuat ke komputer lokal:

```bash
git clone https://github.com/jr-repository/antlia.git
cd antlia
```

### Menyiapkan Project

4. Instal dependensi project:

```bash
npm install
```

5. Menjalankan project secara lokal:

```bash
npm run dev
```

### Menyiapkan GitHub Pages

6. Pastikan file `.github/workflows/deploy.yml` sudah ada di repository Anda. File ini berisi konfigurasi untuk GitHub Actions yang akan melakukan proses build dan deploy secara otomatis.

7. Tambahkan konfigurasi `base: '/antlia/'` di `vite.config.ts` (sudah ditambahkan dalam repository).

8. Tambahkan file `.nojekyll` di folder `public/` untuk memastikan GitHub Pages tidak memproses situs Anda dengan Jekyll.

### Menyiapkan Environment Secret

9. Di repository GitHub Anda, buka tab "Settings".

10. Di sidebar, pilih "Secrets and variables" kemudian pilih "Actions".

11. Klik tombol "New repository secret" dan tambahkan:
   - Name: `VITE_SUPABASE_URL`
   - Secret: [nilai URL Supabase Anda]
   
   Klik "Add secret".

12. Ulangi langkah di atas untuk menambahkan secret lain:
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Secret: [nilai Anonymous Key Supabase Anda]

### Melakukan Deploy

13. Pastikan semua perubahan telah disimpan dan di-commit ke repository:

```bash
git add .
git commit -m "Initial setup for GitHub Pages deployment"
git push origin main
```

14. Setelah push ke branch main, GitHub Actions akan otomatis menjalankan workflow deployment.

15. Untuk memeriksa status deployment, buka tab "Actions" di repository GitHub Anda.

16. Setelah build selesai dengan sukses, buka tab "Settings" > "Pages" di repository GitHub Anda. Anda akan melihat bahwa site sudah di-deploy dari branch `gh-pages`.

17. Website Anda sekarang bisa diakses di: `https://jr-repository.github.io/antlia/`

### Troubleshooting

- Jika Anda melihat halaman 404, pastikan bahwa:
  - Deployment berhasil di tab "Actions"
  - Base URL di `vite.config.ts` sudah benar (`base: '/antlia/'`)
  - Branch `gh-pages` sudah dibuat oleh GitHub Actions

- Jika terdapat masalah dengan routing, pastikan bahwa Anda menggunakan `BrowserRouter` dengan `basename` yang benar:

```jsx
<BrowserRouter basename="/antlia">
  {/* Route components */}
</BrowserRouter>
```

- Jika gambar atau aset tidak muncul, pastikan semua path relatif menggunakan `import` atau dimulai dengan `/antlia/`.

## Setup Development Lokal

### Kebutuhan Sistem

- Node.js (versi 18 atau lebih baru)
- NPM (biasanya sudah termasuk dengan Node.js)
- Git

### Instalasi dan Menjalankan Project

1. Clone repository:

```bash
git clone https://github.com/jr-repository/antlia.git
cd antlia
```

2. Install dependensi:

```bash
npm install
```

3. Jalankan server development:

```bash
npm run dev
```

4. Buka browser dan akses `http://localhost:8080`

## Teknologi yang Digunakan

- Vite
- TypeScript
- React
- Supabase
- Tailwind CSS
- shadcn/ui

## Struktur Project

- `/src` - Kode sumber utama
  - `/components` - Komponen React yang dapat digunakan kembali
  - `/pages` - Halaman utama aplikasi
  - `/context` - Context providers untuk state management
  - `/integrations` - Konfigurasi integrasi dengan layanan eksternal seperti Supabase

## Contact

Untuk pertanyaan lebih lanjut, hubungi tim Antlia melalui:
- Website: [www.antlia.id](https://www.antlia.id)
- Email: info@antlia.id
