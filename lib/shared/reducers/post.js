import actionTypes from 'actions';

const defaultState = {
  title: 'New Post Title',
  content: 'Write your story'
};

export default function colorReducer (state = defaultState, action = {}) {
  switch (action) {
    default:
      return state;
  }
}
