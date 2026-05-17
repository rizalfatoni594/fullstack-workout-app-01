import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { workoutRouter } from './routes/workoutRoutes.js';

const PORT = process.env.PORT;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Log req path & method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
// Mount router
app.use('/api/workouts', workoutRouter);

async function startServer() {
  try {
    // Connect to db
    await connectDB();

    // Start listening to port
    app.listen(PORT, () => {
      console.log('Listening to port', PORT);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();
