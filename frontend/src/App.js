import { Fragment } from 'react';

// Global Apps Stylesheet
import './App.css';
import './styles/forms.css';

// Components
import NavigationBar from './components/NavigationBar/NavigationBar';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';
import Homepage from './components/Homepage/Homepage';

// Routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Axios
//import axios from 'axios';

function App() {
  return (
    <Fragment>
      <Router>
        <NavigationBar />
        <div className='main-content'>
          <Switch> 
            <Route path='/' exact component={Login} />
            <Route path='login' component={Login} />
            <Route path='/home' component={Homepage} />
            <Route path='/register' component={Register} />
            <Route path='/profile' component={Profile} />
            <Route path='*' component={Login} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
