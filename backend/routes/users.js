const express = require('express');
const db = require('../config/database');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Get all users (admin only)
router.get('/', async (req, res) => {
  try {
    const [users] = await db.promise().query(
      'SELECT id, nama_user, email, role, status, created_at FROM users ORDER BY created_at DESC'
    );
    res.json(users);
  } catch (error) {
    console.error('Get All Users Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const [users] = await db.promise().query(
      'SELECT id, nama_user, email, role, status, created_at FROM users WHERE id = ?',
      [req.params.id]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(users[0]);
  } catch (error) {
    console.error('Get User Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user (admin only)
router.put('/:id', async (req, res) => {
  try {
    const { nama_user, email, role, status } = req.body;
    
    // Validasi
    if (!nama_user || !email || !role || !status) {
      return res.status(400).json({ message: 'Semua field wajib diisi' });
    }

    // Cek jika email sudah digunakan oleh user lain
    const [existingUsers] = await db.promise().query(
      'SELECT id FROM users WHERE email = ? AND id != ?',
      [email, req.params.id]
    );
    
    if (existingUsers.length > 0) {
      return res.status(400).json({ message: 'Email sudah digunakan' });
    }

    const [result] = await db.promise().query(
      'UPDATE users SET nama_user = ?, email = ?, role = ?, status = ? WHERE id = ?',
      [nama_user, email, role, status, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User berhasil diupdate' });
  } catch (error) {
    console.error('Update User Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user password
router.put('/:id/password', async (req, res) => {
  try {
    const { password } = req.body;
    
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password minimal 6 karakter' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [result] = await db.promise().query(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'Password berhasil diupdate' });
  } catch (error) {
    console.error('Update Password Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    // Cek jika user memiliki order
    const [orders] = await db.promise().query('SELECT id FROM orders WHERE user_id = ?', [req.params.id]);
    
    if (orders.length > 0) {
      return res.status(400).json({ message: 'Tidak dapat menghapus user yang memiliki order' });
    }

    const [result] = await db.promise().query('DELETE FROM users WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User berhasil dihapus' });
  } catch (error) {
    console.error('Delete User Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;