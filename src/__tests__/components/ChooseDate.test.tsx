import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { describe, expect, test, afterEach } from 'vitest';
import ChooseDate from '../../components/ChooseDate/ChooseDate';
import { today } from '../../utils/consts';

expect.extend(matchers);

describe('ChooseDate', () => {
  afterEach(() => {
    cleanup();
  });
  test('should display current date initially', () => {
    render(<ChooseDate />);
    const currentDate = today;
    const input = screen.getByTestId('date-input');
    expect(input).toHaveValue(currentDate);
  });

  test('should display user input', () => {
    render(<ChooseDate />);
    const input = screen.getByTestId('date-input');
    userEvent.type(input, '2022-02-02');
    expect(input).toHaveValue('2022-02-02');
  });
});
