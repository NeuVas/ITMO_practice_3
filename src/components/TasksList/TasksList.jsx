import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class TasksList extends Component {
    TABS = ['all', 'in_progress', 'completed'];

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

    renderTasks = () => {
        const { data } = this.props;

        return data.map(({
            id, text, created, lastUpdate,
        }) => (
            <div key={id}>
                <div>{text}</div>
                <div>{`Created: ${created}`}</div>
                {this.renderLastUpdate(lastUpdate)}
            </div>
        ));
    };

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
    data: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            created: PropTypes.string.isRequired,
            lastUpdate: PropTypes.string,
        }),
    ).isRequired,
    // fetchData: PropTypes.func.isRequired,
};

export default TasksList;
