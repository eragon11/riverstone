import express from "express";
import cors from "cors";
import morgan from 'morgan';
import connectToMongoDb from './config/database.config';
import logger from './config/logger.config';
import apiRouters from './router';

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};


const app = express();

connectToMongoDb();

app.use(cors());
app.use(express.json({ extended: true, limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));
app.use(morgan("dev", { "stream": logger.stream }));

app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io/client-dist'));

app.get('/', (req, res) => {
    res.sendFile('/index.html');
  });

//healthcheck 
app.get('/health_check', function (req, res, next) {
    res.sendStatus(200);
});

//include all the necessary routes in the express
apiRouters.forEach(function (apiRoute) {
    app.use('/api', apiRoute);
});

export default app;