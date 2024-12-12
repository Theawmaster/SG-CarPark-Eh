import request from 'supertest';
import app from '../app.js';
import exp from 'constants';

describe('GET /api/carpark-details', () => {
  it('should return an array of carpark details', async () => {
    const response = await request(app).get('/api/carpark-details');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    if (response.body.length > 0) {
      const carpark = response.body[0];
      expect(carpark).toHaveProperty('ppCode');
      expect(carpark).toHaveProperty('weekdayRate');
      expect(carpark).toHaveProperty('vehCat');
      expect(carpark).toHaveProperty('weekdayRate');
      expect(carpark).toHaveProperty('satdayRate');
      expect(carpark).toHaveProperty('sunPHRate');
      expect(carpark).toHaveProperty('parkingSystem');
      expect(carpark).toHaveProperty('parkCapacity');
    }
  });
});
