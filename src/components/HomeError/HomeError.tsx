import React from 'react';
import './homeError.scss';
import Button from '../UI/Button/Button';

const HomeError = () => {
  return (
    <div className="homeError" data-testid="homeError">
      <p>Oops! Something went wrong.</p>
      <Button
        text="Reload page"
        isOrange
        onClick={() => window.location.reload()}
      />
    </div>
  );
};

export default HomeError;
