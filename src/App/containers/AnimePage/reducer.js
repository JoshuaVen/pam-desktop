/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
  requesting: null,
  details: null,
  message: null
};

const animeReducer = createReducer(initialState, {
  [actions.req]: (state) => {
    state.requesting = true;
  },
  [actions.res]: (state, action) => {
    state.requesting = false;
    state.message = 'successful';
    state.details = action.payload;
  },
  [actions.err]: (state, action) => {
    state.requesting = false;
    state.message = action.payload;
  }
});

export default animeReducer;
