import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export function getSequelize() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is missing');
  }
  return new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres' });
}
