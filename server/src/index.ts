import express from 'express';
import bodyParser from 'body-parser';
import konphyg from 'konphyg';
import alexa from './alexa/alexa';
import apiRoutes from './routes/apiRoutes';

const konfig = konphyg(`${__dirname}/../../config`);
const config = konfig('tracker');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRoutes);
app.use('/alexa', alexa);

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
});