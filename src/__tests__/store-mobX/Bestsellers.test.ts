import axios from 'axios';
import { test, expect, vi, describe, beforeEach, beforeAll } from 'vitest';
import { Bestsellers } from '../../store-mobX/Bestsellers';
import { NYTimes_URL } from '../../utils/consts';
import { StateType } from '../../utils/types';

vi.mock('axios');

const booksMock = [
  {
    books: [
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
    ],
  },
  {
    books: [
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
        description: '',
      },
    ],
  },
];
const dateMock = '2022-01-01';
let stateMock: StateType = 'pending';
let fetchResult: any;
let fetchBestsellersListsMock = vi.fn();

const setBestsellersSpy = vi.spyOn(Bestsellers.prototype, 'setBestsellers');
const formatBestsellersSpy = vi.spyOn(
  Bestsellers.prototype,
  'formatBestsellers'
);
const fetchBestsellersListsSpy = vi.spyOn(
  Bestsellers.prototype,
  'fetchBestsellersLists'
);

describe('Bestsellers', () => {
  beforeEach(() => {
    (axios.get as any).mockReset();
    fetchBestsellersListsMock.mockClear();
    setBestsellersSpy.mockClear();
    formatBestsellersSpy.mockClear();
    fetchBestsellersListsSpy.mockClear();
  });

  beforeAll(() => {
    fetchBestsellersListsMock = vi.fn(async () => {
      const url = NYTimes_URL(dateMock);
      stateMock = 'pending';
      try {
        const res = await axios.get(url);
        stateMock = 'success';
        return res.data;
      } catch (error) {
        stateMock = 'error';
      }
    });
  });

  test('should make a GET request to fetch books', async () => {
    (axios.get as any).mockResolvedValue({
      data: booksMock,
    });

    const url = NYTimes_URL(dateMock);

    const books = await axios.get(url);
    expect(axios.get).toHaveBeenCalledWith(url);
    expect(books.data).toStrictEqual(booksMock);
  });

  test('should fetch bestsellers lists', async () => {
    (axios.get as any).mockResolvedValue({
      data: booksMock,
    });
    fetchResult = await fetchBestsellersListsMock();
    expect(fetchBestsellersListsMock).toHaveBeenCalledTimes(1);
    expect(fetchResult).toBeDefined();
    expect(fetchResult).toStrictEqual(booksMock);
    expect(stateMock).toBe('success');
  });

  test('should combine bestsellers lists and remove books without description', () => {
    const bestsellers = new Bestsellers();
    const formattedBestsellers = bestsellers.formatBestsellers(fetchResult);
    expect(formattedBestsellers.length).toBe(3);
  });

  test('should throw an error after fetching', async () => {
    (axios.get as any).mockRejectedValue();
    fetchResult = await fetchBestsellersListsMock();
    expect(fetchResult).not.toBeDefined();
    expect(stateMock).toBe('error');
  });

  test('should throw an error if the wrong date is provided', async () => {
    const incorrectDate = '2022-42-42';
    const bestsellers = new Bestsellers();
    bestsellers.setDate(incorrectDate);
    expect(bestsellers.date).toBe(incorrectDate);
    const bestsellersLists = await bestsellers.fetchBestsellersLists(
      incorrectDate
    );
    expect(bestsellersLists).toBeUndefined();
    expect(bestsellers.state).toBe('error');
  });
});
