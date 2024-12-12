import request from 'supertest';
import app from '../app.js';

describe('GET /api/season-carpark-details', () => {
  it('should return an array of season carpark details', async () => {
    const response = await request(app).get('/api/season-carpark-details');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    if (response.body.length > 0) {
      const carpark = response.body[0];
      expect(carpark).toHaveProperty('ppCode');
      expect(carpark).toHaveProperty('ppName');
      expect(carpark).toHaveProperty('vehCat');
      expect(carpark).toHaveProperty('ticketType');
      expect(carpark).toHaveProperty('monthlyRate');
    }
  });
});
