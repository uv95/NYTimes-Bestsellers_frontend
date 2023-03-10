import { rest } from 'msw';
import { BASE_URL } from '../utils/consts';

export const handlers = [
  rest.post(BASE_URL + 'users/login', (req, res, ctx) => {
    localStorage.setItem('userLoggedIn', 'true');
    return res(ctx.json({ data: { data: { user: 'user' } } }));
  }),
];
