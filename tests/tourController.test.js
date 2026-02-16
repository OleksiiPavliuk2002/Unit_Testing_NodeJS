jest.mock('../models/tourModel', () => ({
  find: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn()
}));

jest.mock('../utils/filtering', () => ({
  filter: jest.fn()
}));

const Tour = require('../models/tourModel');
const { filter } = require('../utils/filtering');
const controller = require('../controllers/tourController');

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('tourController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllTours success', async () => {
    filter.mockResolvedValue([{ name: 'A' }]);
    const req = { query: {} };
    const res = mockRes();

    await controller.getAllTours(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'success', results: 1 })
    );
  });

  test('getAllTours failure returns 404', async () => {
    filter.mockRejectedValue(new Error('fail'));
    const req = { query: {} };
    const res = mockRes();

    await controller.getAllTours(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'fail' })
    );
  });

  test('createTour success returns 201', async () => {
    Tour.create.mockResolvedValue({ name: 'Created' });
    const req = { body: { name: 'Created' } };
    const res = mockRes();

    await controller.createTour(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'success' })
    );
  });

  test('createTour failure returns 400', async () => {
    Tour.create.mockRejectedValue(new Error('bad'));
    const req = { body: {} };
    const res = mockRes();

    await controller.createTour(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'fail' })
    );
  });

  test('getTour returns 200 and tour', async () => {
    Tour.findById.mockResolvedValue({ name: 'T' });
    const req = { params: { id: '1' } };
    const res = mockRes();

    await controller.getTour(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'success', data: { tour: { name: 'T' } } })
    );
  });

  test('updateTour returns 200 and updated', async () => {
    Tour.findByIdAndUpdate.mockResolvedValue({ name: 'Updated' });
    const req = { params: { id: '1' }, body: { name: 'Updated' } };
    const res = mockRes();

    await controller.updateTour(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'success', data: { tour: { name: 'Updated' } } })
    );
  });

  test('deleteTour returns 204', async () => {
    Tour.findByIdAndDelete.mockResolvedValue();
    const req = { params: { id: '1' } };
    const res = mockRes();

    await controller.deleteTour(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({ status: 'success', data: null });
  });
});
