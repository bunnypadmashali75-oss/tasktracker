import request from 'supertest';
import app from '../app';

describe('Server API', () => {
  it('returns 404 for unknown routes', async () => {
    const response = await request(app).get('/api/unknown');
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });

  it('requires authorization for protected requests', async () => {
    const response = await request(app).get('/api/auth/me');
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
