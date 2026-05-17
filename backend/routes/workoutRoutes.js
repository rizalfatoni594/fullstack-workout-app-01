import express from 'express';
import {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} from '../controllers/workoutController.js';

const workoutRouter = express.Router();

workoutRouter.get('/', getWorkouts);
workoutRouter.get('/:id', getWorkout);
workoutRouter.post('/', createWorkout);
workoutRouter.patch('/:id', updateWorkout);
workoutRouter.delete('/:id', deleteWorkout);

export { workoutRouter };
