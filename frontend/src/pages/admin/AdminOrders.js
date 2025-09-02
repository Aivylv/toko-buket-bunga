import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const API_URL = 'http://localhost:5000/api/orders';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setOrders(data);
    } catch (error) {
      console.error("Gagal mengambil data pesanan:", error);
    }
  };
  
  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'selesai', label: 'Selesai' },
    { value: 'dibatalkan', label: 'Dibatalkan' },
    // Anda bisa menambahkan status lain seperti 'diproses', 'dikirim' di database ENUM
  ];

  const handleStatusChange = async (orderId, newStatus) => {
    try {
        await axios.put(`${API_URL}/${orderId}/status`, { status: newStatus });
        // Update state secara lokal untuk responsivitas UI
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
    } catch (error) {
        console.error("Gagal mengupdate status pesanan:", error);
        alert('Gagal mengupdate status.');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
  }

  return (
    <div className="admin-orders">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Kelola Pesanan</h1>
          <p>Kelola semua pesanan customer</p>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID Pesanan</th>
                <th>Customer</th>
                <th>Tanggal</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>
                    <div>{order.customer_name}</div>
                    <small>{order.customer_email}</small>
                  </td>
                  <td>{formatDate(order.created_at)}</td>
                  <td>{formatPrice(order.total_pembayaran)}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`status-select status-${order.status}`}
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;