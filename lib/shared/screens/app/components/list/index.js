import React, {Component, PropTypes} from 'react';

import List from './list';
import {dataConnect} from 'relate-js';

@dataConnect(
  (state) => ({
    currentId: state.router.params.id
  }),
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
    currentId: PropTypes.string,
    posts: PropTypes.array,
    loading: PropTypes.bool.isRequired
  };

  render () {
    const {posts, loading, currentId} = this.props;

    return (
      <List
        posts={posts}
        loading={loading}
        currentId={currentId}
      />
    );
  }
}
