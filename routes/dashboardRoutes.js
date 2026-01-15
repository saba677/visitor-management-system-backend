const express = require('express');
const router = express.Router();
const { getDashboardStats, getReceptionistStats } = require('../controllers/dashboardController');
const { protect, admin, receptionistOrAdmin } = require('../middleware/authMiddleware');

// GET /api/dashboard/stats - Admin only
router.get('/stats', protect, admin, getDashboardStats);

// GET /api/dashboard/receptionist-stats - Receptionist or Admin
router.get('/receptionist-stats', protect, receptionistOrAdmin, getReceptionistStats);

module.exports = router;
