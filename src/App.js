import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import indexRoutes from './routes/index';

const hist = createBrowserHistory();

class App extends Component {
    render() {
        return (
            <div>
                <Router history={hist}>
                    <Switch>
                    {
                        indexRoutes.map((prop,key) => {
                            return (
                                <Route path={prop.path} key={key} component={prop.component} />
                            );
                        })
                    }
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;