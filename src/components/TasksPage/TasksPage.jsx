import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TaskForm from '../TaskForm/TaskForm';
import TasksList from '../TasksList/TasksList';

// TODO: remove this hardcode.
const API_URL = 'https://vasilii-kovalev-todo-list.herokuapp.com/api/tasks';

const tasksPage = status => {
    class TasksPage extends Component {
        state = {
            tasks: [],
        };

        static propTypes = {
            location: PropTypes.shape({
                pathname: PropTypes.string.isRequired,
            }).isRequired,
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

        updateTask = ({ id: taskId, text, isInProgress }) => {
            const { tasks } = this.state;
            const [task] = tasks.filter(({ id }) => id === taskId);

            if (task.text !== text) {
                task.text = text;
            } else {
                task.status = isInProgress ? 'completed' : 'in_progress';
            }

            fetch(
                `${API_URL}/${taskId}`,
                this.setupFetchConfig({ method: 'PUT', body: task }),
            )
                .then(() => this.fetchData())
                .catch(console.error);
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

        isInProgress = taskStatus => taskStatus === 'in_progress';

        render() {
            const { location: { pathname } } = this.props;
            const { tasks } = this.state;
            const reversedTasks = tasks
                .reverse()
                .map(({ status: taskStatus, ...rest }) => ({
                    isInProgress: this.isInProgress(taskStatus),
                    status: taskStatus,
                    ...rest,
                }));

            return (
                <div style={{ width: 750, margin: '32px auto 0px' }}>
                    <TaskForm addTask={this.addTask} />
                    <TasksList
                        pathname={pathname}
                        tasks={reversedTasks}
                        status={status}
                        updateTask={this.updateTask}
                        deleteTask={this.deleteTask}
                    />
                </div>
            );
        }
    }

    return TasksPage;
};

export default tasksPage;
