import { test, expect } from 'vitest';
import { getArrOfUniqueBooks } from '../../utils/getUniqueBooksArray';

test('should return array of unique books', () => {
  const testArray = [
    {
      title: 'Test Title',
      author: 'Test Author',
      cover: 'testcover.jpg',
    },
    {
      title: 'Test Title',
      author: 'Test Author',
      cover: 'testcover.jpg',
    },
    {
      title: 'Test Title 1',
      author: 'Test Author 1',
      cover: 'testcover1.jpg',
    },
  ];
  const result = [
    {
      title: 'Test Title',
      author: 'Test Author',
      cover: 'testcover.jpg',
    },
    {
      title: 'Test Title 1',
      author: 'Test Author 1',
      cover: 'testcover1.jpg',
    },
  ];

  expect(getArrOfUniqueBooks(testArray)).toEqual(result);
});

test('should return empty array of an empty array is provided', () => {
  expect(getArrOfUniqueBooks([])).toEqual([]);
});
