const GetTasksWithStatus = require('./components/GetTasksWithStatus');
const AddTask = require('./components/AddTask');
const UpdateTask = require('./components/UpdateTask');
const DeleteTask = require('./components/DeleteTask');

const API_PREFIX = '/api/tasks';

module.exports = (app, database) => {
    const collection = database.collection('tasks');

    app
        .get(`${API_PREFIX}/:status(all|in_progress|completed)`, GetTasksWithStatus(collection))
        .post(`${API_PREFIX}/add`, AddTask(collection))
        .put(`${API_PREFIX}/:id`, UpdateTask(collection))
        .delete(`${API_PREFIX}/:id`, DeleteTask(collection));
};
