import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { IExercise } from '../utils/types/Exercise.types';

const buttonStyle = {
  marginLeft: '21px',
  color: '#fff',
  fontSize: '14px',
  borderRadius: '20px',
  textTransform: 'capitalize',
};

export const ExerciseCard = ({ exercise }: { exercise: IExercise }) => {
  return (
    <Link to={`./exercise/${exercise.id}`} className="exercise-card">
      <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
      <Stack direction="row">
        <Button
          sx={{
            background: '#ffa9a9',
            ...buttonStyle,
          }}
        >
          {exercise.bodyPart}
        </Button>
        <Button
          sx={{
            background: '#fcc757',
            ...buttonStyle,
          }}
        >
          {exercise.target}
        </Button>
      </Stack>
      <Typography
        ml="21px"
        color="#000"
        fontWeight="bold"
        mt="11px"
        pb="10px"
        textTransform="capitalize"
        fontSize="22px"
      >
        {exercise.name}
      </Typography>
    </Link>
  );
};
