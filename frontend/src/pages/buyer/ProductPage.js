import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import './ProductPage.css';

const ProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Data produk contoh
  const products = [
    {
      id: 1,
      name: "Buket Mawar Merah",
      price: 310000,
      image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cm9zZSUyMGJvdXF1ZXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      description: "Buket mawar merah segar dengan packaging eksklusif",
      category: "mawar"
    },
    {
      id: 2,
      name: "Buket Lavender",
      price: 350000,
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGxhdmVuZGVyJTIwYm91cXVldHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      description: "Buket lavender wangi yang tahan lama",
      category: "lavender"
    },
    {
      id: 3,
      name: "Buket Mixed Flowers",
      price: 500000,
      image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGZsb3dlciUyMGJvdXF1ZXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      description: "Kombinasi berbagai bunga segar pilihan",
      category: "campuran"
    },
    {
      id: 4,
      name: "Buket Tulip",
      price: 275000,
      image: "https://images.unsplash.com/photo-1578948850696-322adf023a82?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHR1bGlwJTIwYm91cXVldHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      description: "Buket tulip warna-warni yang cerah",
      category: "tulip"
    },
    {
      id: 5,
      name: "Buket Mawar Putih",
      price: 290000,
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGxhdmVuZGVyJTIwYm91cXVldHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      description: "Buket mawar putih elegan dan berkelas",
      category: "mawar"
    },
    {
      id: 6,
      name: "Buket Baby's Breath",
      price: 230000,
      image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cm9zZSUyMGJvdXF1ZXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      description: "Buket baby's breath yang lembut dan romantis",
      category: "baby-breath"
    }
  ];

  const categories = [
    { id: 'all', name: 'Semua Produk' },
    { id: 'mawar', name: 'Buket Mawar' },
    { id: 'tulip', name: 'Buket Tulip' },
    { id: 'lavender', name: 'Buket Lavender' },
    { id: 'campuran', name: 'Buket Campuran' },
    { id: 'baby-breath', name: "Baby's Breath" }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="product-page">
      <div className="container">
        <h1>Katalog Produk</h1>
        <p className="page-subtitle">Temukan buket bunga perfect untuk setiap moment</p>
        
        {/* Filter Kategori */}
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Daftar Produk */}
        <div className="products-grid">
          {filteredProducts.map(product => (
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
        
        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>Tidak ada produk dalam kategori ini.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;