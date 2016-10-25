import React, {Component, PropTypes} from 'react';

import List from './list';
import {dataConnect} from 'relate-js';

@dataConnect(
  () => ({
    fragments: List.fragments,
    mutations: {
      addPost: [
        {
          type: 'PREPEND',
          field: 'posts'
        }
      ]
    }
  })
)
export default class ListContainer extends Component {
  static propTypes = {
    posts: PropTypes.array,
    loading: PropTypes.bool.isRequired
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
