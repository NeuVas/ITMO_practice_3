import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, withRouter } from 'react-router-dom';

import App from './components/App/App';

const AppWithRouting = withRouter(App);

render(
    <BrowserRouter>
        <AppWithRouting />
    </BrowserRouter>,
    document.querySelector('#root'),
);
