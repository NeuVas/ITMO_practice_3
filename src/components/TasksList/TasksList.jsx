import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import StyledCardHeader from '../StyledCardHeader/StyledCardHeader';
import ConfiguredCheckBox from '../ConfiguredCheckBox/ConfiguredCheckBox';

const styles = theme => ({
    textField: {
        marginLeft: 0,
        marginRight: 0,
    },
    taskFooter: {
        padding: theme.spacing.unit * 3,
        alignItems: 'center',
    },
    taskDateTimeBlock: {
        textAlign: 'right',
    },
});

class TasksList extends Component {
    debouncedUpdateTask = debounce(this.props.updateTask, 800);

    onTextChange = props => event => {
        const {
            target: { value: newText },
        } = event;

        if (newText) {
            this.debouncedUpdateTask({ text: newText, ...props });
        }
    };

    onStatusChange = props => event => this.debouncedUpdateTask({ ...props });

    onDelete = id => event => this.props.deleteTask(id);

    renderLastUpdate = lastUpdate => {
        if (!lastUpdate) {
            return null;
        }

        return (
            <Typography component="p">
                {`Last Update: ${lastUpdate}`}
            </Typography>
        );
    };

    renderTasks = () => {
        const {
            classes: { textField, taskFooter, taskDateTimeBlock },
            tasks,
        } = this.props;

        return tasks.map(({
            id, text, isInProgress, created, lastUpdate,
        }) => (
            <Grid
                key={id}
                item
            >
                <Card raised>
                    <StyledCardHeader
                        action={(
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.onDelete(id)}
                            >
                                <DeleteIcon />
                            </Button>
                        )}
                    />
                    <CardContent>
                        <TextField
                            required
                            fullWidth
                            className={textField}
                            defaultValue={text}
                            onChange={this.onTextChange({ id, isInProgress })}
                            margin="normal"
                        />
                    </CardContent>
                    <Grid
                        container
                        className={taskFooter}
                    >
                        <Grid
                            item
                            xs
                        >
                            <FormControlLabel
                                control={ConfiguredCheckBox({
                                    id,
                                    text,
                                    isInProgress,
                                    onStatusChange: this.onStatusChange,
                                })}
                                label="Is in progress?"
                            />
                        </Grid>
                        <Grid
                            item
                            className={taskDateTimeBlock}
                        >
                            <Typography component="p">
                                {`Created: ${created}`}
                            </Typography>
                            {this.renderLastUpdate(lastUpdate)}
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        ));
    };

    render() {
        return (
            <Grid
                container
                spacing={16}
                direction="column"
            >
                {this.renderTasks()}
            </Grid>
        );
    }
}

TasksList.propTypes = {
    classes: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string]))
        .isRequired,
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            isInProgress: PropTypes.bool.isRequired,
            created: PropTypes.string.isRequired,
            lastUpdate: PropTypes.string,
        }),
    ).isRequired,
    updateTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

export default withStyles(styles)(TasksList);
