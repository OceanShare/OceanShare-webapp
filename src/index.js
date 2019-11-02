/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './services/i18n';
import * as serviceWorker from './serviceWorker';

import './assets/css/argon-dashboard-react.css';
import './assets/css/nucleo-icons.css';
import 'leaflet/dist/leaflet.css';
import './assets/css/demo.css';

import Firebase, { FirebaseContext } from './services/Firebase';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
