const path = require('path');

const resolveWithRootDir = filePath => path.resolve(__dirname, '../../../', filePath);

module.exports = app => app
    .use('/dist/bundle.js', (req, res) => {
        res.sendFile(resolveWithRootDir('dist/bundle.js'));
    }).use('*', (req, res) => {
        res.sendFile(resolveWithRootDir('index.html'));
    });
