import { observer } from 'mobx-react-lite';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import NotFound from '../pages/NotFound/NotFound';
import { userRoutes, publicRoutes } from '../routes';
import { user } from '../store-mobX';

const RouterComponent = observer(() => {
  //REDUX 🔵
  // const { user } = useAppSelector((state) => state.user);
  return (
    <Routes>
      {user.user &&
        userRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
});

export default RouterComponent;
