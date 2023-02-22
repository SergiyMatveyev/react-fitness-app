import { Box, Pagination, Stack, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { EXERCISES_OPTIONS, fetchData } from '../utils/fetchData';
import { IExercise } from '../utils/types/Exercise.types';
import { ExerciseCard } from './ExerciseCard';

interface IExercises {
  exercises: IExercise[];
  setExercises: React.Dispatch<React.SetStateAction<IExercise[]>>;
  bodyPart: string;
}

export const Exercises = ({
  exercises,
  setExercises,
  bodyPart,
}: IExercises) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const exercisesPerPage = 9;

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;

  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === 'all') {
        exercisesData = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises',
          EXERCISES_OPTIONS
        );
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          EXERCISES_OPTIONS
        );
      }

      setExercises(exercisesData);
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  return (
    <Box id="exercises" sx={{ marginTop: { lg: '110px' } }} mt="50px" p="20px">
      <Typography
        variant="h3"
        mb="46px"
        fontWeight={700}
        sx={{ fontSize: { lg: '40px', xs: '30px' } }}
      >
        Showing result
      </Typography>
      <Stack
        direction="row"
        sx={{ gap: { lg: '110px', xs: '50px' } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {exercises.length > exercisesPerPage && (
          <Pagination
            color="standard"
            shape="rounded"
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};
