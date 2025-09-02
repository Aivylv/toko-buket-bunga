import React, { useState } from 'react';
import './Admin.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Buket Mawar Merah', price: 310000, stock: 15, category: 'Mawar', status: 'Aktif' },
    { id: 2, name: 'Buket Lavender', price: 350000, stock: 8, category: 'Lavender', status: 'Aktif' },
    { id: 3, name: 'Buket Mixed Flowers', price: 500000, stock: 12, category: 'Campuran', status: 'Aktif' },
    { id: 4, name: 'Buket Tulip', price: 275000, stock: 0, category: 'Tulip', status: 'Tidak Aktif' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    status: 'Aktif'
  });

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      // Edit existing product
      setProducts(products.map(product => 
        product.id === editingProduct.id ? { ...formData, id: editingProduct.id } : product
      ));
    } else {
      // Add new product
      const newProduct = {
        ...formData,
        id: Math.max(...products.map(p => p.id)) + 1
      };
      setProducts([...products, newProduct]);
    }
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ name: '', price: '', stock: '', category: '', status: 'Aktif' });
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
            onClick={() => setShowModal(true)}
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
                <th>Status</th>
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
                    <span className={`status-badge status-${product.status.toLowerCase().replace(' ', '-')}`}>
                      {product.status}
                    </span>
                  </td>
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

        {/* Modal untuk tambah/edit produk */}
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
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
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