<div align="center">
  <img src="https://img.freepik.com/free-vector/beautiful-flower-shop-logo-design_44253-15.jpg" alt="Floryn Logo" width="150"/>
  <h1>Toko Buket Bunga (FLORYN)</h1>
  <p><strong>Aplikasi Web E-Commerce Full-Stack untuk Toko Buket Bunga Online</strong></p>
  <p>Proyek Final Praktikum Pengembangan Aplikasi Web</p>
</div>

---

**FLORYN** adalah aplikasi web E-commerce lengkap yang dibangun dengan MERN stack (MySQL, Express.js, React.js, Node.js). Aplikasi ini menyediakan platform yang fungsional dan modern bagi pelanggan untuk membeli buket bunga dan bagi administrator untuk mengelola toko.

## ✨ Fitur Utama

- **Untuk Pembeli:**
    - 🎨 **Katalog Produk:** Melihat katalog buket bunga dengan filter berdasarkan kategori.
    - 📄 **Detail Produk:** Melihat informasi rinci untuk setiap produk.
    - 🛒 **Keranjang Belanja:** Menambah, mengubah kuantitas, dan menghapus produk dari keranjang.
    - 🚚 **Proses Checkout:** Melakukan pemesanan dengan mengisi informasi pengiriman.
    - 📜 **Riwayat Pesanan:** Melihat riwayat semua pesanan yang pernah dibuat beserta detailnya.
    - 🔑 **Otentikasi:** Sistem registrasi dan login yang aman menggunakan JWT.

- **Untuk Admin:**
    - 📊 **Dashboard:** Halaman utama dengan statistik ringkas mengenai total produk, pesanan, dan pengguna.
    - 💐 **Manajemen Produk:** Operasi CRUD (Create, Read, Update, Delete) lengkap untuk produk, termasuk fitur upload gambar.
    - 📦 **Manajemen Pesanan:** Melihat semua pesanan dari pelanggan dan mengubah status pesanan (pending, diproses, dikirim, selesai, dibatalkan).
    - 👥 **Manajemen Pengguna:** Mengelola data pengguna yang terdaftar di sistem (CRUD).
    - 📄 **Cetak PDF:** Fitur untuk mengunduh laporan pesanan dalam format PDF.

---

## 🛠️ Pemenuhan Spesifikasi Proyek

[cite_start]Proyek ini telah memenuhi semua spesifikasi teknis dan fungsional yang diwajibkan[cite: 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33].

| Kriteria | Status | Implementasi |
| :--- | :---: | :--- |
| **Arsitektur Backend** | | |
| 1. Clean Architecture | ✅ | Menerapkan pemisahan yang jelas antara **Routes**, **Controllers**, dan **Middleware**. |
| 2. Framework & API | ✅ | [cite_start]Menggunakan **Node.js** & **Express.js** dengan prinsip **RESTful API**[cite: 7]. |
| 3. Operasi Database (CRUD) | ✅ | [cite_start]Implementasi CRUD penuh pada entitas Produk, Pengguna, dan Pesanan menggunakan **MySQL**[cite: 8, 9]. |
| 4. Autentikasi & Autorisasi | ✅ | [cite_start]Sistem **Login/Register** [cite: 11] [cite_start]dengan **JWT**, dua peran (**admin** & **buyer**) [cite: 12][cite_start], dan password hashing **(bcrypt.js)**[cite: 13]. |
| 5. Validasi Data | ✅ | [cite_start]Validasi *request body* pada sisi server untuk memastikan integritas data[cite: 14]. |
| 6. Manajemen File (Upload) | ✅ | [cite_start]Fitur **upload gambar produk** menggunakan `multer`[cite: 15]. |
| 7. Cetak PDF | ✅ | [cite_start]Admin dapat men-generate **laporan pesanan PDF** dari dashboard[cite: 16, 31]. |
| 8. Manajemen Konfigurasi | ✅ | [cite_start]Data sensitif dikelola melalui file `.env`[cite: 17]. |
| **Frontend (Sisi Klien)** | | |
| 1. Framework | ✅ | [cite_start]Dibangun menggunakan **React.js**[cite: 19]. |
| 2. Manajemen State | ✅ | [cite_start]Menggunakan **React Hooks** (`useState`, `useEffect`, `useContext`)[cite: 20, 21]. |
| 3. Routing | ✅ | [cite_start]Navigasi antar halaman menggunakan **React Router**[cite: 22]. |
| 4. Komunikasi API | ✅ | Interaksi dengan backend API (GET, POST, PUT, DELETE) menggunakan **Axios**. |
| 5. Styling | ✅ | [cite_start]Antarmuka pengguna yang bersih dan responsif menggunakan **CSS murni**[cite: 24]. |

---

## 🚀 Instalasi dan Menjalankan Proyek

### Prasyarat
- Node.js (v14 atau lebih baru)
- NPM (Node Package Manager)
- MySQL Server (misalnya melalui XAMPP)

### 1. Setup Database
1.  Buka phpMyAdmin atau *database client* Anda.
2.  Buat database baru dengan nama `buket_bunga_db`.
3.  Impor file skema SQL yang ada di proyek ke dalam database yang baru dibuat.

### 2. Setup Backend
```bash
# 1. Masuk ke direktori backend
cd backend

# 2. Install semua dependencies
npm install

# 3. Buat file .env dan isi sesuai dengan konfigurasi Anda
# (Lihat bagian Environment Variables di bawah)
cp .env.example .env

# 4. Jalankan server backend
npm run dev

### 3. Setup Frintend
```bash
# 1. Buka terminal baru, masuk ke direktori frontend
cd frontend

# 2. Install semua dependencies
npm install

# 3. Jalankan aplikasi React
npm start

⚙️ Environment Variables
Buat file bernama .env di dalam direktori backend dan isi dengan konfigurasi berikut. Sesuaikan dengan pengaturan lokal Anda.

# ==================================
# Konfigurasi Koneksi Database
# ==================================
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=buket_bunga_db

# ==================================
# Konfigurasi Server
# ==================================
PORT=5000

# ==================================
# Kunci Rahasia JWT (JSON Web Token)
# Ganti dengan string acak yang aman untuk produksi
# ==================================
JWT_SECRET=IniProjekPAW
Penting: Pastikan semua variabel ini telah diatur dengan benar agar aplikasi dapat terhubung ke database dan menjalankan otentikasi dengan baik.
