import React from 'react';
import './homeError.scss';
import Button from '../UI/Button/Button';
import { useNavigate } from 'react-router-dom';

const HomeError = () => {
  const navigate = useNavigate();
  return (
    <div className="homeError">
      <p>Oops! Something went wrong.</p>
      <Button text="Reload page" isColored onClick={() => navigate('/')} />
    </div>
  );
};

export default HomeError;
