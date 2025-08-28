import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import superheroRoutes from './modules/superheroes/superhero.route';
import { getSequelize } from './libs/database/database';

const sequelize = getSequelize();

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/superheroes', superheroRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

async function start() {
  try {
    await sequelize.sync();
  } catch (err) {
    console.error('Database sync failed', err);
  }
}

start();
