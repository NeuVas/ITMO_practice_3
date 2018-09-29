const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const ejs = require('ejs');
const { MongoClient } = require('mongodb');

const db = require('./src/mongodb/config');
const includeAPI = require('./src/routes/api');
const includeErrorsPages = require('./src/pages/errors');

const app = express();

const { NODE_ENV, PORT } = process.env;
const isDevelopmentMode = NODE_ENV && NODE_ENV.trim() === 'development';
const port = PORT || (isDevelopmentMode ? 3000 : 80);

// Logging.
const logMode = isDevelopmentMode ? 'dev' : 'tiny';
app.use(morgan(logMode));

// Body parsing middleware.
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

// HTML modules renderer.
app.engine('html', ejs.renderFile);

// Connection to MongoDB remote database.
MongoClient.connect(
    db.url,
    { useNewUrlParser: true },
    (error, client) => {
        if (error) {
            console.info(error);
        }

        const database = client.db('poster');

        // Router.
        includeAPI(app, database);

        // Error handlers & pages.
        includeErrorsPages(app);

        // Event listener.
        app.listen(port, () => {
            console.info(`We are live on ${port}`);
        });
    },
);
