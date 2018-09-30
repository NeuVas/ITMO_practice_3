import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import TasksPage from '../TasksPage/TasksPage';
import NotFound from '../NotFound/NotFound';

const Routes = () => (
    <Switch>
        <Redirect
            from="/tasks"
            to="/tasks/all"
            exact
        />
        <Redirect
            from="/"
            to="/tasks/all"
            exact
        />
        <Route
            path="/tasks/all"
            component={TasksPage('all')}
            exact
        />
        <Route
            path="/tasks/in_progress"
            component={TasksPage('in_progress')}
            exact
        />
        <Route
            path="/tasks/completed"
            component={TasksPage('completed')}
            exact
        />
        <Route
            path="**"
            component={NotFound}
        />
    </Switch>
);

export default Routes;
