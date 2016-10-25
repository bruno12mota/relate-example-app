import actionTypes from 'actions';
import {mutation} from 'relate-js';
import {push} from 'redux-router';

export function changeTitle (value) {
  return {
    type: actionTypes.changeTitle,
    value
  };
}

export function changeContent (value) {
  return {
    type: actionTypes.changeContent,
    value
  };
}

export function postResetDefault () {
  return {
    type: actionTypes.resetDefaults
  };
}

export function createPost (title, content) {
  return (dispatch, getState) => {
    mutation({
      fragments: {
        addPost: {
          _id: 1,
          title: 1,
          content: 1,
          date: 1
        }
      },
      variables: {
        addPost: {
          title: {
            type: 'String!',
            value: title
          },
          content: {
            type: 'JSON!',
            value: content
          }
        }
      }
    }, (result) => {
      dispatch(push(`/${result.addPost._id}`));
    })(dispatch, getState);
  };
}

export function updatePost (id, title, content) {
  return (dispatch, getState) => {
    mutation({
      fragments: {
        updatePost: {
          _id: 1,
          title: 1,
          content: 1
        }
      },
      variables: {
        updatePost: {
          id: {
            type: 'ID!',
            value: id
          },
          title: {
            type: 'String!',
            value: title
          },
          content: {
            type: 'JSON!',
            value: content
          }
        }
      }
    }, (result) => {
      if (result.updatePost) {
        dispatch(push(`/${result.updatePost._id}`));
      }
    })(dispatch, getState);
  };
}

export function removePost (id) {
  return (dispatch, getState) => {
    mutation({
      fragments: {
        removePost: {
          _id: 1
        }
      },
      variables: {
        removePost: {
          id: {
            type: 'ID!',
            value: id
          }
        }
      },
      type: 'REMOVE'
    }, () => {
      dispatch(push('/'));
    })(dispatch, getState);
  };
}
