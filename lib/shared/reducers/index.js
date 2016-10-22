import {combineReducers} from 'redux';
import post from './post';
import {relateReducer} from 'relate-js';
import {routerStateReducer as router} from 'redux-router';

export const reducersToCombine = {
  relateReducer,
  router,
  post
};

export default combineReducers(reducersToCombine);
