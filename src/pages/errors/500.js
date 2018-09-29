const returnErrorPage = require('./utils/returnErrorPage');

module.exports = (event, req, res, next) => returnErrorPage({ status: 500, description: 'Internal Server Error' }, res);
