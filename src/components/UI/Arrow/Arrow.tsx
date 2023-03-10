import React from 'react';
import './arrow.scss';
import leftArrow from '../../../assets/icons/left.svg';
import rightArrow from '../../../assets/icons/right.svg';
import { bestsellers } from '../../../store-mobX';
import { observer } from 'mobx-react-lite';
import { IBookDetails } from '../../../utils/types';

type Props = {
  arrow: 'left' | 'right';
  goToPrevious: () => void;
  goToNext: (list: IBookDetails[]) => void;
  currentIndex: number;
};

const Arrow = observer(
  ({ arrow, goToPrevious, goToNext, currentIndex }: Props) => {
    if (arrow === 'left')
      return (
        <img
          src={leftArrow}
          alt="leftArrow"
          className={`arrow arrow${currentIndex !== 0 ? '' : '--hidden'}`}
          onClick={goToPrevious}
        />
      );
    return (
      <img
        src={rightArrow}
        alt="rightArrow"
        className={`arrow arrow${
          currentIndex !== bestsellers.currentBestsellersList.length - 4
            ? ''
            : '--hidden'
        }`}
        onClick={() => goToNext(bestsellers.currentBestsellersList)}
      />
    );
  }
);

export default Arrow;
