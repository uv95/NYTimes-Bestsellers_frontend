import {
  HOME_ROUTE,
  BOOKMARKS_ROUTE,
  FINISHED_BOOKS_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  USER_ACCOUNT_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  RESET_PASSWORD_ROUTE,
} from './utils/consts';
import Home from './pages/Home';
import { Bookmarks } from './pages/Bookmarks';
import { FinishedBooks } from './pages/FinishedBooks';
import { UserAccount } from './pages/UserAccount';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';

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
  { path: FORGOT_PASSWORD_ROUTE, Component: ForgotPassword },
  { path: RESET_PASSWORD_ROUTE, Component: ResetPassword },
];
