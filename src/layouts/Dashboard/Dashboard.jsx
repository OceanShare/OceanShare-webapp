/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import PerfectScrollbar from 'perfect-scrollbar';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Header } from '../../components';
import dashboardRoutes from '../../routes/dashboard.jsx';

let ps;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
    };
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.refs.mainPanel);
      document.body.classList.toggle('perfect-scrollbar-on');
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
      document.body.classList.toggle('perfect-scrollbar-on');
    }
  }

  componentDidUpdate(e) {
    if (e.history.action === 'PUSH') {
      this.refs.mainPanel.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }

  render() {
    return (
      <>
        <div className={'wrapper'}>
          <>
            {/* <Sidebar {...this.props} routes={dashboardRoutes} /> */}
            <Header {...this.props} routes={dashboardRoutes} />
          </>
          <div className='main-panel' ref='mainPanel' />
          <Switch>
            {dashboardRoutes.map((prop, key) => {
              if (prop.collapse) {
                return prop.views.map((prop2, key2) => (
                  <Route
                    path={prop2.path}
                    component={prop2.component}
                    key={key2}
                  />
                ));
              }
              if (prop.redirect) {
                return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
              }
              return (
                <Route path={prop.path} component={prop.component} key={key} />
              );
            })}
          </Switch>
        </div>
      </>
    );
  }
}

export default Dashboard;
