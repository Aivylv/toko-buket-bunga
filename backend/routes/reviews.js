const express = require('express');
const db = require('../config/database');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Get reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const [reviews] = await db.promise().query(`
      SELECT r.*, u.name as user_name 
      FROM reviews r 
      JOIN users u ON r.user_id = u.id 
      WHERE r.product_id = ?
      ORDER BY r.created_at DESC
    `, [req.params.productId]);
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's reviews
router.get('/my-reviews', auth, async (req, res) => {
  try {
    const [reviews] = await db.promise().query(`
      SELECT r.*, p.name as product_name, p.image as product_image
      FROM reviews r 
      JOIN products p ON r.product_id = p.id 
      WHERE r.user_id = ?
      ORDER BY r.created_at DESC
    `, [req.user.id]);
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add review
router.post('/', auth, async (req, res) => {
  const { product_id, rating, comment } = req.body;
  
  // Validation
  if (!product_id || !rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Please provide valid product ID and rating (1-5)' });
  }
  
  try {
    // Check if user already reviewed this product
    const [existing] = await db.promise().query(
      'SELECT * FROM reviews WHERE user_id = ? AND product_id = ?',
      [req.user.id, product_id]
    );
    
    if (existing.length > 0) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }
    
    // Check if user has purchased this product
    const [purchased] = await db.promise().query(`
      SELECT oi.* FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      WHERE o.user_id = ? AND oi.product_id = ? AND o.status = 'completed'
    `, [req.user.id, product_id]);
    
    if (purchased.length === 0) {
      return res.status(400).json({ message: 'You can only review products you have purchased' });
    }
    
    // Insert new review
    await db.promise().query(
      'INSERT INTO reviews (user_id, product_id, rating, comment) VALUES (?, ?, ?, ?)',
      [req.user.id, product_id, rating, comment]
    );
    
    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update review
router.put('/:id', auth, async (req, res) => {
  const { rating, comment } = req.body;
  
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Please provide valid rating (1-5)' });
  }
  
  try {
    const [result] = await db.promise().query(
      'UPDATE reviews SET rating = ?, comment = ?, updated_at = NOW() WHERE id = ? AND user_id = ?',
      [rating, comment, req.params.id, req.user.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Review not found or unauthorized' });
    }
    
    res.json({ message: 'Review updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete review
router.delete('/:id', auth, async (req, res) => {
  try {
    const [result] = await db.promise().query(
      'DELETE FROM reviews WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Review not found or unauthorized' });
    }
    
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;