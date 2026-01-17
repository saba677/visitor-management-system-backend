const express = require('express');
const router = express.Router();
const { login, register, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/register
router.post('/register', register);

// GET /api/auth/profile
router.get('/profile', protect, getProfile);

module.exports = router;
