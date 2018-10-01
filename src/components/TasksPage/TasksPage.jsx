import React, { Component, Fragment } from 'react';

import TaskForm from '../TaskForm/TaskForm';
import TasksList from '../TasksList/TasksList';

// TODO: remove this hardcode.
const API_URL = 'https://vasilii-kovalev-todo-list.herokuapp.com/api/tasks';

const tasksPage = status => {
    class TasksPage extends Component {
        state = {
            tasks: [],
        };

        componentDidMount() {
            this.fetchData();
        }

        addTask = taskText => {
            fetch(
                `${API_URL}/add`,
                this.setupFetchConfig({ method: 'POST', body: { text: taskText } }),
            )
                .then(() => this.fetchData())
                .catch(console.error);
        };

        updateTask = (taskId, { text: newText, status: newStatus }) => {
            const { tasks } = this.state;
            const [task] = tasks.filter(({ id }) => id === taskId);
            const { text: oldText, status: oldStatus } = task;

            if (oldText !== newText || oldStatus !== newStatus) {
                if (oldText !== newText) {
                    task.text = newText;
                }

                if (oldStatus !== newStatus) {
                    task.status = newStatus;
                }

                fetch(
                    `${API_URL}/${taskId}`,
                    this.setupFetchConfig({ method: 'PUT', body: task }),
                )
                    .then(() => this.fetchData())
                    .catch(console.error);
            }
        };

        deleteTask = taskId => fetch(
            `${API_URL}/${taskId}`,
            { method: 'DELETE' },
        )
            .then(() => this.fetchData())
            .catch(console.error);

        fetchData = () => fetch(`${API_URL}/${status}`)
            .then(data => data.json())
            .then(tasks => this.setState({ tasks }))
            .catch(console.error);

        setupFetchConfig = ({ body = null, ...rest }) => {
            const config = {
                ...rest,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            };

            if (body) {
                config.body = JSON.stringify(body);
            }

            return config;
        };

        render() {
            const { tasks } = this.state;
            const reversedTasks = tasks.reverse();

            return (
                <Fragment>
                    <TaskForm addTask={this.addTask} />
                    <TasksList
                        tasks={reversedTasks}
                        status={status}
                        updateTask={this.updateTask}
                        deleteTask={this.deleteTask}
                    />
                </Fragment>
            );
        }
    }

    return TasksPage;
};

export default tasksPage;
