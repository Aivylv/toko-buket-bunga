import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    description: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:5000/api/products');
    setProducts(data);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchProducts();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingProduct) {
      await axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
    } else {
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
    }
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ name: '', price: '', stock: '', category: '', description: '' });
    fetchProducts();
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="admin-products">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Kelola Produk</h1>
          <p>Kelola produk toko buket bunga</p>
        </div>

        <div className="admin-actions">
          <button 
            className="btn-primary"
            onClick={() => { setEditingProduct(null); setShowModal(true); }}
          >
            <i className="fas fa-plus"></i> Tambah Produk
          </button>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nama Produk</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Kategori</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>Rp {product.price.toLocaleString('id-ID')}</td>
                  <td>{product.stock}</td>
                  <td>{product.category}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-edit"
                        onClick={() => handleEdit(product)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDelete(product.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>{editingProduct ? 'Edit Produk' : 'Tambah Produk'}</h3>
                <button className="modal-close" onClick={() => setShowModal(false)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label>Nama Produk</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Harga (Rp)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                 <div className="form-group">
                  <label>Deskripsi</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Stok</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Kategori</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="Mawar">Mawar</option>
                    <option value="Lavender">Lavender</option>
                    <option value="Tulip">Tulip</option>
                    <option value="Campuran">Campuran</option>
                    <option value="Baby's Breath">Baby's Breath</option>
                  </select>
                </div>
                <div className="modal-actions">
                  <button type="button" onClick={() => setShowModal(false)}>
                    Batal
                  </button>
                  <button type="submit" className="btn-primary">
                    {editingProduct ? 'Update' : 'Tambah'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;