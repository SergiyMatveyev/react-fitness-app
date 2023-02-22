import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Detail } from '../components/Detail';
import { ExerciseVideos } from '../components/ExerciseVideos';
import { SimilarExercises } from '../components/SimilarExercises';
import {
  EXERCISES_OPTIONS,
  fetchData,
  YOUTUBE_OPTIONS,
} from '../utils/fetchData';
import { IExercise } from '../utils/types/Exercise.types';
import { IYouTubeVideo } from '../utils/types/YouTubeVideo.type';

export const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState<IExercise | null>(null);
  const [exerciseVideos, setExerciseVideos] = useState<IYouTubeVideo[]>([]);
  const [targetMuscleExercisesDetail, setTargetMuscleExercisesDetail] =
    useState<IExercise[]>([]);
  const [equipmentExercisesDetail, setEquipmentExercisesDetail] = useState<
    IExercise[]
  >([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl =
        'https://youtube-search-and-download.p.rapidapi.com';

      const exerciseDetailData: IExercise | null = await fetchData(
        `${exerciseDbUrl}/exercises/exercise/${id}`,
        EXERCISES_OPTIONS
      );

      if (exerciseDetailData) {
        setExerciseDetail(exerciseDetailData);

        const exerciseVideosData = await fetchData(
          `${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`,
          YOUTUBE_OPTIONS
        );
        setExerciseVideos(exerciseVideosData.contents);

        const targetMuscleExercisesData = await fetchData(
          `${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
          EXERCISES_OPTIONS
        );
        setTargetMuscleExercisesDetail(targetMuscleExercisesData);

        const equipmentExercisesData = await fetchData(
          `${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
          EXERCISES_OPTIONS
        );
        setEquipmentExercisesDetail(equipmentExercisesData);
      }
    };
    fetchExercisesData();
  }, [id]);

  if (exerciseDetail) {
    return (
      <Box>
        <Detail exerciseDetailData={exerciseDetail} />
        <ExerciseVideos
          exerciseVideos={exerciseVideos}
          name={exerciseDetail.name}
        />
        <SimilarExercises
          targetMuscleExercises={targetMuscleExercisesDetail}
          equipmentExercises={equipmentExercisesDetail}
        />
      </Box>
    );
  }

  return <h1>No such exercise</h1>;
};
