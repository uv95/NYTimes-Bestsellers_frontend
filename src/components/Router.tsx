import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import NotFound from '../pages/NotFound/NotFound';
import { userRoutes, publicRoutes } from '../routes';

const Router = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      {user &&
        userRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
