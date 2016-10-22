import 'styles/normalize.less';

import {Component, PropTypes} from 'react';
import {rootDataConnect} from 'relate-js';

@rootDataConnect()
export default class RootContainer extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  render () {
    return this.props.children;
  }
}
