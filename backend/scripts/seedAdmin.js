import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import connectDB from '../config/db.js';
import User from '../models/User.js';

const seedAdmin = async () => {
  try {
    await connectDB();

    const name = process.env.ADMIN_NAME || 'Admin User';
    const email = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
    const password = process.env.ADMIN_PASSWORD || 'Admin123!';

    const hashedPassword = await bcrypt.hash(password, 12);

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      existingAdmin.name = name;
      existingAdmin.role = 'admin';
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log(`Admin user updated: ${email}`);
    } else {
      await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'admin'
      });
      console.log(`Admin user created: ${email}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Admin seed failed:', error.message);
    process.exit(1);
  }
};

seedAdmin();
