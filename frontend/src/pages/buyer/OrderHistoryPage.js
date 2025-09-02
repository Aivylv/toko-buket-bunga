import React, { useState, useEffect } from 'react';
import './OrderHistoryPage.css'; // CSS akan dibuat selanjutnya

const OrderHistoryPage = () => {
  // Data ini seharusnya datang dari API, untuk saat ini kita gunakan data dummy
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi fetch data dari API
    setTimeout(() => {
      setOrders([
        { id: 'ORD001', date: '2025-08-28', total: 350000, status: 'Selesai' },
        { id: 'ORD002', date: '2025-08-30', total: 500000, status: 'Dikirim' },
        { id: 'ORD003', date: '2025-09-01', total: 275000, status: 'Pending' }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  };
  
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'selesai': return 'status-completed';
      case 'dikirim': return 'status-shipped';
      case 'pending': return 'status-pending';
      case 'dibatalkan': return 'status-cancelled';
      default: return '';
    }
  };

  return (
    <div className="order-history-container">
      <h1>Riwayat Pesanan Saya</h1>
      {isLoading ? (
        <p>Memuat data pesanan...</p>
      ) : orders.length === 0 ? (
        <p>Anda belum memiliki riwayat pesanan.</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-details">
                <span className="order-id">#{order.id}</span>
                <span className="order-date">Tanggal: {new Date(order.date).toLocaleDateString('id-ID')}</span>
                <span className="order-total">{formatPrice(order.total)}</span>
              </div>
              <div className="order-actions">
                <span className={`order-status ${getStatusClass(order.status)}`}>{order.status}</span>
                <button className="btn-details">Lihat Detail</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;