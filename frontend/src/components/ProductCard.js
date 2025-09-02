import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ id, name, price, image, description }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={name} />
        <div className="product-overlay">
          <Link to={`/products/${id}`} className="view-details-btn">
            Lihat Detail
          </Link>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{name}</h3>
        <p className="product-description">{description}</p>
        <div className="product-price">{formatPrice(price)}</div>
        <button className="add-to-cart-btn">Tambah ke Keranjang</button>
      </div>
    </div>
  );
};

export default ProductCard;