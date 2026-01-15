const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

// Connect to MongoDB
connectDB();

const users = [
  {
    name: 'Admin User',
    email: 'admin@vms.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'Receptionist User',
    email: 'receptionist@vms.com',
    password: 'receptionist123',
    role: 'receptionist'
  }
];

const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany();
    console.log('Users cleared');

    // Insert new users one by one to trigger password hashing
    for (const userData of users) {
      await User.create(userData);
    }
    console.log('Users seeded successfully');

    console.log('\n=== LOGIN CREDENTIALS ===');
    console.log('\nAdmin:');
    console.log('Email: admin@vms.com');
    console.log('Password: admin123');
    console.log('\nReceptionist:');
    console.log('Email: receptionist@vms.com');
    console.log('Password: receptionist123');
    console.log('\n========================\n');

    process.exit();
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
