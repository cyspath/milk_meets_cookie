import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Root from './components/root';

// auth
import SignupMain from './components/auth/signup_main';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import RequreAuth from './components/auth/require_auth';

// main pages
import Home from './components/home/main'
import UserDetail from './components/user/main';
import Profile from './components/profile/main';

// misc
import NotFound from './components/misc/not_found';


export default (
  <Route component={App}>
    <Route path="welcome" component={SignupMain} />
    <Route path="signin" component={Signin} />
    <Route path="signout" component={Signout} />
    <Route path="/" component={RequreAuth(Root)}>
      <IndexRoute component={Home} />
      <Route path="user/:id" component={RequreAuth(UserDetail)}></Route>
      <Route path="profile" component={RequreAuth(Profile)}></Route>
    </Route>
    <Route path="*" component={NotFound} />
  </Route>
);
