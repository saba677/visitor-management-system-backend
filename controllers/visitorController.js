const Visitor = require('../models/Visitor');

// @desc    Create new visitor
// @route   POST /api/visitors
// @access  Public
const createVisitor = async (req, res) => {
  try {
    const { name, contact, purpose } = req.body;

    // Validate input
    if (!name || !contact || !purpose) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Create visitor
    const visitor = await Visitor.create({
      name,
      contact,
      purpose
    });

    res.status(201).json({
      message: 'Visitor registered successfully',
      visitor
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all visitors
// @route   GET /api/visitors
// @access  Private (Receptionist/Admin)
const getVisitors = async (req, res) => {
  try {
    const { date, status } = req.query;
    let query = {};

    // Filter by date if provided
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      query.createdAt = {
        $gte: startDate,
        $lte: endDate
      };
    }

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    const visitors = await Visitor.find(query).sort({ createdAt: -1 });

    res.json({
      count: visitors.length,
      visitors
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get today's visitors
// @route   GET /api/visitors/today
// @access  Private (Receptionist/Admin)
const getTodayVisitors = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const visitors = await Visitor.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    }).sort({ createdAt: -1 });

    res.json({
      count: visitors.length,
      visitors
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Approve visitor
// @route   PUT /api/visitors/:id/approve
// @access  Private (Receptionist/Admin)
const approveVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }

    visitor.status = 'Approved';
    await visitor.save();

    res.json({
      message: 'Visitor approved successfully',
      visitor
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Mark visitor exit
// @route   PUT /api/visitors/:id/exit
// @access  Private (Receptionist/Admin)
const markExit = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }

    visitor.status = 'Exited';
    visitor.exitTime = new Date();
    await visitor.save();

    res.json({
      message: 'Visitor exit marked successfully',
      visitor
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get visitor by ID
// @route   GET /api/visitors/:id
// @access  Private (Receptionist/Admin)
const getVisitorById = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({ message: 'Visitor not found' });
    }

    res.json(visitor);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createVisitor,
  getVisitors,
  getTodayVisitors,
  approveVisitor,
  markExit,
  getVisitorById
};
