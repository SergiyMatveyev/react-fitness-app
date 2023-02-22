import { Box } from '@mui/material';
import { useState } from 'react';
import { Exercises } from '../components/Exercises';
import { HeroBanner } from '../components/HeroBanner';
import { SearchExercises } from '../components/SearchExercises';
import { IExercise } from '../utils/types/Exercise.types';

export const Home = () => {
  const [bodyPart, setBodyPart] = useState<string>('all');
  const [exercises, setExercises] = useState<IExercise[]>([]);
  return (
    <Box>
      <HeroBanner />
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
        exercises={exercises}
        setExercises={setExercises}
        bodyPart={bodyPart}
      />
    </Box>
  );
};
