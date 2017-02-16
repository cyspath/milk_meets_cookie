import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';


export default (
  <Route path="/" component={App}>  // when user at this path, show this component App
    <IndexRoute component={PostsIndex} /> // index route's route is same parent default route, will show App and PostsIndex
    <Route path="posts/new" component={PostsNew} />
    <Route path="posts/:id" component={PostsShow} />
  </Route>
);
