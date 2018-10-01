import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class TasksList extends Component {
    TABS = ['all', 'in_progress', 'completed'];

    onStatusChange = (id, { text, status }) => event => {
        const { updateTask } = this.props;
        const newStatus = status === 'in_progress' ? 'completed' : 'in_progress';

        updateTask(id, { text, status: newStatus });
    };

    enableEditText = id => event => {
        const element = document.querySelector(`[task-id="${id}"]`);

        element.contentEditable = true;
    };

    disableEditText = (id, status) => event => {
        event.persist();

        // 13 is the "Enter" charCode.
        if (!event.key || (event.charCode && event.charCode === 13 && event.ctrlKey)) {
            const { updateTask } = this.props;
            const element = document.querySelector(`[task-id="${id}"]`);
            const text = element.textContent.trim();

            element.contentEditable = false;
            updateTask(id, { text, status });
        }
    };

    onDelete = id => event => this.props.deleteTask(id);

    isInProgress = status => status === 'in_progress';

    renderStatusTabs = () => {
        const { status: currentStatus } = this.props;

        return this.TABS.map((status, index) => {
            const color = status === currentStatus ? 'red' : 'blue';

            return (
                <Link
                    key={index}
                    to={`/tasks/${status}`}
                    style={{ color }}
                >
                    {status}
                </Link>
            );
        });
    };

    renderLastUpdate = lastUpdate => {
        if (lastUpdate) {
            return <div>{`Last Update: ${lastUpdate}`}</div>;
        }

        return null;
    };

    renderTasks = () => this.props.tasks.map(({
        id, text, status, created, lastUpdate,
    }) => (
        <div key={id}>
            <div
                task-id={id}
                role="textbox"
                tabIndex={0}
                onClick={this.enableEditText(id)}
                onKeyPress={this.disableEditText(id, status)}
                onBlur={this.disableEditText(id, status)}
            >
                {text}
            </div>
            <input
                type="checkbox"
                defaultChecked={this.isInProgress(status)}
                onChange={this.onStatusChange(id, { text, status })}
            />
            <div>{`Created: ${created}`}</div>
            {this.renderLastUpdate(lastUpdate)}
            <button
                type="button"
                onClick={this.onDelete(id)}
            >
                {'X'}
            </button>
        </div>
    ));

    render() {
        return (
            <div>
                {this.renderStatusTabs()}
                {this.renderTasks()}
            </div>
        );
    }
}

TasksList.propTypes = {
    status: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            created: PropTypes.string.isRequired,
            lastUpdate: PropTypes.string,
        }),
    ).isRequired,
    updateTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

export default TasksList;
