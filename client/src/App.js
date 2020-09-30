import React, { useEffect, lazy, Suspense } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component'
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import LoginRerouter from './components/login-rerouter/login-rerouter.component';
import ControlPanel from './components/control-panel/control-panel.component'

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions'
import { GlobalStyle } from './global.styles';

import { fetchTicketsStart } from './redux/tickets/tickets.actions';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const Users = lazy(() => import('./pages/userspage/users.component'));
const Projects = lazy(() => import('./pages/projectspage/projects.component'));
const Project = lazy(() => import('./pages/projectspage/project.component'));

// const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUp = lazy(() => import('./components/sign-in-and-sign-up/sign-in-and-sign-up.component'));
// const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));

const App = ({ checkUserSession, currentUser, fetchTicketsStart }) => {

  useEffect(() => {
    checkUserSession();
    fetchTicketsStart();

  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyle/>
      
      <Header />
 
      <ControlPanel />
      
      <div className="pageWrapper">
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner/>}>

            
              <LoginRerouter exact path='/' component={HomePage} currentUser={currentUser} />
              <LoginRerouter path='/users' component={Users} currentUser={currentUser} />
              <LoginRerouter path='/projects' component={Projects} currentUser={currentUser} />
              <LoginRerouter path='/project' component={Project} currentUser={currentUser} />
              <Route 
                exact
                path='/signin' 
                render={() => 
                  currentUser ? 
                  (<Redirect to='/' />)
                  : 
                  (<SignInAndSignUp />)
                }
                currentUser={currentUser}/>
            </Suspense>
          </ErrorBoundary>
        </Switch>

      </div>
    </div>
  );
}


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
  fetchTicketsStart: () => dispatch(fetchTicketsStart()),


  
})

export default connect(mapStateToProps, mapDispatchToProps)(App);







