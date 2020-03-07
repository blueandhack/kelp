import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Logout from '../pages/Logout/Logout';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';

const KelpRoutes = (token) => {
  if (token !== null) {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Redirect to="/" />
    </Switch>
  );
};

export default KelpRoutes;
