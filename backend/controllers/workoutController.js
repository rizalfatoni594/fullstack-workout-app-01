import mongoose from 'mongoose';
import { Workout } from '../models/workoutModel.js';

// get all workouts
async function getWorkouts(req, res) {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get a single workout
async function getWorkout(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid workout id' });
    }

    const workout = await Workout.findById(id);

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// create a workout
async function createWorkout(req, res) {
  try {
    const { title, load, reps } = req.body;

    let emptyFields = [];

    if (!title) {
      emptyFields.push('title');
    }
    if (!load) {
      emptyFields.push('load');
    }
    if (!reps) {
      emptyFields.push('reps');
    }
    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ error: 'Please fill in all the fields', emptyFields });
    }

    const workout = await Workout.create({ title, load, reps });

    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// update a workout
async function updateWorkout(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid workout id' });
    }

    const workout = await Workout.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true },
    );

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// delete a workout
async function deleteWorkout(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid workout id' });
    }

    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { getWorkouts, getWorkout, createWorkout, updateWorkout, deleteWorkout };
