import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { describe, expect, test, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { user } from '../../store-mobX';
import RouterComponent from '../../components/RouterComponent';
import Background from '../../components/Background/Background';

expect.extend(matchers);

describe('Header', () => {
  afterEach(() => {
    cleanup();
  });

  test('display user icon if user is logged in', async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const testUser = { name: 'testName', email: 'test@test.com' };
    user.user = testUser;

    expect(user.user).toEqual(testUser);
    expect(
      await screen.findByRole('button', { name: 'user-icon' })
    ).toBeInTheDocument();
  });

  test('open profile menu when clicked on user icon', async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const userIcon = screen.getByRole('button', { name: 'user-icon' });
    userEvent.click(userIcon);
    expect(
      await screen.findByRole('button', { name: 'profile' })
    ).toBeInTheDocument();
  });

  test('display login icon if user not logged in', async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    user.user = null;
    expect(user.user).toEqual(null);
    expect(
      await screen.findByRole('button', { name: 'login-icon' })
    ).toBeInTheDocument();
  });

  test('open Login page when clicked on Bookmarks, Finished or login-icon if user is not logged in', async () => {
    render(
      <MemoryRouter>
        <Background children={<RouterComponent />} />
      </MemoryRouter>
    );
    const bookmarksBtn = screen.getByRole('button', { name: 'Bookmarks' });
    const finishedBtn = screen.getByRole('button', { name: 'Finished' });
    const loginIcon = screen.getByRole('button', { name: 'login-icon' });

    expect(user.user).toEqual(null);

    userEvent.click(bookmarksBtn);
    expect(
      await screen.findByRole('button', { name: 'Log in' })
    ).toBeInTheDocument();
    userEvent.click(finishedBtn);
    expect(
      await screen.findByRole('button', { name: 'Log in' })
    ).toBeInTheDocument();
    userEvent.click(loginIcon);
    expect(
      await screen.findByRole('button', { name: 'Log in' })
    ).toBeInTheDocument();
  });

  test('open Bookmarks or Finished if user is logged in', async () => {
    render(
      <MemoryRouter>
        <Background children={<RouterComponent />} />
      </MemoryRouter>
    );
    const bookmarksBtn = screen.getByRole('button', { name: 'Bookmarks' });
    const finishedBtn = screen.getByRole('button', { name: 'Finished' });

    const testUser = { name: 'testName', email: 'test@test.com' };
    user.user = testUser;

    userEvent.click(bookmarksBtn);
    expect(await screen.findByTestId('bookmarks')).toBeInTheDocument();

    userEvent.click(finishedBtn);
    expect(await screen.findByTestId('finished')).toBeInTheDocument();
  });
});
