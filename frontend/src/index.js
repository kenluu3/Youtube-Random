import React from 'react';
import ReactDOM from 'react-dom';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

// Add routing to entire app.
import { BrowserRouter } from 'react-router-dom';

// App State
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);


//<React.StrictMode>