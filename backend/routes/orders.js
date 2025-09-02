const express = require('express');
const db = require('../config/database');
const { auth } = require('../middleware/auth'); // Import middleware auth
const router = express.Router();

// Get user's order history (Protected Route)
router.get('/my-orders', auth, async (req, res) => {
  try {
    const [orders] = await db.promise().query(
      'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(orders);
  } catch (error) {
    console.error('Get My Orders Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/', auth, async (req, res) => {
  const { shippingInfo, orderItems, total } = req.body;
  const { namaPenerima, alamat, noHp } = shippingInfo;
  const user_id = req.user.id;
  
  if (!namaPenerima || !alamat || !noHp || !orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'Data pesanan tidak lengkap' });
  }

  // Gunakan koneksi db secara langsung untuk transaksi
  const dbPromise = db.promise();

  try {
    // Mulai transaksi
    await dbPromise.beginTransaction();

    // 1. Masukkan data ke tabel `orders`
    const [orderResult] = await dbPromise.query(
      'INSERT INTO orders (user_id, total_pembayaran, jumlah_produk, nama_penerima, alamat, no_hp, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [user_id, total, orderItems.length, namaPenerima, alamat, noHp, 'pending']
    );

    const orderId = orderResult.insertId;

    // 2. Masukkan setiap item pesanan ke tabel `order_items`
    const orderItemsValues = orderItems.map(item => [
      orderId,
      item.product_id,
      item.quantity,
      item.price
    ]);

    await dbPromise.query(
      'INSERT INTO order_items (order_id, product_id, jumlah, harga) VALUES ?',
      [orderItemsValues]
    );

    // 3. Kosongkan keranjang pengguna
    await dbPromise.query('DELETE FROM carts WHERE user_id = ?', [user_id]);

    // Jika semua berhasil, commit transaksi
    await dbPromise.commit();
    res.status(201).json({ message: 'Pesanan berhasil dibuat', orderId: orderId });

  } catch (error) {
    // Jika ada error, batalkan semua perubahan
    await dbPromise.rollback();
    console.error('Create Order Error:', error);
    res.status(500).json({ message: 'Gagal membuat pesanan', error: error.message });
  }
  // Tidak perlu .release() karena kita tidak menggunakan pool
});

// --- Rute Admin (biarkan seperti sebelumnya) ---

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
      SELECT o.*, u.nama_user, u.email
      FROM orders o 
      JOIN users u ON o.user_id = u.id 
      WHERE o.id = ?
    `, [req.params.id]);
    
    if (orders.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
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
    await db.promise().query('DELETE FROM order_items WHERE order_id = ?', [req.params.id]);
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