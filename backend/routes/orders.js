const express = require('express');
const db = require('../config/database');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get all orders (admin only)
router.get('/', auth, async (req, res) => {
  try {
    let query = `
      SELECT o.*, u.name as customer_name 
      FROM orders o 
      JOIN users u ON o.user_id = u.id
    `;
    
    if (req.user.role !== 'admin') {
      query += ' WHERE o.user_id = ?';
      const [orders] = await db.promise().query(query, [req.user.id]);
      return res.json(orders);
    }
    
    const [orders] = await db.promise().query(query);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create new order
router.post('/', auth, async (req, res) => {
  const { items, total_price, shipping_address } = req.body;
  
  try {
    const [orderResult] = await db.promise().query(
      'INSERT INTO orders (user_id, total_price, status, shipping_address) VALUES (?, ?, ?, ?)',
      [req.user.id, total_price, 'pending', shipping_address]
    );
    
    const orderId = orderResult.insertId;
    
    for (const item of items) {
      await db.promise().query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [orderId, item.product_id, item.quantity, item.price]
      );
      
      // Update product stock
      await db.promise().query(
        'UPDATE products SET stock = stock - ? WHERE id = ?',
        [item.quantity, item.product_id]
      );
    }
    
    res.status(201).json({ message: 'Order created successfully', orderId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update order status (admin only)
router.put('/:id/status', auth, async (req, res) => {
  const { status } = req.body;
  
  try {
    await db.promise().query(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, req.params.id]
    );
    
    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;