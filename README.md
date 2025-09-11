# Proyek Final Praktikum Pengembangan Aplikasi Web: Toko Buket Bunga (FLORYN)

**FLORYN** adalah aplikasi web E-commerce *full-stack* yang dibangun untuk sebuah toko buket bunga online. Proyek ini dikembangkan sebagai tugas akhir untuk mata kuliah Praktikum Pengembangan Aplikasi Web, dengan menerapkan berbagai teknologi dan arsitektur modern.

Aplikasi ini memiliki dua peran utama: **Buyer (Pembeli)** yang dapat menjelajahi, membeli produk, dan melacak pesanan, serta **Admin** yang memiliki akses penuh untuk mengelola seluruh aspek toko online.

---

## Pemenuhan Spesifikasi Proyek

[cite_start]Berikut adalah daftar pemenuhan spesifikasi teknis dan arsitektur yang diwajibkan dalam dokumen `Spesifikasi Final Project PAW Antara.pdf`[cite: 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2]:

| Kriteria | Status | Implementasi |
| :--- | :---: | :--- |
| **Arsitektur Backend** | | |
| 1. Clean Architecture | ✅ | [cite_start]Proyek ini menerapkan pemisahan yang jelas antara *layers*: **Routes** (definisi endpoint), **Controllers** (logika bisnis), dan **Middleware** (untuk otentikasi & otorisasi)[cite: 32]. |
| 2. Framework & API | ✅ | Menggunakan **Node.js** dengan **Express.js** untuk membangun server backend. [cite_start]Seluruh API dirancang mengikuti prinsip **RESTful**[cite: 7]. |
| 3. Operasi Database (CRUD) | ✅ | [cite_start]Implementasi penuh operasi **Create, Read, Update, & Delete** pada entitas utama: Produk, Pengguna, dan Pesanan[cite: 8]. [cite_start]Database yang digunakan adalah **MySQL**[cite: 9]. |
| 4. Autentikasi & Autorisasi | ✅ | [cite_start]Sistem **Login & Register** diimplementasikan menggunakan **JWT (JSON Web Token)** untuk melindungi *routes*[cite: 11]. [cite_start]Terdapat dua peran (**admin** dan **buyer**) dengan hak akses yang berbeda, diatur menggunakan *middleware* khusus[cite: 12]. [cite_start]Password pengguna di-hash menggunakan **bcrypt.js**[cite: 13]. |
| 5. Validasi Data | ✅ | [cite_start]Validasi data diterapkan pada *request body* yang masuk, seperti pada saat registrasi (misalnya, panjang password minimal 6 karakter)[cite: 14]. |
| 6. Manajemen File (Upload) | ✅ | [cite_start]Terdapat fitur **upload gambar produk** yang menggunakan `multer` untuk menangani file[cite: 15]. |
| 7. Cetak PDF | ✅ | [cite_start]Admin dapat men-generate **laporan pesanan dalam format PDF** menggunakan `jspdf` dan `jspdf-autotable` di sisi frontend[cite: 16]. |
| 8. Manajemen Konfigurasi | ✅ | [cite_start]Data sensitif seperti koneksi database dan kunci rahasia JWT dikelola melalui **environment variables** dalam file `.env`[cite: 17]. |
| **Frontend (Sisi Klien)** | | |
| 1. Framework | ✅ | [cite_start]Frontend dibangun menggunakan **React.js**[cite: 19]. |
| 2. Manajemen State | ✅ | [cite_start]State aplikasi dikelola secara efektif menggunakan **React Hooks**, termasuk `useState`, `useEffect`, dan `useContext` untuk state global seperti otentikasi dan keranjang belanja[cite: 20, 21]. |
| 3. Routing | ✅ | [cite_start]Navigasi antar halaman diimplementasikan menggunakan **React Router**[cite: 22]. |
| 4. Komunikasi API | ✅ | [cite_start]Seluruh komunikasi dengan backend API (GET, POST, PUT, DELETE) dilakukan menggunakan **Axios**[cite: 22]. |
| 5. Styling | ✅ | [cite_start]Antarmuka pengguna dirancang agar bersih, responsif, dan presentabel menggunakan **CSS murni**[cite: 24, 25]. |

---

## Instalasi

### Prasyarat

* Node.js (versi 14 atau lebih tinggi)
* NPM (Node Package Manager)
* MySQL Server (atau XAMPP dengan phpMyAdmin)

### 1. Setup Database

1.  Buka phpMyAdmin atau *database client* pilihan Anda.
2.  Buat database baru dengan nama `buket_bunga_db`.
3.  Impor file skema SQL `database.sql` (jika tersedia) atau buat tabel-tabel berikut: `users`, `products`, `orders`, `order_items`, `carts`.

### 2. Setup Backend

1.  Masuk ke direktori `backend`:
    ```bash
    cd backend
    ```
2.  Install semua *dependencies*:
    ```bash
    npm install
    ```
3.  Buat file `.env` di dalam direktori `backend` dan salin konten dari bagian **Environment Variables** di bawah.
4.  Jalankan server backend:
    ```bash
    npm run dev
    ```
    Server akan berjalan di `http://localhost:5000`.

### 3. Setup Frontend

1.  Buka terminal baru, masuk ke direktori `frontend`:
    ```bash
    cd frontend
    ```
2.  Install semua *dependencies*:
    ```bash
    npm install
    ```
3.  Jalankan aplikasi React:
    ```bash
    npm start
    ```
    Aplikasi akan terbuka di browser Anda pada alamat `http://localhost:3000`.

---

## Environment Variables

[cite_start]Buat file `.env` di dalam direktori `backend` dan isi dengan variabel berikut[cite: 17]: