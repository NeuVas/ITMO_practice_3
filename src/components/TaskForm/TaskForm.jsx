import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

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
                <Input
                    id="standard-full-width"
                    defaultValue=""
                    required
                    fullWidth
                    placeholder="Type new task here"
                    inputProps={{
                        ref: this.inputRef,
                        'aria-label': 'Description',
                    }}
                />
            </form>
        );
    }
}

export default withStyles(styles)(TaskForm);
