import { Box, Stack, Typography } from '@mui/material';
import { IExercise } from '../utils/types/Exercise.types';
import { HorizontalScrollbar } from './HorizontalScrollbar';
import { Loader } from './Loader';

interface ISimilarExercises {
  targetMuscleExercises: IExercise[];
  equipmentExercises: IExercise[];
}

export const SimilarExercises = ({
  targetMuscleExercises,
  equipmentExercises,
}: ISimilarExercises): JSX.Element => {
  return (
    <Box sx={{ marginTop: { lg: '100px', xs: '0' } }}>
      <Typography variant="h3" mb={5} p="20px">
        Exercises that target the same muscle group
      </Typography>
      <Stack direction="row" sx={{ p: '2', position: 'relative' }}>
        {targetMuscleExercises.length ? (
          <HorizontalScrollbar data={targetMuscleExercises} />
        ) : (
          <Loader />
        )}
      </Stack>
      <Typography variant="h3" mb={5} p="20px">
        Exercises that target use the same equipment
      </Typography>
      <Stack direction="row" sx={{ p: '2', position: 'relative' }}>
        {equipmentExercises.length ? (
          <HorizontalScrollbar data={equipmentExercises} />
        ) : (
          <Loader />
        )}
      </Stack>
    </Box>
  );
};
