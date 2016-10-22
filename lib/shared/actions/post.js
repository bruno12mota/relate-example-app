import actionTypes from 'actions';

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
