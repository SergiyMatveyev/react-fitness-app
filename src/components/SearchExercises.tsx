import { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { EXERCISES_OPTIONS, fetchData } from '../utils/fetchData';
import { HorizontalScrollbar } from './HorizontalScrollbar';
import { IExercise } from '../utils/types/Exercise.types';

export interface ISearchExercises {
  setExercises: React.Dispatch<React.SetStateAction<IExercise[]>>;
  bodyPart: string;
  setBodyPart: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchExercises = ({
  setExercises,
  bodyPart,
  setBodyPart,
}: ISearchExercises) => {
  const [search, setSearch] = useState<string>('');
  const [bodyParts, setBodyParts] = useState<any[]>([]);

  const handleSearch = async () => {
    if (search) {
      const exercisesData: IExercise[] = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises',
        EXERCISES_OPTIONS
      );

      const searchedExercises = exercisesData.filter(
        exercise =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search) ||
          exercise.target.toLocaleLowerCase().includes(search) ||
          exercise.equipment.toLocaleLowerCase().includes(search)
      );

      setSearch('');
      setExercises(searchedExercises);

      console.log(searchedExercises);
    }
  };

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        EXERCISES_OPTIONS
      );
      setBodyParts(['all', ...bodyPartsData]);
    };
    fetchExercisesData();
  }, []);

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: '40px', xs: '30px' } }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises you <br /> Should know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: { fontWeight: 700 },
            width: { lg: '800px', xs: '350px' },
          }}
          fullWidth
          value={search}
          onChange={e => {
            setSearch(e.target.value.toLowerCase());
          }}
          placeholder="Search Exercises"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: '#ff2625',
            color: '#fff',
            textTransform: 'none',
            width: { lg: '175px', xs: '80px' },
            fontSize: { lg: '20px', xs: '14px' },
            height: '56px',
            position: 'absolute',
            right: 0,
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
        />
      </Box>
    </Stack>
  );
};
