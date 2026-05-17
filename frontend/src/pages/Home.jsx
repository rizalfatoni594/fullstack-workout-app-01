import { useEffect } from 'react';

// components
import WorkoutDetails from '../components/WorkoutDetails.jsx';
import WorkoutForm from '../components/WorkoutForm.jsx';

import { useWorkoutContext } from '../hooks/useWorkoutContext.js';

const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch(`${API_URL}/api/workouts`);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json = await res.json();
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      } catch (error) {
        console.error('Failed to fetch workouts', error);
      }
    }

    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className='home'>
      <div className='workouts'>
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
}
