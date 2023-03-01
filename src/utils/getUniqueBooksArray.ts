import { IBookDetails } from './types';

export const getArrOfUniqueBooks = function (
  arr: IBookDetails[]
): IBookDetails[] {
  const transformedArray = arr.map(
    (item: IBookDetails) => [item.isbn, item] as const
  );
  const newMap = new Map(transformedArray);
  const result = [...newMap.values()];
  return result;
};
