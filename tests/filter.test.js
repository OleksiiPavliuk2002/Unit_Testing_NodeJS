const { filter } = require('../utils/filtering');

describe('filter util', () => {
  test('applies query filters and calls `find` with parsed object', async () => {
    const mockFind = jest.fn().mockResolvedValue([{ name: 'Test Tour' }]);
    const fakeQuery = { find: mockFind };

    const queryString = { price: { gte: '500' }, page: '2' };

    const result = await filter(fakeQuery, queryString);

    expect(mockFind).toHaveBeenCalledWith({ price: { $gte: '500' } });
    expect(result).toEqual([{ name: 'Test Tour' }]);
  });
});
