import express from 'express';
import { PORT } from './configs/app.config.js';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { router } from './routers/index.js';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const app = express();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/../views`);
app.use('/public', express.static(`${__dirname}/../public`));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
