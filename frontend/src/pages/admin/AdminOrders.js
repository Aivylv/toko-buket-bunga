import React, { useState } from 'react';
import './Admin.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([
    { id: '#ORD001', customer: 'Ahmad Rizki', email: 'ahmad@email.com', date: '2023-11-12', amount: 350000, status: 'completed', items: ['Buket Mawar Merah'] },
    { id: '#ORD002', customer: 'Siti Rahayu', email: 'siti@email.com', date: '2023-11-12', amount: 500000, status: 'processing', items: ['Buket Mixed Flowers'] },
    { id: '#ORD003', customer: 'Budi Santoso', email: 'budi@email.com', date: '2023-11-11', amount: 275000, status: 'completed', items: ['Buket Tulip'] },
    { id: '#ORD004', customer: 'Dewi Lestari', email: 'dewi@email.com', date: '2023-11-11', amount: 420000, status: 'pending', items: ['Buket Lavender'] },
    { id: '#ORD005', customer: 'Rudi Hermawan', email: 'rudi@email.com', date: '2023-11-10', amount: 600000, status: 'cancelled', items: ['Buket Mawar Merah', 'Buket Tulip'] }
  ]);

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: '#e53e3e' },
    { value: 'processing', label: 'Processing', color: '#dd6b20' },
    { value: 'completed', label: 'Completed', color: '#38a169' },
    { value: 'cancelled', label: 'Cancelled', color: '#718096' }
  ];

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status) => {
    const statusObj = statusOptions.find(opt => opt.value === status);
    return statusObj ? statusObj.color : '#718096';
  };

  const getStatusLabel = (status) => {
    const statusObj = statusOptions.find(opt => opt.value === status);
    return statusObj ? statusObj.label : status;
  };

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
                <th>Email</th>
                <th>Tanggal</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.email}</td>
                  <td>{order.date}</td>
                  <td>Rp {order.amount.toLocaleString('id-ID')}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      style={{ 
                        color: getStatusColor(order.status),
                        borderColor: getStatusColor(order.status),
                        fontWeight: '500'
                      }}
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button className="btn-view">
                      <i className="fas fa-eye"></i> Detail
                    </button>
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