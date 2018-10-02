import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
    },
    tabsIndicator: {
        backgroundColor: '#1890ff',
    },
    tabRoot: {
        textTransform: 'initial',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing.unit * 4,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$tabSelected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    tabSelected: {},
    typography: {
        padding: theme.spacing.unit * 3,
    },
    action: {
        margin: 0,
    },
    textField: {
        marginLeft: 0,
        marginRight: 0,
    },
    grid: {
        margin: theme.spacing.unit * 3,
        width: 'auto',
    },
});

const StyledCardHeader = withStyles({
    action: {
        margin: 0,
    },
})(CardHeader);

class TasksList extends Component {
    TABS = ['all', 'in_progress', 'completed'];

    TABS_TITLES = {
        all: 'All',
        in_progress: 'In Progress',
        completed: 'Completed',
    };

    onTextChange = props => event => {
        const {
            target: { value: newText },
        } = event;

        if (newText) {
            this.props.updateTask({ text: newText, ...props });
        }
    };

    onStatusChange = props => event => this.props.updateTask({ ...props });

    onDelete = id => event => this.props.deleteTask(id);

    renderStatusTabs = () => {
        const {
            classes: { tabRoot, tabSelected },
        } = this.props;

        return this.TABS.map((status, index) => (
            <Tab
                key={index}
                classes={{ root: tabRoot, selected: tabSelected }}
                label={this.TABS_TITLES[status]}
                value={`/tasks/${status}`}
                component={Link}
                to={`/tasks/${status}`}
            />
        ));
    };

    renderLastUpdate = lastUpdate => {
        if (lastUpdate) {
            return <Typography component="p">{`Last Update: ${lastUpdate}`}</Typography>;
        }

        return null;
    };

    renderTasks = () => this.props.tasks.map(({
        id, text, status, isInProgress, created, lastUpdate,
    }) => (
        <Grid
            key={id}
            item
            style={{ paddingLeft: 0, paddingRight: 0 }}
        >
            <Card
                raised
                className={this.props.classes.card}
            >
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
                        className={this.props.classes.textField}
                        defaultValue={text}
                        onChange={this.onTextChange({ id, isInProgress })}
                        margin="normal"
                    />
                </CardContent>
                <Grid
                    item
                    xs={12}
                    sm
                    container
                    className={this.props.classes.grid}
                    style={{ alignItems: 'center' }}
                >
                    <Grid
                        item
                        xs
                    >
                        <FormControlLabel
                            control={(
                                <Checkbox
                                    checked={!isInProgress}
                                    onChange={this.onStatusChange({ id, text, isInProgress })}
                                    color="primary"
                                />
                            )}
                            label={this.TABS_TITLES[status]}
                        />
                    </Grid>
                    <Grid
                        item
                        style={{ textAlign: 'right' }}
                    >
                        <Typography component="p">{`Created: ${created}`}</Typography>
                        {this.renderLastUpdate(lastUpdate)}
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    ));

    render() {
        const {
            classes: { root, tabsRoot, tabsIndicator },
            pathname,
        } = this.props;

        return (
            <div className={root}>
                <Tabs
                    value={pathname}
                    onChange={this.handleChange}
                    classes={{ root: tabsRoot, indicator: tabsIndicator }}
                >
                    {this.renderStatusTabs()}
                </Tabs>
                <Grid
                    item
                    xs={12}
                    spacing={16}
                    sm
                    direction="column"
                    container
                    style={{ margin: 0 }}
                    className={this.props.classes.grid}
                >
                    {this.renderTasks()}
                </Grid>
            </div>
        );
    }
}

TasksList.propTypes = {
    classes: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string]))
        .isRequired,
    // status: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            isInProgress: PropTypes.bool.isRequired,
            created: PropTypes.string.isRequired,
            lastUpdate: PropTypes.string,
        }),
    ).isRequired,
    updateTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

export default withStyles(styles)(TasksList);
