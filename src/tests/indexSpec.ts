import supertest from 'supertest';
import app from '../';

const request = supertest(app);

describe('Test Image End Point Responses', () => {
  it('Test the api endpoint ', async () => {
    const response = await request.get('/image?filename=fjord');
    expect(response.status).toBe(200);
  });
});
