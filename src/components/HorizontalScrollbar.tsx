import React, { useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Typography } from '@mui/material';
import { BodyPart } from './BodyPart';

import RightArrowIcon from '../assets/icons/right-arrow.png';
import LeftArrowIcon from '../assets/icons/left-arrow.png';
import { ExerciseCard } from './ExerciseCard';
import { IExercise } from '../utils/types/Exercise.types';

type Data = IExercise[] | string[];

export interface IHorizontalScrollbar {
  data: Data;
  bodyPart?: string;
  setBodyPart?: React.Dispatch<React.SetStateAction<string>>;
}

interface IItemIdDiv extends React.HTMLProps<HTMLDivElement> {
  itemId: string;
}

const ItemIdDiv = (props: IItemIdDiv) => {
  const { itemId, children, ...restProps } = props;
  return <div {...restProps}>{children}</div>;
};

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollPrev()} className="right-arrow">
      <img src={LeftArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollNext()} className="left-arrow">
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

export const HorizontalScrollbar = ({
  data,
  bodyPart,
  setBodyPart,
}: IHorizontalScrollbar) => {
  const isBodyParts = bodyPart && setBodyPart;
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {data.map(item => (
        <ItemIdDiv
          key={typeof item === 'string' ? item : item.id}
          itemId={typeof item === 'string' ? item : item.id}
          style={{ margin: '0 40px' }}
        >
          {isBodyParts && typeof item === 'string' ? (
            <BodyPart
              item={item}
              bodyPart={bodyPart}
              setBodyPart={setBodyPart}
            />
          ) : (
            typeof item === 'object' && <ExerciseCard exercise={item} />
          )}
        </ItemIdDiv>
      ))}
    </ScrollMenu>
  );
};
