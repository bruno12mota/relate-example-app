import React, {PropTypes, Component} from 'react';
import {dataConnect} from 'relate-js';

import List from './components';

@dataConnect(
  () => ({
    fragments: List.fragments
  })
)
export default class ListContainer extends Component {
  static propTypes = {
    posts: PropTypes.array,
    loading: PropTypes.bool
  };

  render () {
    const {posts, loading} = this.props;

    return (
      <List
        posts={posts}
        loading={loading}
      />
    );
  }
}
