import express from 'express';
import imageApi from './api/imageRoute';
const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('main api route');
});

routes.use('/', imageApi);

export default routes;
