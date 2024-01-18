import express from 'express';
import { PORT } from './configs/app.config.js';

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
