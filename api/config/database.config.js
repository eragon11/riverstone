import Mongoose from 'mongoose';
import settings from '../settings';
import logger from '../config/logger.config';

let config = require('./' + settings.environment + '.config');

Mongoose.Promise = global.Promise;

const connectToMongoDb = async () => {
    let host = config.default.mongo.host;
    let port = config.default.mongo.port;
    let database_name = config.default.mongo.database_name;
    let connectionString = "";

    if(settings.environment === "local"){
        connectionString = `mongodb://${host}:${port}/${database_name}`;
    }
    try {
        await Mongoose.connect(connectionString, { useMongoClient : true });
        logger.info(`MongoDB Connected to ${database_name}`);

    } catch (error) {
        logger.error(`Error Connecting to MongoDB  ${database_name}`);
    }

};
export default connectToMongoDb;    