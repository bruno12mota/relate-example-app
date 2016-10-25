import {EditorState, convertFromRaw} from 'draft-js';

import Relate from 'relate-js';
import actionTypes from 'actions';

const defaultState = {
  title: 'New Post Title',
  content: EditorState.createEmpty()
};

export default function postReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case Relate.actionTypes.query:
      if (action.data.post) {
        return {
          title: action.data.post.title,
          content: EditorState.createWithContent(
            convertFromRaw(action.data.post.content)
          )
        };
      }
      return state;
    case actionTypes.resetDefaults:
      return defaultState;
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
