# E-Commerce Sederhana dengan React, Tailwind, dan TypeScript

## Deskripsi Project
Proyek ini adalah aplikasi e-commerce kecil dan sederhana yang saya buat sebagai bagian dari tes masuk kerja. Aplikasi ini tidak menggunakan backend — semua data bersifat dummy dan disimpan menggunakan **localStorage** dari JavaScript.

## Fitur Utama

- **To-Do List (Daftar Belanja)**  
  Pengguna dapat membuat daftar barang yang ingin dibeli dan memantau progres penyelesaiannya melalui presentase.

- **Login & Register**  
  Fitur login dan pendaftaran pengguna sederhana menggunakan penyimpanan lokal tanpa autentikasi backend.

- **Cart**  
  Keranjang belanja yang memungkinkan pengguna menambahkan atau menghapus produk dari daftar belanja.

- **Product Page**  
  Menampilkan daftar produk dummy lengkap dengan nama, harga, dan gambar.

## Teknologi yang Digunakan

- **ReactJS** – Untuk membangun antarmuka aplikasi.
- **TailwindCSS** – Untuk styling yang cepat dan responsif.
- **TypeScript (TSX)** – Untuk penulisan kode berbasis tipe.
- **localStorage** – Untuk menyimpan data pengguna dan status aplikasi secara lokal.

## Panduan Instalasi

Berikut langkah-langkah untuk menjalankan proyek ini secara lokal:

### 1. Clone Repository

```bash
git clone https://github.com/ELINSOPIAH03/e-commerce-sederhana.git
cd .\e-commerce-sederhana\
```

### 2. Install Dependencies

```bash
npm install / npm i
```

### 3. Jalankan Aplikasi

```bash
npm run dev
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
