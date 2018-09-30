import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import routes from './routesList';

class Routes extends Component {
    renderRoutes = (routesList = routes, parentPath = '') => routesList.map(
        ({ children, path, ...rest }, index) => {
            if (children) {
                return this.renderRoutes(children, path);
            }

            return (
                <Route
                    key={index}
                    path={`${parentPath}${path}`}
                    {...rest}
                />
            );
        },
    );

    render() {
        return (
            <Switch>
                {this.renderRoutes()}
            </Switch>
        );
    }
}

export default Routes;
