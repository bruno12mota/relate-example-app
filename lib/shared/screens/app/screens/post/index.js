import React, {Component, PropTypes} from 'react';

import {EditorState} from 'draft-js';
import Post from './components';
import bind from 'decorators/bind';
import {dataConnect} from 'relate-js';

@dataConnect(
  (state) => ({
    id: state.router.params.id,
    isNew: state.router.params.id === 'new',
    isEdit: !!(state.router.location.query.build) || state.router.params.id === 'new',
    editPost: state.post
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
    editPost: PropTypes.object.isRequired,
    isNew: PropTypes.bool,
    isEdit: PropTypes.bool,
    loading: PropTypes.bool
  };

  constructor (props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  @bind
  onChange (editorState) {
    this.setState({
      editorState
    });
  }

  render () {
    const {id, isNew, isEdit, post, editPost, loading} = this.props;

    return (
      <Post
        id={id}
        isNew={isNew}
        isEdit={isEdit}
        post={isEdit ? editPost : post}
        loading={loading}
        onContentChange={this.onChange}
        {...this.state}
      />
    );
  }
}
