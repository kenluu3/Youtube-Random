import { Fragment } from 'react';

// Common App CSS
import './styles/buttons.css';
import './styles/forms.css';

// Main Components
import NavigationBar from './components/NavigationBar/NavigationBar';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import Homepage from './components/Homepage/Homepage';

// Routing
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';

function App() {

  const location = useLocation().pathname;
  const hideRoutes = ['/login', '/register']; // routes to hide navbar

  const showNav = hideRoutes.indexOf(location) > - 1 ? false : true; 

  return ( 
      <Fragment>
        { showNav ? <NavigationBar /> : null }
        <Switch> 
          <Route path='/login' component={Login} />
          <Route path='/home' component={Homepage} />
          <Route path='/register' component={Register} />
          <Route path='/profile/:user' component={Profile} />
          <Redirect from='*' to='/home' />
        </Switch>
      </Fragment>
  );
}

export default App;
