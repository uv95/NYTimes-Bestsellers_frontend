import {
  HOME_ROUTE,
  BOOKMARKS_ROUTE,
  FINISHED_BOOKS_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from './utils/consts';
import Bookmarks from './pages/Bookmarks/Bookmarks';
import Home from './pages/Home';
import FinishedBooks from './pages/FinishedBooks/FinishedBooks';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

interface Routes {
  path: string;
  Component: React.FC;
}

export const userRoutes: Routes[] = [
  { path: BOOKMARKS_ROUTE, Component: Bookmarks },
  { path: FINISHED_BOOKS_ROUTE, Component: FinishedBooks },
];
export const publicRoutes: Routes[] = [
  { path: HOME_ROUTE, Component: Home },
  { path: LOGIN_ROUTE, Component: Login },
  { path: REGISTER_ROUTE, Component: Register },
];
