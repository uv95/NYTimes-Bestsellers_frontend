import { getFormattedCurrentDate } from './getFormattedCurrentDate';

export const today = `${getFormattedCurrentDate().year}-${
  getFormattedCurrentDate().month
}-${getFormattedCurrentDate().date}`;

export const NYTimes_URL = (date: string) =>
  `https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=${date}&api-key=eIoal0qQr2Mwam9gXhcGUVF3ei0QpSMa`;

//routes
export const HOME_ROUTE = '/';
export const BOOKMARKS_ROUTE = '/bookmarks';
export const FINISHED_BOOKS_ROUTE = '/finished';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const USER_ACCOUNT_ROUTE = '/profile';
export const FORGOT_PASSWORD_ROUTE = '/forgotPassword';
export const RESET_PASSWORD_ROUTE = '/users/resetPassword/:token';

export const BASE_URL = 'http://localhost:5001/';
