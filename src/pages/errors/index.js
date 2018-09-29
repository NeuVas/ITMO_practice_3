const returnPage404 = require('./404');
const returnPage500 = require('./500');

module.exports = app => app
    .use(returnPage404)
    .use(returnPage500);
