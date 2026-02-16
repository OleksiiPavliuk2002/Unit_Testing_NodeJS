const Tour = require('../models/tourModel');

describe('Tour model validations', () => {
  test('validates a correct tour document', async () => {
    const data = {
      name: 'The Forest Hiker',
      duration: 5,
      maxGroupSize: 10,
      difficulty: 'easy',
      price: 299,
      summary: 'A nice tour'
    };

    const tour = new Tour(data);

    await expect(tour.validate()).resolves.toBeUndefined();
    expect(tour.name).toBe(data.name);
  });

  test('validation fails when required fields are missing', async () => {
    const data = { price: 100 };
    const tour = new Tour(data);

    await expect(tour.validate()).rejects.toThrow();
  });

  test('priceDiscount validator rejects invalid discount', async () => {
    const data = {
      name: 'The Sea Explorer',
      duration: 7,
      maxGroupSize: 12,
      difficulty: 'medium',
      price: 100,
      priceDiscount: 150,
      summary: 'Bad discount'
    };

    const tour = new Tour(data);

    await expect(tour.validate()).rejects.toThrow();
  });
});
