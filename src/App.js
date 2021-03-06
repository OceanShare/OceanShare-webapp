import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import indexRoutes from './routes/index';
import './services/i18n';
const hist = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Router history={hist}>
          <Switch>
            {indexRoutes.map((prop, key) => (
              <Route
                path={prop.path}
                key={key}
                component={prop.component}
              />
            ))}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
