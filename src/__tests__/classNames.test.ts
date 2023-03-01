import { test, expect } from 'vitest';
import { classNames } from '../utils/classNames';

test('should return "class--subclass" pattern or empty string if condition is false', () => {
  const mainClass = 'class';
  let condition = true;
  const result1 = classNames(mainClass, condition && 'subClass');
  const result2 = classNames(
    mainClass,
    condition && 'subClass1',
    condition && 'subClass2'
  );
  expect(result1).toBe('class--subClass');
  expect(result2).toBe('class--subClass1 class--subClass2');

  condition = false;
  const result3 = classNames(mainClass, condition && 'subClass');
  expect(result3).toBe('');
});

test('should return empty string if no main class is provided', () => {
  const condition = true;
  const result = classNames(condition && 'subClass');
  expect(result).toBe('');
});
