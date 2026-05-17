import { useContext } from 'react';
import { WorkoutContext } from '../contexts/WorkoutContext.js';

function useWorkoutContext() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      'useWorkoutContext must be used inside a WorkoutContextProvider',
    );
  }

  return context;
}

export { useWorkoutContext };
