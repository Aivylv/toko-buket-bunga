import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Data statistik contoh
  const stats = [
    { title: 'Total Produk', value: '45', icon: 'fas fa-box', color: '#d53f8c' },
    { title: 'Total Pesanan', value: '128', icon: 'fas fa-shopping-bag', color: '#38a169' },
    { title: 'Total User', value: '89', icon: 'fas fa-users', color: '#3182ce' },
    { title: 'Pendapatan', value: 'Rp 12.5Jt', icon: 'fas fa-money-bill-wave', color: '#dd6b20' }
  ];

  // Data pesanan terbaru contoh
  const recentOrders = [
    { id: '#ORD001', customer: 'Ahmad Rizki', date: '12 Nov 2023', amount: 'Rp 350.000', status: 'Selesai' },
    { id: '#ORD002', customer: 'Siti Rahayu', date: '12 Nov 2023', amount: 'Rp 500.000', status: 'Proses' },
    { id: '#ORD003', customer: 'Budi Santoso', date: '11 Nov 2023', amount: 'Rp 275.000', status: 'Selesai' },
    { id: '#ORD004', customer: 'Dewi Lestari', date: '11 Nov 2023', amount: 'Rp 420.000', status: 'Pending' }
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        {/* Header */}
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Selamat datang di panel admin FLORIST</p>
        </div>

        {/* Statistik */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                <i className={stat.icon}></i>
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="admin-content">
          {/* Quick Actions */}
          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <Link to="/admin/products" className="action-btn">
                <i className="fas fa-box"></i>
                <span>Kelola Produk</span>
              </Link>
              <Link to="/admin/orders" className="action-btn">
                <i className="fas fa-shopping-bag"></i>
                <span>Kelola Pesanan</span>
              </Link>
              <Link to="/admin/users" className="action-btn">
                <i className="fas fa-users"></i>
                <span>Kelola User</span>
              </Link>
              <button className="action-btn">
                <i className="fas fa-chart-bar"></i>
                <span>Laporan</span>
              </button>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="recent-orders">
            <div className="section-header">
              <h2>Pesanan Terbaru</h2>
              <Link to="/admin/orders" className="view-all">Lihat Semua</Link>
            </div>
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>ID Pesanan</th>
                    <th>Customer</th>
                    <th>Tanggal</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.date}</td>
                      <td>{order.amount}</td>
                      <td>
                        <span className={`status-badge status-${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;