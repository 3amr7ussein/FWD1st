import express from 'express';
import imageApi from './api/imageRoute';
const routes = express.Router();

routes.use('/image', imageApi);
export default routes;
