import {combineReducers} from 'redux';
import {routerStateReducer as router} from 'redux-router';
import {relateReducer} from 'relate-js';

export const reducersToCombine = {
  relateReducer,
  router
};

export default combineReducers(reducersToCombine);
