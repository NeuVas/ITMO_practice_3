const { ObjectID } = require('mongodb');
const dayjs = require('dayjs');

module.exports = (app, db) => {
    const collection = db.collection('posts');

    app
        .get('/api/posts', (req, res) => {
            collection.find().toArray((error, result) => {
                if (error) {
                    res.send({ error: 'An error has occurred' });
                } else {
                    res.send(result.map(({ _id, ...rest }) => ({ id: _id, ...rest })));
                }
            });
        })
        .get('/api/posts/:id', (req, res) => {
            const { id } = req.params;
            const details = { _id: new ObjectID(id) };

            collection.findOne(details, (error, item) => {
                if (error) {
                    res.send({ error: 'An error has occurred' });
                } else {
                    res.send(item);
                }
            });
        })
        .post('/api/posts/new', (req, res) => {
            const { author, title, text } = req.body;
            const newPost = {
                author,
                title,
                text,
                date: dayjs().format('HH:mm DD.MM.YYYY'),
            };

            collection.insert(newPost, (error, { ops: [result] }) => {
                if (error) {
                    res.send({ error: 'An error has occurred' });
                } else {
                    res.send(result);
                }
            });
        })
        .put('/api/posts/:id', (req, res) => {
            const { id } = req.params;
            const { title, text } = req.body;
            const details = { _id: new ObjectID(id) };
            const updatedPost = {
                title,
                text,
                lastUpdated: dayjs().format('HH:mm DD.MM.YYYY'),
            };

            collection.update(details, { $set: updatedPost }, (err, result) => {
                if (err) {
                    res.send({ error: 'An error has occurred' });
                } else {
                    res.send(updatedPost);
                }
            });
        })
        .delete('/api/posts/:id', (req, res) => {
            const { id } = req.params;
            const details = { _id: new ObjectID(id) };

            collection.remove(details, (error, item) => {
                if (error) {
                    res.send({ error: 'An error has occurred' });
                } else {
                    res.send(`Post with id ${id} deleted!`);
                }
            });
        });
};
