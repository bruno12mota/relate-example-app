import React, {Component, PropTypes} from 'react';

import Post from './components';
import {dataConnect} from 'relate-js';

@dataConnect(
  (state) => ({
    id: state.router.params.id,
    isNew: state.router.params.id === 'new',
    isEdit: !!(state.router.location.query.build)
  }),
  (props) => {
    let result = {};

    if (props.id !== 'new') {
      result = {
        fragments: Post.fragments,
        variablesTypes: {
          post: {
            id: 'ID!'
          }
        },
        initialVariables: {
          post: {
            id: props.id
          }
        }
      };
    }

    return result;
  }
)
export default class PostContainer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    post: PropTypes.object,
    isNew: PropTypes.bool,
    isEdit: PropTypes.bool,
    loading: PropTypes.bool
  };

  render () {
    const {isNew, isEdit, post, loading} = this.props;

    return (
      <Post
        isNew={isNew}
        isEdit={isEdit}
        post={post}
        loading={loading}
      />
    );
  }
}
