import { render, screen, cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { describe, expect, test, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MarkedBooks from '../../components/MarkedBooks/MarkedBooks';

const booksMock = [
  {
    title: 'Test Title',
    author: 'Test Author',
    cover: 'testcover.jpg',
    description: 'test description',
  },
  {
    title: 'Test Title 1',
    author: 'Test Author 1',
    cover: 'testcover1.jpg',
    description: 'test description 1',
  },

  {
    title: 'Test Title 2',
    author: 'Test Author 2',
    cover: 'testcover2.jpg',
    description: 'test description 2',
  },
];

expect.extend(matchers);

describe('MarkedBooks', () => {
  afterEach(() => {
    cleanup();
  });

  test('should display marked books', () => {
    render(
      <MemoryRouter>
        <MarkedBooks heading="Test Heading" books={booksMock} />
      </MemoryRouter>
    );

    const markedBooks = screen.getAllByTestId('marked-book');
    expect(markedBooks.length).toBe(3);
    markedBooks.forEach((book) => expect(book).toBeInTheDocument());
  });

  test('should display msg that there are no books if books array is empty', () => {
    render(
      <MemoryRouter>
        <MarkedBooks heading="Test Heading" books={[]} />
      </MemoryRouter>
    );

    const noBooksMsg = screen.getByTestId('no-books');
    const markedBooks = screen.queryAllByTestId('marked-book');
    expect(markedBooks.length).toBe(0);
    expect(noBooksMsg).toBeInTheDocument();
  });
});
