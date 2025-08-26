import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './modules/users/auth.route';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
