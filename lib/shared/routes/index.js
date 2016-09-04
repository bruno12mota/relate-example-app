import List from 'screens/list';
import Post from 'screens/post';
import React from 'react';
import Root from 'screens/root';
import {Route, IndexRoute} from 'react-router';

export default [
  <Route path='/' component={Root}>
    <IndexRoute component={List} />
    <Route path=':slug' component={Post} />
  </Route>
];
