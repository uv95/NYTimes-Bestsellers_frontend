import { test, expect } from 'vitest';
import { getArrOfUniqueBooks } from '../utils/getUniqueBooksArray';

test('should return array of unique books', () => {
  const testArray = [
    {
      title: 'Test Title',
      author: 'Test Author',
      cover: 'testcover.jpg',
      isbn: '1111',
    },
    {
      title: 'Test Title',
      author: 'Test Author 1',
      cover: 'testcover1.jpg',
      isbn: '1112',
    },
    {
      title: 'Test Title',
      author: 'Test Author 1',
      cover: 'testcover1.jpg',
      isbn: '1112',
    },
    {
      title: 'Test Title 1',
      author: 'Test Author 1',
      cover: 'testcover2.jpg',
      isbn: '1113',
    },
  ];
  const result = [
    {
      title: 'Test Title',
      author: 'Test Author',
      cover: 'testcover.jpg',
      isbn: '1111',
    },
    {
      title: 'Test Title',
      author: 'Test Author 1',
      cover: 'testcover1.jpg',
      isbn: '1112',
    },
    {
      title: 'Test Title 1',
      author: 'Test Author 1',
      cover: 'testcover2.jpg',
      isbn: '1113',
    },
  ];

  expect(getArrOfUniqueBooks(testArray)).toEqual(result);
});

test('should return empty array of an empty array is provided', () => {
  expect(getArrOfUniqueBooks([])).toEqual([]);
});
