const express = require('express');
const db = require('../config/database');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get user cart
router.get('/', auth, async (req, res) => {
  try {
    const [cartItems] = await db.promise().query(`
      SELECT c.*, p.name, p.price, p.image 
      FROM carts c 
      JOIN products p ON c.product_id = p.id 
      WHERE c.user_id = ?
    `, [req.user.id]);
    
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Add to cart
router.post('/', auth, async (req, res) => {
  const { product_id, quantity } = req.body;
  
  try {
    // Check if product already in cart
    const [existing] = await db.promise().query(
      'SELECT * FROM carts WHERE user_id = ? AND product_id = ?',
      [req.user.id, product_id]
    );
    
    if (existing.length > 0) {
      await db.promise().query(
        'UPDATE carts SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
        [quantity, req.user.id, product_id]
      );
    } else {
      await db.promise().query(
        'INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [req.user.id, product_id, quantity]
      );
    }
    
    res.json({ message: 'Product added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update cart item quantity
router.put('/:id', auth, async (req, res) => {
  const { quantity } = req.body;
  
  try {
    await db.promise().query(
      'UPDATE carts SET quantity = ? WHERE id = ? AND user_id = ?',
      [quantity, req.params.id, req.user.id]
    );
    
    res.json({ message: 'Cart updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Remove from cart
router.delete('/:id', auth, async (req, res) => {
  try {
    await db.promise().query(
      'DELETE FROM carts WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    
    res.json({ message: 'Product removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;