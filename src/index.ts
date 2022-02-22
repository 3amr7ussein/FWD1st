import express from 'express';
const app = express();
const port = 3000;
import routes from './routes/index';

app.use('/api', routes);
app.listen(port, () => {
  console.log('Server Started Successfully');
});
