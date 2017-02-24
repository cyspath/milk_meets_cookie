import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Root from './components/root';
import Welcome from './components/welcome'
import Feature from './components/feature';

// auth
import SignupMain from './components/auth/signup_main';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import RequreAuth from './components/auth/require_auth';

// features
import Inbox from './components/inbox/inbox';
import Profile from './components/user/profile';

// misc
import NotFound from './components/misc/not_found';


export default (
  <Route component={App}>
    <Route path="welcome" component={SignupMain} />
    <Route path="signin" component={Signin} />
    <Route path="signout" component={Signout} />
    <Route path="/" component={RequreAuth(Root)}>
      <IndexRoute component={Welcome} />
      <Route path="messages" component={RequreAuth(Inbox)}></Route>
      <Route path="profile" component={RequreAuth(Profile)}></Route>
      <Route path="feature" component={RequreAuth(Feature)} />
    </Route>
    <Route path="*" component={NotFound} />
  </Route>
);
