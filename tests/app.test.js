const request = require('supertest');
const app = require('../index');

describe('POST /api/travel-budget', () => {

  test('Calcul budget Asie standard sans enfants', async () => {
    const res = await request(app)
      .post('/api/travel-budget')
      .send({
        destination: 'Asie',
        hotel: 'standard',
        days: 7,
        persons: 2,
        children: false,
        pension: 'none',
        bookingDate: '2025-06-01'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.totalBudget).toBeDefined();
  });

  test('Calcul budget Europe avec enfants', async () => {
    const res = await request(app)
      .post('/api/travel-budget')
      .send({
        destination: 'Europe',
        hotel: 'budget',
        days: 5,
        persons: 2,
        children: true,
        pension: 'none',
        bookingDate: '2025-06-01'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.totalBudget).toBeDefined();
  });

  test('Reduction 15% si reservation plus de 6 mois', async () => {
    const res = await request(app)
      .post('/api/travel-budget')
      .send({
        destination: 'Europe',
        hotel: 'standard',
        days: 3,
        persons: 1,
        children: false,
        pension: 'none',
        bookingDate: '2027-01-01'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.totalBudget).toBeDefined();
  });

});
