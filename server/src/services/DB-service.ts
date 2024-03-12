import mongoose from 'mongoose';
import CONSTANTS from '../utils/contants';

export async function connectDB() {
  try {
    await mongoose.connect(CONSTANTS.Database.connectionUrl, {
      autoIndex: true,
      dbName: CONSTANTS.Database.name
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB');
  }
}
