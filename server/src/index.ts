import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import konphyg from 'konphyg';
import path from 'path';
import alexa from './alexa/alexa';
import apiRoutes from './routes/apiRoutes';

const konfig = konphyg(`${__dirname}/../../config`);
const config = konfig('tracker');
const app = express();

app.use('/alexa', alexa);

app.use(express.static(path.resolve(__dirname, '../../build')));

// ------------ Middleware ------------ //
app.use(cors());
app.use(compression());
app.use(json({ limit: '50mb' }));
app.use(urlencoded({ limit: '50mb', extended: false }));

app.use('/api', apiRoutes);

app.get('*', (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    res.sendFile(path.resolve(__dirname, '../../build/index.html'));
});

app.listen(config.port, (): void => {
    console.log(`Server running on port ${config.port} in ${process.env.NODE_ENV} mode.`);
});