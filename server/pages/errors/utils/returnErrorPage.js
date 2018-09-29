const path = require('path');

module.exports = ({ status, description }, res) => (
    res
        .status(status)
        .render(path.join(__dirname, '../template.html'), { title: `Error code: ${status}`, description })
);
