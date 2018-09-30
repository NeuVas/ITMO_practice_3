const { ObjectID } = require('mongodb');
const dayjs = require('dayjs');

module.exports = collection => (req, res) => {
    const { id } = req.params;
    const { text, status } = req.body;
    const details = { _id: new ObjectID(id) };
    const updatedPost = {
        text,
        status,
        lastUpdate: dayjs().format('HH:mm DD.MM.YYYY'),
    };

    collection.updateOne(details, { $set: updatedPost }, (err, result) => {
        if (err) {
            res.send({ error: 'An error has occurred' });
        } else {
            res.send(updatedPost);
        }
    });
};
