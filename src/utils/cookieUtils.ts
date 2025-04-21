import { IUser } from './types';

export const setCookie = (name: string, value: string, days: number) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};samesite=strict;secure`;
};

export const getCookie = (cookie: string): string | null => {
  const cookies = document.cookie
    .split('; ')
    .reduce<Record<string, string>>((cookiesObject, item) => {
      const [name, value] = item.split('=');
      cookiesObject[name] = value;

      return cookiesObject;
    }, {});

  return cookies[cookie] || null;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;samesite=strict;secure`;
};

export const setTokenAndUser = (token: string, user: IUser) => {
  const DAYS_TO_EXPIRE = 7;

  setCookie('token', token, DAYS_TO_EXPIRE);
  setCookie('user', JSON.stringify(user), DAYS_TO_EXPIRE);
};
