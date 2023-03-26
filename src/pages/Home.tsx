import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import HomeError from '../components/HomeError/HomeError';
import MainContent from '../components/MainContent/MainContent';
import Slider from '../components/Slider/Slider';
import { bestsellers } from '../store-mobX';
import { today } from '../utils/consts';

const Home = observer(() => {
  //MOBX 🔶
  const { isDateChanged, date } = bestsellers;

  useEffect(() => {
    if (isDateChanged) bestsellers.setBestsellers(date || today);
  }, [isDateChanged, date]);

  return bestsellers.state === 'error' ? (
    <HomeError />
  ) : (
    <>
      <MainContent />
      <Slider />
    </>
  );
});

export default Home;
