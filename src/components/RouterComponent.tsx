import { observer } from 'mobx-react-lite';
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
// import { useAppSelector } from '../hooks';
import { userRoutes, publicRoutes } from '../routes';
import { user } from '../store-mobX';
import { Spinner } from './UI/Spinner/Spinner';

const RouterComponent = observer(() => {
  //REDUX 🔵
  // const { user } = useAppSelector((state) => state.user);
  console.log('RouterComponent', user);
  return (
    <Suspense fallback={<Spinner />}>
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
    </Suspense>
  );
});

export default RouterComponent;
