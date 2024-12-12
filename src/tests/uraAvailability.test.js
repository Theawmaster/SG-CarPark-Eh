import request from 'supertest';
import app from '../app.js';

describe('GET /api/carpark-availability', () => {
  it('should return an array of carpark availability objects', async () => {
    const response = await request(app).get('/api/carpark-availability');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    if (response.body.length > 0) {
      const carpark = response.body[0];
      expect(carpark).toHaveProperty('carparkNo');
      expect(carpark).toHaveProperty('lotType');
      expect(carpark).toHaveProperty('lotsAvailable');
      expect(carpark).toHaveProperty('geometries');
    }
  });
});
