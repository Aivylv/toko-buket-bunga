const express = require('express');
const db = require('../config/database');
const router = express.Router();

// Get all orders (untuk admin)
router.get('/', async (req, res) => {
  try {
    let query = `
      SELECT o.*, u.nama_user as customer_name, u.email as customer_email
      FROM orders o 
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `;
    const [orders] = await db.promise().query(query);
    
    // Format data orders
    const formattedOrders = orders.map(order => ({
      ...order,
      total_pembayaran: parseFloat(order.total_pembayaran)
    }));
    
    res.json(formattedOrders);
  } catch (error) {
    console.error('Get All Orders Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const [orders] = await db.promise().query(`
      SELECT o.*, u.nama_user, u.email, u.no_hp 
      FROM orders o 
      JOIN users u ON o.user_id = u.id 
      WHERE o.id = ?
    `, [req.params.id]);
    
    if (orders.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Get order items
    const [orderItems] = await db.promise().query(`
      SELECT oi.*, p.nama_produk, p.gambar 
      FROM order_items oi 
      JOIN products p ON oi.product_id = p.id 
      WHERE oi.order_id = ?
    `, [req.params.id]);
    
    const order = {
      ...orders[0],
      items: orderItems.map(item => ({
        ...item,
        harga: parseFloat(item.harga)
      }))
    };
    
    res.json(order);
  } catch (error) {
    console.error('Get Order Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update order status (admin only)
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  
  try {
    // Validasi status
    const validStatuses = ['pending', 'diproses', 'dikirim', 'selesai', 'dibatalkan'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Status tidak valid' });
    }

    const [result] = await db.promise().query(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json({ message: 'Status order berhasil diupdate' });
  } catch (error) {
    console.error('Update Order Status Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete order
router.delete('/:id', async (req, res) => {
  try {
    // Hapus order items terlebih dahulu
    await db.promise().query('DELETE FROM order_items WHERE order_id = ?', [req.params.id]);
    
    // Hapus order
    const [result] = await db.promise().query('DELETE FROM orders WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json({ message: 'Order berhasil dihapus' });
  } catch (error) {
    console.error('Delete Order Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;