import { IBookDetails } from '../utils/types';

export const getArrOfUniqueBooks = function (
  arr: IBookDetails[],
  propToCompare: string
): IBookDetails[] {
  const transformedArray = arr.map(
    (item: IBookDetails) =>
      [item[propToCompare as keyof typeof item], item] as const
  );
  const newMap = new Map(transformedArray);
  const result = [...newMap.values()];
  return result;
};
