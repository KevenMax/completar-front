import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {isAuthenticated} from './services/auth';

import SignIn from './pages/SignIn/index';
import SignUp from './pages/SignUp/index';
import Dashboard from './pages/Dashboard/index';

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route 
    {...rest} 
    render={props => 
      isAuthenticated() ? (
        <Component {...props} />
        ) : ( 
        <Redirect to={{ pathname: '/', state: { from: props.location } }} /> 
      )
    }
  />
);

const PublicRoute = ({component: Component, ...rest}) => (
  <Route 
    {...rest} 
    render={props => 
      isAuthenticated() ? (
        <Redirect to={{ pathname: '/', state: { from: props.history.goBack() } }} /> 
        ) : ( 
          <Component {...props} />
      )
    }
  />
);

function Routes(){
  return (
    <Switch>
      <PublicRoute path="/" exact component={SignIn} />
      <PublicRoute path="/auth/sign_in" component={SignIn} />
      <PublicRoute path="/auth/sign_up" component={SignUp} />
      <PrivateRoute path="/dashboard" component={Dashboard}/>
      <Route path="*" component={() => <h1>Página não encontrada!</h1>}/>
    </Switch>
  );
}

export default Routes;