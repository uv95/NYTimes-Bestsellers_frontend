import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import HomeError from '../components/HomeError/HomeError';
import MainContent from '../components/MainContent/MainContent';
import Shelf from '../components/Shelf/Shelf';
import Slider from '../components/Slider/Slider';
import { bestsellers } from '../store-mobX';
import { today } from '../utils/consts';

const Home = observer(() => {
  //MOBX 🔶
  const { isDateChanged, date } = bestsellers;
  useEffect(() => {
    if (isDateChanged) bestsellers.loadBestsellers(date || today);
  }, [isDateChanged, date]);

  return bestsellers.state === 'error' ? (
    <HomeError />
  ) : (
    <>
      <MainContent currentBestseller={bestsellers.currentBestseller} />
      <Shelf />
      <Slider currentBestsellersList={bestsellers.currentBestsellersList} />
    </>
  );
});

export default Home;
