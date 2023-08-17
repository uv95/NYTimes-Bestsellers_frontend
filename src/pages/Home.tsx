import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import HomeError from '../components/HomeError/HomeError';
import MainContent from '../components/MainContent/MainContent';
import Slider from '../components/Slider/Slider';
import { Spinner } from '../components/UI/Spinner/Spinner';
import { bestsellers } from '../store-mobX';
import { today } from '../utils/consts';
import { StateType } from '../utils/types';

const Home = observer(() => {
  //MOBX 🔶
  const { isDateChanged, date } = bestsellers;

  useEffect(() => {
    if (isDateChanged) bestsellers.setBestsellers(date || today);
  }, [isDateChanged, date]);

  if (bestsellers.state===StateType.PENDING) return <Spinner/>

  return bestsellers.state === StateType.ERROR ? (
    <HomeError />
  ) : (
    <>
      <MainContent />
      <Slider />
    </>
  );
});

export default Home;
