import express from 'express';
import { AppDataSource } from './data-source';
import taskRoutes from './routes/task';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import { authenticate } from './middleware/auth';

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');

    // Public routes
    app.use('/auth', authRoutes);

    // Protected routes
    app.use('/user', authenticate, userRoutes);
    app.use('/task', authenticate, taskRoutes);

    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => console.log('Database connection error:', error));