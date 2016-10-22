import {EditorState} from 'draft-js';
import actionTypes from 'actions';

const defaultState = {
  title: 'New Post Title',
  content: EditorState.createEmpty()
};

export default function postReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case actionTypes.changeTitle:
      return Object.assign({}, state, {
        title: action.value
      });
    case actionTypes.changeContent:
      return Object.assign({}, state, {
        content: action.value
      });
    default:
      return state;
  }
}
