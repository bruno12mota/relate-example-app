import 'styles/normalize.less';

import React, {Component} from 'react';

import App from './components';
import {rootDataConnect} from 'relate-js';

@rootDataConnect()
export default class AppContainer extends Component {
  render () {
    return (
      <App />
    );
  }
}
