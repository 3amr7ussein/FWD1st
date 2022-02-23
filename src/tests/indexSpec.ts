import supertest from 'supertest';
import app from '../';

const request = supertest(app);

describe('Test Image End Point Responses', () => {
  // let url = `http://localhost:3000/image?filename=Udacity`;
  it('Test the api endpoint ', async () => {
    const response = await request.get('/image');
    expect(response.status).toBe(200);
  });
});
