const express = require('express');
const db = require('../config/database');
const { auth, adminAuth } = require('../middleware/auth');
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const [products] = await db.promise().query(`
      SELECT p.id, p.nama_produk as name, p.harga as price, p.stok as stock, p.deskripsi as description, p.category, AVG(r.rating) as avg_rating 
      FROM products p 
      LEFT JOIN reviews r ON p.id = r.product_id 
      GROUP BY p.id
    `);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const [products] = await db.promise().query(`
      SELECT p.id, p.nama_produk as name, p.harga as price, p.stok as stock, p.deskripsi as description, p.category, AVG(r.rating) as avg_rating 
      FROM products p 
      LEFT JOIN reviews r ON p.id = r.product_id 
      WHERE p.id = ?
      GROUP BY p.id
    `, [req.params.id]);
    
    if (products.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Get reviews for this product
    const [reviews] = await db.promise().query(`
      SELECT r.*, u.nama_user as name 
      FROM reviews r 
      JOIN users u ON r.user_id = u.id 
      WHERE r.product_id = ?
    `, [req.params.id]);
    
    res.json({ product: products[0], reviews });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add new product (admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  const { name, description, price, stock, category } = req.body;
  
  try {
    const [result] = await db.promise().query(
      'INSERT INTO products (nama_produk, deskripsi, harga, stok, category) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, stock, category]
    );
    
    res.status(201).json({ 
      message: 'Product created successfully', 
      productId: result.insertId 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update product (admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  const { name, description, price, stock, category } = req.body;
  
  try {
    const [result] = await db.promise().query(
      'UPDATE products SET nama_produk = ?, deskripsi = ?, harga = ?, stok = ?, category = ? WHERE id = ?',
      [name, description, price, stock, category, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete product (admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const [result] = await db.promise().query(
      'DELETE FROM products WHERE id = ?',
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;