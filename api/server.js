import express from "express";
import cors from "cors";
import morgan from 'morgan';
import settings from './settings';
import connectToMongoDb from './config/database.config';
import logger from './config/logger.config';
import apiRouters from './router';
import http from 'http';
let config = require('./config/' + settings.environment + '.config');
logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};

//set the port
const port = settings.port;

const app = express();

const server = http.createServer(app)

connectToMongoDb();

app.use(cors());
app.use(express.json({ extended: true, limit: '500mb' }));
app.use(express.urlencoded({ extended: true, limit: '500mb' }));
app.use(morgan("dev", { "stream": logger.stream }));

//healthcheck 
app.get('/health_check', function (req, res, next) {
    res.sendStatus(200);
});

//include all the necessary routes in the express
apiRouters.forEach(function (apiRoute) {
    app.use('/api', apiRoute);
});

server.listen(port, () => {
    logger.info(`Server started on port : ${port}`);
});