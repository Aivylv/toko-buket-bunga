import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import './HomePage.css';

const HomePage = () => {
  // Data produk contoh
  const featuredProducts = [
    {
      id: 1,
      name: "Buket Mawar Merah",
      price: 310000,
      image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cm9zZSUyMGJvdXF1ZXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      description: "Buket mawar merah segar dengan packaging eksklusif"
    },
    {
      id: 2,
      name: "Buket Lavender",
      price: 350000,
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGxhdmVuZGVyJTIwYm91cXVldHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      description: "Buket lavender wangi yang tahan lama"
    },
    {
      id: 3,
      name: "Buket Mixed Flowers",
      price: 500000,
      image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGZsb3dlciUyMGJvdXF1ZXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      description: "Kombinasi berbagai bunga segar pilihan"
    },
    {
      id: 4,
      name: "Buket Tulip",
      price: 275000,
      image: "https://images.unsplash.com/photo-1578948850696-322adf023a82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHR1bGlwJTIwYm91cXVldHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      description: "Buket tulip warna-warni yang cerah"
    }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>FLORIST - Toko Buket Bunga</h1>
          <p>Diskon Spesial 20% untuk semua produk mawar di bulan ini... jangan lewatkan!</p>
          <Link to="/products" className="cta-button">Lihat Produk</Link>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner">
        <div className="container">
          <h2>FLOORST. <span className="discount">Diskon Spesial 20%</span></h2>
          <p>Dapatkan diskon spesial untuk pembelian pertama Anda! Gunakan kode: <strong>WELCOME20</strong></p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2>Produk Unggulan</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                description={product.description}
              />
            ))}
          </div>
          <div className="view-all">
            <Link to="/products" className="view-all-btn">Lihat Semua Produk</Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Mengapa Memilih Kami?</h2>
              <p>Kami menyediakan buket bunga segar dengan kualitas terbaik. Setiap bunga dipilih dengan teliti dan dirangkai oleh florist profesional untuk memberikan kesan yang tak terlupakan.</p>
              <ul>
                <li><i className="fas fa-check-circle"></i> Bunga segar setiap hari</li>
                <li><i className="fas fa-check-circle"></i> Pengiriman cepat dan aman</li>
                <li><i className="fas fa-check-circle"></i> Packaging eksklusif</li>
                <li><i className="fas fa-check-circle"></i> Harga terjangkau</li>
              </ul>
            </div>
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGZsb3dlciUyMGJvdXF1ZXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="Florist" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;