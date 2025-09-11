import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
// Pastikan library Anda sudah terinstal dan nama ini benar
import { formatRupiah, formatDate } from '@biyy/format-rupiah-datetime';

const API_URL = 'http://localhost:5000/api/orders';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fungsi ini mengambil token dari localStorage untuk otentikasi
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Token tidak ditemukan, pastikan admin sudah login.");
      return {};
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      // PANGGILAN PENTING: axios.get() sekarang menyertakan header otentikasi
      const { data } = await axios.get(API_URL, getAuthHeaders());
      setOrders(data);
    } catch (err) {
      console.error("Gagal mengambil data pesanan:", err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError('Anda tidak memiliki izin untuk mengakses data ini.');
      } else {
        setError('Gagal memuat data pesanan. Silakan coba lagi nanti.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'selesai', label: 'Selesai' },
    { value: 'dibatalkan', label: 'Dibatalkan' },
    // Anda bisa menambahkan status lain jika ada di database
    { value: 'diproses', label: 'Diproses' },
    { value: 'dikirim', label: 'Dikirim' },
  ];

  const handleStatusChange = async (orderId, newStatus) => {
    try {
        // Juga tambahkan header otentikasi saat mengupdate
        await axios.put(`${API_URL}/${orderId}/status`, { status: newStatus }, getAuthHeaders());
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
    } catch (error) {
        console.error("Gagal mengupdate status pesanan:", error);
        alert('Gagal mengupdate status.');
    }
  };

  return (
    <div className="admin-orders">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Kelola Pesanan</h1>
          <p>Kelola semua pesanan customer</p>
        </div>

        <div className="admin-table-container">
          {loading ? (
            <div className="loading">Memuat data pesanan...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : orders.length === 0 ? (
            <div className="empty-data-message">
              <i className="fas fa-file-invoice-dollar"></i>
              <p>Belum ada pesanan yang masuk.</p>
            </div>
          ) : (
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
                    <td>{formatRupiah(order.total_pembayaran)}</td>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;