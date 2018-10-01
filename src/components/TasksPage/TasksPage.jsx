import React, { Component, Fragment } from 'react';

import TaskForm from '../TaskForm/TaskForm';
import TasksList from '../TasksList/TasksList';

// TODO: remove this hardcode.
const API_URL = 'https://vasilii-kovalev-todo-list.herokuapp.com/api/tasks';

const tasksPage = status => {
    class TasksPage extends Component {
        state = {
            data: [],
        };

        componentDidMount() {
            this.fetchData();
        }

        onSubmit = taskText => {
            fetch(
                `${API_URL}/add`,
                this.setupFetchConfig({ method: 'POST', body: { text: taskText } }),
            )
                .then(() => this.fetchData())
                .catch(console.error);
        };

        fetchData = () => fetch(`${API_URL}/${status}`)
            .then(data => data.json())
            .then(data => this.setState({ data }))
            .catch(console.error);

        setupFetchConfig = ({ method, body }) => ({
            method,
            body: JSON.stringify(body),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        render() {
            const { data } = this.state;

            return (
                <Fragment>
                    <TaskForm onSubmit={this.onSubmit} />
                    <TasksList
                        data={data}
                        status={status}
                        fetchData={this.fetchData}
                    />
                </Fragment>
            );
        }
    }

    return TasksPage;
};

export default tasksPage;
