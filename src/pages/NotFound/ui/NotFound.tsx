import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
import './notFound.scss';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="notFound">
      <div className="notFound__content">
        <h1>404</h1>
        <p>PAGE NOT FOUND</p>
        <Button text="Back" onClick={() => navigate(-1)} isOrange />
      </div>
    </div>
  );
};

export default NotFound;
