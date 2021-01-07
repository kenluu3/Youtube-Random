import { Fragment } from 'react';

// Common App CSS
import './App.css';
import './styles/buttons.css';
import './styles/forms.css';

// Main Components
import NavigationBar from './components/NavigationBar/NavigationBar';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import Homepage from './components/Homepage/Homepage';

// Routing
import { Switch, Route, useLocation } from 'react-router-dom';

function App() {

  const validNavbarPaths = [
    '/', '/home', '/profile'
  ];

  const location = useLocation().pathname;

  return ( 
    <Fragment>
      { validNavbarPaths.indexOf(location) > -1 ? <NavigationBar /> : null }
      <Switch> 
        <Route path='/' exact component={Homepage} />
        <Route path='login' component={Login} />
        <Route path='/home' component={Homepage} />
        <Route path='/register' component={Register} />
        <Route path='/profile/:user' component={Profile} />
        <Route path='*' component={Login} />
      </Switch>
    </Fragment>
  );
}

export default App;
