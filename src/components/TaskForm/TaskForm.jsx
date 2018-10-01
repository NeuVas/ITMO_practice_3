import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class TaskForm extends Component {
    static propTypes = {
        addTask: PropTypes.func.isRequired,
    };

    inputRef = createRef();

    onSubmit = event => {
        const { addTask } = this.props;
        const newTaskValue = this.inputRef.current.value;

        event.preventDefault();
        this.inputRef.current.value = '';
        addTask(newTaskValue, this.clearInput);
    };

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <button type="submit">+</button>
                <input
                    ref={this.inputRef}
                    type="text"
                    name="new-task"
                    required
                    placeholder="Type new task here"
                />
            </form>
        );
    }
}

export default TaskForm;
