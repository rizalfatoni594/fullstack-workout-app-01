import { useRef, useState } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext.js';

const API_URL = import.meta.env.VITE_API_URL;

export default function WorkoutForm() {
  const { dispatch } = useWorkoutContext();

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const inputRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const workout = { title, load, reps };

      const res = await fetch(`${API_URL}/api/workouts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workout),
      });

      const json = await res.json();

      if (!res.ok) {
        setEmptyFields(json.emptyFields ?? []);
        setError(json.error);
        return;
      }

      // reset states
      setTitle('');
      setLoad('');
      setReps('');
      setEmptyFields([]);
      setError(null);

      dispatch({ type: 'CREATE_WORKOUT', payload: json });
      inputRef.current.focus();
    } catch (error) {
      console.error('Failed to add workout.', error);
    }
  }

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Title:</label>
      <input
        type='text'
        placeholder='Exercise name'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        ref={inputRef}
        className={emptyFields.includes('title') ? 'error' : ''}
      />
      <label>Load (in kg):</label>
      <input
        type='number'
        min='0'
        placeholder='Number of kg (at least 0)'
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />
      <label>Reps:</label>
      <input
        type='number'
        min='1'
        placeholder='Number of repetition (at least 1)'
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
}
