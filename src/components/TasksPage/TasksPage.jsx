import React, { Component, Fragment } from 'react';

import TaskForm from '../TaskForm/TaskForm';
import TasksList from '../TasksList/TasksList';

// TODO: remove this hardcode.
const BASE_URL = 'https://vasilii-kovalev-todo-list.herokuapp.com';

const tasksPage = status => {
    class TasksPage extends Component {
        state = {
            data: [],
        };

        componentDidMount() {
            this.fetchData();
        }

        fetchData = () => fetch(`${BASE_URL}/api/tasks/${status}`)
            .then(data => data.json())
            .then(data => this.setState({ data }));

        render() {
            const { data } = this.state;

            return (
                <Fragment>
                    <TaskForm />
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
