const TASK_STATUS = {
    all: 'all',
    inProgress: 'in_progress',
    completed: 'completed',
};

module.exports = collection => (req, res) => {
    const { status } = req.params;
    const config = status !== TASK_STATUS.all ? { status } : {};

    collection.find(config).toArray((error, result) => {
        if (error) {
            res.send({ error: 'An error has occurred' });
        } else {
            res.send(result.map(({ _id, ...rest }) => ({ id: _id, ...rest })));
        }
    });
};
