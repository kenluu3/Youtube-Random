import React from 'react';
import ReactDOM from 'react-dom';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';
// App State
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);


//<React.StrictMode>