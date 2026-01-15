const express = require('express');
const router = express.Router();
const {
  createVisitor,
  getVisitors,
  getTodayVisitors,
  approveVisitor,
  markExit,
  getVisitorById
} = require('../controllers/visitorController');
const { protect, receptionistOrAdmin } = require('../middleware/authMiddleware');

// POST /api/visitors - Public route for visitor registration
router.post('/', createVisitor);

// GET /api/visitors - Get all visitors (with filters)
router.get('/', protect, receptionistOrAdmin, getVisitors);

// GET /api/visitors/today - Get today's visitors
router.get('/today', protect, receptionistOrAdmin, getTodayVisitors);

// GET /api/visitors/:id - Get visitor by ID
router.get('/:id', protect, receptionistOrAdmin, getVisitorById);

// PUT /api/visitors/:id/approve - Approve visitor
router.put('/:id/approve', protect, receptionistOrAdmin, approveVisitor);

// PUT /api/visitors/:id/exit - Mark visitor exit
router.put('/:id/exit', protect, receptionistOrAdmin, markExit);

module.exports = router;
