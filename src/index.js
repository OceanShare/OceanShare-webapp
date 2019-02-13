import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/scss/now-ui-dashboard.css';
import './assets/css/demo.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
