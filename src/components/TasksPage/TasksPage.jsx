import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TaskForm from '../TaskForm/TaskForm';
import TasksList from '../TasksList/TasksList';

const API_URL = '/api/tasks';

const styles = () => ({
    root: {
        width: 750,
        margin: '32px auto 0px',
    },
});

const tasksPage = activeTabStatus => {
    class TasksPage extends Component {
        state = {
            tasks: [],
        };

        TABS = [
            {
                status: 'all',
                label: 'All',
            },
            {
                status: 'in_progress',
                label: 'In Progress',
            },
            {
                status: 'completed',
                label: 'Completed',
            },
        ];

        static propTypes = {
            location: PropTypes.shape({
                pathname: PropTypes.string.isRequired,
            }).isRequired,
            classes: PropTypes.objectOf(PropTypes.string).isRequired,
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
                task.isInProgress = !isInProgress;
            }

            fetch(`${API_URL}/${taskId}`, this.setupFetchConfig({ method: 'PUT', body: task }))
                .then(() => this.fetchData())
                .catch(console.error);
        };

        deleteTask = taskId => fetch(`${API_URL}/${taskId}`, { method: 'DELETE' })
            .then(() => this.fetchData())
            .catch(console.error);

        fetchData = () => fetch(`${API_URL}/${activeTabStatus}`)
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

        renderStatusTabs = () => this.TABS.map(({ status, label }, index) => (
            <Tab
                key={index}
                label={label}
                value={`/tasks/${status}`}
                component={Link}
                to={`/tasks/${status}`}
            />
        ));

        render() {
            const {
                location: { pathname },
                classes: { root },
            } = this.props;
            const { tasks } = this.state;
            const reversedTasks = tasks.reverse();

            return (
                <div className={root}>
                    <TaskForm addTask={this.addTask} />
                    <Tabs
                        value={pathname}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        {this.renderStatusTabs()}
                    </Tabs>
                    <TasksList
                        pathname={pathname}
                        tasks={reversedTasks}
                        updateTask={this.updateTask}
                        deleteTask={this.deleteTask}
                    />
                </div>
            );
        }
    }

    return withStyles(styles)(TasksPage);
};

export default tasksPage;
