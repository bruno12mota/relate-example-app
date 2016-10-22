import React, {Component, PropTypes} from 'react';

import List from './list';
import {dataConnect} from 'relate-js';

@dataConnect(
  () => ({
    fragments: List.fragments
  })
)
export default class ListContainer extends Component {
  static propTypes = {
    posts: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    isEdit: PropTypes.bool
  };

  render () {
    const {posts, loading, isEdit} = this.props;

    return (
      <List
        posts={posts}
        loading={loading}
      />
    );
  }
}
