import * as postActions from 'actions/post';

import React, {Component, PropTypes} from 'react';

import Post from './components';
import bind from 'decorators/bind';
import {bindActionCreators} from 'redux';
import {convertToRaw} from 'draft-js';
import {dataConnect} from 'relate-js';

@dataConnect(
  (state) => ({
    id: state.router.params.id,
    isNew: state.router.params.id === 'new',
    isEdit: !!(state.router.location.query.build) || state.router.params.id === 'new',
    editPost: state.post
  }),
  (dispatch) => bindActionCreators(postActions, dispatch),
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
    editPost: PropTypes.object.isRequired,
    changeTitle: PropTypes.func.isRequired,
    changeContent: PropTypes.func.isRequired,
    createPost: PropTypes.func.isRequired,
    updatePost: PropTypes.func.isRequired,
    isNew: PropTypes.bool,
    isEdit: PropTypes.bool,
    loading: PropTypes.bool
  };

  @bind
  onSubmit () {
    const {id, isNew, editPost, createPost, updatePost} = this.props;
    const rawContent = convertToRaw(editPost.content.getCurrentContent());

    if (isNew) {
      createPost(editPost.title, rawContent);
    } else {
      updatePost(id, editPost.title, rawContent);
    }
  }

  render () {
    const {id, isNew, isEdit, post, editPost, loading, changeTitle, changeContent} = this.props;

    return (
      <Post
        id={id}
        isNew={isNew}
        isEdit={isEdit}
        post={isEdit ? editPost : post}
        loading={loading}
        changeTitle={changeTitle}
        changeContent={changeContent}
        onSubmit={this.onSubmit}
        {...this.state}
      />
    );
  }
}
