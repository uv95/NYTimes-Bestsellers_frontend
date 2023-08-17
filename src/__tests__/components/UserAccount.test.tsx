import { render, screen, cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { describe, expect, test, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import UserAccount from '../../pages/UserAccount/ui/UserAccount';
import { MemoryRouter } from 'react-router-dom';

expect.extend(matchers);

describe('UserAccount', () => {
  afterEach(() => {
    cleanup();
  });

  test('tab should become active when clicked', async () => {
    render(
      <MemoryRouter>
        <UserAccount />
      </MemoryRouter>
    );
    const changePasswordTab = screen.getByRole('button', {
      name: 'Change password',
    });
    expect(changePasswordTab).toBeInTheDocument();
    expect(changePasswordTab).not.toHaveClass('btn--active');
    expect(
      screen.getByRole('button', {
        name: 'Personal information',
      })
    ).toHaveClass('btn--active');
    expect(screen.getByTestId('changed-password')).toBeInTheDocument();
    userEvent.click(changePasswordTab);
    expect(changePasswordTab).toHaveClass('btn--active');
    // expect(screen.getByTestId('change-password')).toBeInTheDocument();
  });

  test('tab should become active wen clicked', async () => {
    render(
      <MemoryRouter>
        <UserAccount />
      </MemoryRouter>
    );
  });
});
