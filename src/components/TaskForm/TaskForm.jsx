import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class TaskForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    inputRef = createRef();

    onSubmit = event => {
        const { onSubmit } = this.props;
        const newTaskValue = this.inputRef.current.value;

        event.preventDefault();
        this.inputRef.current.value = '';
        onSubmit(newTaskValue, this.clearInput);
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
