const Visitor = require('../models/Visitor');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private (Admin)
const getDashboardStats = async (req, res) => {
  try {
    // Get today's date range
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Total visitors today
    const totalVisitorsToday = await Visitor.countDocuments({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    // Active visitors (Approved but not Exited)
    const activeVisitors = await Visitor.countDocuments({
      status: 'Approved',
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    // Total visitors overall
    const totalVisitorsOverall = await Visitor.countDocuments();

    // Waiting visitors
    const waitingVisitors = await Visitor.countDocuments({
      status: 'Waiting',
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    // Exited visitors today
    const exitedVisitorsToday = await Visitor.countDocuments({
      status: 'Exited',
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    res.json({
      totalVisitorsToday,
      activeVisitors,
      totalVisitorsOverall,
      waitingVisitors,
      exitedVisitorsToday
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get receptionist dashboard stats
// @route   GET /api/dashboard/receptionist-stats
// @access  Private (Receptionist/Admin)
const getReceptionistStats = async (req, res) => {
  try {
    // Get today's date range
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Total visitors today
    const totalVisitorsToday = await Visitor.countDocuments({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    // Active visitors (Approved but not Exited)
    const activeVisitors = await Visitor.countDocuments({
      status: 'Approved',
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    // Waiting visitors
    const waitingVisitors = await Visitor.countDocuments({
      status: 'Waiting',
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    res.json({
      totalVisitorsToday,
      activeVisitors,
      waitingVisitors
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getReceptionistStats
};
