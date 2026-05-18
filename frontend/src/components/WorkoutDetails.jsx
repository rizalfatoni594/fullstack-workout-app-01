import { formatDistanceToNow } from 'date-fns';
import { useWorkoutContext } from '../hooks/useWorkoutContext.js';

const API_URL = import.meta.env.VITE_API_URL;

export default function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutContext();

  async function handleClick() {
    try {
      const res = await fetch(`${API_URL}/api/workouts/${workout._id}`, {
        method: 'DELETE',
      });

      const json = await res.json();
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    } catch (error) {
      console.error('Failed to delete workout.', error);
    }
  }

  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>

      <p>
        <strong>Load: </strong>
        {workout.load} kg
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps} {workout.reps === 1 ? 'time' : 'times'}
      </p>
      <p>
        <strong>Added: </strong>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className='material-symbols-outlined' onClick={handleClick}>
        delete
      </span>
    </div>
  );
}
