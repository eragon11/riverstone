import path from 'path';

let config = {
    api_end_point: "http://localhost:8080",
    mongo: {
        database_name: "riverstone",
        host: "localhost",
        port: "27017"
    },
    logs: {
        path: path.join(__dirname, '../logs'),
        file_name: 'development.riverstone.logs'
    },
    email: {
        email_id: "admin@gmail.com"
    }
};

export default config;
