import { Stack, Typography } from '@mui/material';

import Icon from '../assets/icons/gym.png';

export interface IBodyPart {
  item: any;
  bodyPart: string;
  setBodyPart: React.Dispatch<React.SetStateAction<string>>;
}

export const BodyPart = ({ item, bodyPart, setBodyPart }: IBodyPart) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
      sx={{
        borderTop: bodyPart === item ? '4px solid #ff2625' : '',
        background: '#fff',
        borderBottomLeftRadius: '20px',
        width: 270,
        height: 280,
        cursor: 'pointer',
        gap: '47px',
      }}
      onClick={() => {
        setBodyPart(item);
        window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
      }}
    >
      <img src={Icon} alt="dumbbell" style={{ width: 40, height: 40 }} />
      <Typography
        fontSize="24px"
        fontWeight="bold"
        color="#3a1212"
        textTransform="capitalize"
      >
        {item}
      </Typography>
    </Stack>
  );
};
