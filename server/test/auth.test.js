const request = require('supertest');
const app = require('../server'); // Assuming you have an Express app exported from server.js

describe('Auth Routes', () => {
  it('should validate signup input', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'us', // Invalid username
        email: 'invalid-email', // Invalid email
        password: 'short' // Invalid password
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  it('should validate login input', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'invalid-email', // Invalid email
        password: '' // Invalid password
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  it('should validate forgot password input', async () => {
    const response = await request(app)
      .post('/api/auth/forgot-password')
      .send({
        email: 'invalid-email' // Invalid email
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  it('should validate reset password input', async () => {
    const response = await request(app)
      .post('/api/auth/reset-password')
      .send({
        token: '', // Invalid token
        password: 'short' // Invalid password
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });
});
