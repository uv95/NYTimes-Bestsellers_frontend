import { test, expect } from 'vitest';
import { formatCamelCase } from '../utils/formatCamelCase';

test('should format camelCase text', () => {
  const testText1 = 'someTestText';
  const testText2 = 'SomeTestText';
  const result = 'Some test text';

  expect(formatCamelCase(testText1)).toBe(result);
  expect(formatCamelCase(testText2)).toBe(result);
});
