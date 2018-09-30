const dayjs = require('dayjs');

module.exports = collection => (req, res) => {
    const { text } = req.body;
    const newPost = {
        text,
        status: 'in_progress',
        created: dayjs().format('HH:mm DD.MM.YYYY'),
    };

    collection.insert(newPost, (error, { ops: [result] }) => {
        if (error) {
            res.send({ error: 'An error has occurred' });
        } else {
            res.send(result);
        }
    });
};
