const { ObjectID } = require('mongodb');

module.exports = collection => (req, res) => {
    const { id } = req.params;
    const details = { _id: new ObjectID(id) };

    collection.remove(details, (error, item) => {
        if (error) {
            res.send({ error: 'An error has occurred' });
        } else {
            res.send(`Post with id ${id} deleted!`);
        }
    });
};
