import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import {
  describe,
  expect,
  test,
  afterEach,
  beforeAll,
  afterAll,
  vi,
} from 'vitest';
import Login from '../../pages/Login/Login';
import { MemoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { server } from '../../mocks/server';
import { rest } from 'msw';
import { BASE_URL } from '../../utils/consts';

expect.extend(matchers);

describe('Login', () => {
  beforeAll(() => {
    server.listen();
  });
  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });
  afterAll(() => {
    server.close();
  });

  test('should display inputs and btn in Login page', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const emailField = screen.getByPlaceholderText('Email');
    const passwordField = screen.getByPlaceholderText('Password');
    const loginBtn = screen.getByRole('button', { name: 'Log in' });
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });

  test('should display toastify alert if inputs are empty', async () => {
    server.use(
      rest.post(BASE_URL + 'users/login', (req, res, ctx) => {
        return res(ctx.json(null));
      })
    );
    render(
      <MemoryRouter>
        <Login />
        <ToastContainer />
      </MemoryRouter>
    );
    const loginBtn = screen.getByRole('button', { name: 'Log in' });

    userEvent.click(loginBtn);
    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });
});
