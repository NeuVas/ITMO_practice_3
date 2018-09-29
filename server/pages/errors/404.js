const returnErrorPage = require('./utils/returnErrorPage');

module.exports = (req, res) => returnErrorPage({ status: 404, description: 'Page Not Found' }, res);
