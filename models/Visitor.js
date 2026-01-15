const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add visitor name'],
    trim: true
  },
  contact: {
    type: String,
    required: [true, 'Please add contact number'],
    trim: true
  },
  purpose: {
    type: String,
    required: [true, 'Please add purpose of visit'],
    trim: true
  },
  entryTime: {
    type: Date,
    default: Date.now
  },
  exitTime: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['Waiting', 'Approved', 'Exited'],
    default: 'Waiting'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Visitor', visitorSchema);
