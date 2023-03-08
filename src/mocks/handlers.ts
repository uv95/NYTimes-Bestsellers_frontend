import { rest } from 'msw';
import { BASE_URL } from '../utils/consts';

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

export const handlers = [
  rest.post(BASE_URL + 'users/login', (req, res, ctx) => {
    localStorage.setItem('userLoggedIn', 'true');
    return res(ctx.json({ data: { data: { user: 'user' } } }));
  }),
];
