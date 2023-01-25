import {
  HOME_ROUTE,
  BOOKMARKS_ROUTE,
  FINISHED_BOOKS_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  USER_ACCOUNT_ROUTE,
} from './utils/consts';
import Bookmarks from './pages/Bookmarks/Bookmarks';
import Home from './pages/Home';
import FinishedBooks from './pages/FinishedBooks/FinishedBooks';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import UserAccount from './pages/UserAccount/UserAccount';

interface Routes {
  path: string;
  Component: React.FC;
}

export const userRoutes: Routes[] = [
  { path: BOOKMARKS_ROUTE, Component: Bookmarks },
  { path: FINISHED_BOOKS_ROUTE, Component: FinishedBooks },
  { path: USER_ACCOUNT_ROUTE, Component: UserAccount },
];
export const publicRoutes: Routes[] = [
  { path: HOME_ROUTE, Component: Home },
  { path: LOGIN_ROUTE, Component: Login },
  { path: REGISTER_ROUTE, Component: Register },
];
