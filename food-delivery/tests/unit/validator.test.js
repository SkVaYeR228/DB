const { isValidOrderAmount, calculateDiscount } = require('../../src/utils/validator');

describe('Unit Tests (Без бази даних)', () => {
  
  test('isValidOrderAmount має повертати true для позитивних чисел', () => {
    expect(isValidOrderAmount(100)).toBe(true);
    expect(isValidOrderAmount(0.01)).toBe(true);
  });

  test('isValidOrderAmount має повертати false для 0 або мінуса', () => {
    expect(isValidOrderAmount(0)).toBe(false);
    expect(isValidOrderAmount(-50)).toBe(false);
  });

  test('calculateDiscount має правильно рахувати знижку', () => {
    const result = calculateDiscount(200, 10);
    expect(result).toBe(180);
  });
});