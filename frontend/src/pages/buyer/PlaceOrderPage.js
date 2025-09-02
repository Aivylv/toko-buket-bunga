import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PlaceOrderPage.css'; // Kita akan buat file CSS ini nanti

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil data cart dari state navigasi
  const { cartItems, subtotal } = location.state || { cartItems: [], subtotal: 0 };
  
  const [shippingInfo, setShippingInfo] = useState({
    namaPenerima: '',
    noHp: '',
    alamat: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prevState => ({ ...prevState, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!shippingInfo.namaPenerima || !shippingInfo.noHp || !shippingInfo.alamat) {
      alert('Harap isi semua informasi pengiriman.');
      return;
    }

    // Gabungkan data pesanan
    const orderData = {
      shippingInfo,
      orderItems: cartItems,
      subtotal,
      shippingCost: 20000,
      total: subtotal + 20000
    };

    // Di aplikasi nyata, data ini akan dikirim ke backend API
    console.log('Order Data:', orderData);
    
    alert('Pesanan berhasil dibuat!');
    // Arahkan ke halaman riwayat pesanan setelah berhasil
    navigate('/my-orders');
  };
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  };
  
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="place-order-container">
      <h1>Konfirmasi Pesanan</h1>
      <form className="place-order-layout" onSubmit={handlePlaceOrder}>
        <div className="shipping-form">
          <h2>Informasi Pengiriman</h2>
          <div className="form-group">
            <label htmlFor="namaPenerima">Nama Penerima</label>
            <input type="text" id="namaPenerima" name="namaPenerima" value={shippingInfo.namaPenerima} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="noHp">Nomor HP</label>
            <input type="tel" id="noHp" name="noHp" value={shippingInfo.noHp} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="alamat">Alamat Lengkap</label>
            <textarea id="alamat" name="alamat" rows="4" value={shippingInfo.alamat} onChange={handleInputChange} required></textarea>
          </div>
        </div>

        <div className="order-summary-box">
          <h2>Ringkasan Pesanan</h2>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.name} x {item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Ongkos Kirim</span>
            <span>{formatPrice(20000)}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>{formatPrice(subtotal + 20000)}</span>
          </div>
          <button type="submit" className="btn-place-order">Buat Pesanan</button>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrderPage;