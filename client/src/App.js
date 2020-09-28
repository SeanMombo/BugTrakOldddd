import React, { useEffect, lazy, Suspense } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Paper from '@material-ui/core/Paper';

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component'
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import LoginRerouter from './components/login-rerouter/login-rerouter.component';
import ControlPanel from './components/control-panel/control-panel.component'

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions'
import { GlobalStyle } from './global.styles';


const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const Users = lazy(() => import('./pages/userspage/users.component'));
const Projects = lazy(() => import('./pages/projectspage/projects.component'));
// const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUp = lazy(() => import('./components/sign-in-and-sign-up/sign-in-and-sign-up.component'));
// const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));

const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession();
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
              <LoginRerouter exact path='/users' component={Users} currentUser={currentUser} />
              <LoginRerouter exact path='/projects' component={Projects} currentUser={currentUser} />
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
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);







