import { getFormattedCurrentDate } from './getFormattedCurrentDate';

export const classNames = (
  mainClass: string,
  ...conditionalClasses: (boolean | string | undefined)[]
) => {
  if (!conditionalClasses.length) return '';
  const filtered = conditionalClasses
    .map((el) => (!!el ? `${mainClass}--${el}` : ''))
    .join(' ')
    .trim();
  return filtered;
};

export const today = `${getFormattedCurrentDate().year}-${
  getFormattedCurrentDate().month
}-${getFormattedCurrentDate().date}`;

export const NYTimes_URL = (date: string) =>
  `https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=${date}&api-key=eIoal0qQr2Mwam9gXhcGUVF3ei0QpSMa`;

//routes
export const HOME_ROUTE = '/';
export const BOOKMARKS_ROUTE = '/bookmarks';
export const FINISHED_BOOKS_ROUTE = '/finished';
