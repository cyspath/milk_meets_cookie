import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Main from './components/main';
import Welcome from './components/welcome'
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Inbox from './components/inbox/inbox';
import Profile from './components/user/profile';
import RequreAuth from './components/auth/require_auth';
import Feature from './components/feature';
import NotFound from './components/misc/not_found';

import WelcomeMain from './components/welcome/main';

export default (
  <Route component={App}>
    <Route path="signin" component={Signin} />
    <Route path="welcome" component={WelcomeMain} />
    <Route path="signout" component={Signout} />
    <Route path="/" component={RequreAuth(Main)}>
      <IndexRoute component={Welcome} />
      <Route path="messages" component={RequreAuth(Inbox)}></Route>
      <Route path="profile" component={RequreAuth(Profile)}></Route>
      <Route path="feature" component={RequreAuth(Feature)} />
    </Route>
    <Route path="*" component={NotFound} />
  </Route>
);
