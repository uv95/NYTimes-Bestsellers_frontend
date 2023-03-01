import { test, expect } from 'vitest';
import { classNames } from '../utils/classNames';

test('should return "class--subclass" pattern or empty string if condition is false', () => {
  const mainClass = 'class';
  let condition = true;
  const func1 = classNames(mainClass, condition && 'subClass');
  const result1 = 'class--subClass';
  const func2 = classNames(
    mainClass,
    condition && 'subClass1',
    condition && 'subClass2'
  );
  const result2 = 'class--subClass1 class--subClass2';

  expect(func1).toBe(result1);
  expect(func2).toBe(result2);

  condition = false;
  const func3 = classNames(mainClass, condition && 'subClass');
  expect(func3).toBe('');
});

test('should return empty string if no main class is provided', () => {
  const condition = true;
  const func = classNames(condition && 'subClass');
  expect(func).toBe('');
});
