import express from 'express';
import imageApi from './api/imageRoute';
const routes = express.Router();

routes.use('/', imageApi);

export default routes;
