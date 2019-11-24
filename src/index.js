import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/argon-dashboard-react.css';
import './assets/css/nucleo-icons.css';
import './assets/css/demo.css';
import * as serviceWorker from './serviceWorker';
import './services/i18n';
import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
