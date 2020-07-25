/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const malAuthInitialState = {
  initialized: false,
  accessToken: null,
  errored: null,
};

const malAuthReducer = createReducer(malAuthInitialState, {
  [actions.mal_auth_post]: (state) => {
    state.initialized = true;
  },
  [actions.mal_auth_post_res]: (state, action) => {
    state.initialized = false;
    state.accessToken = action.payload;
  },
  [actions.mal_auth_post_err]: (state, action) => {
    state.initialized = false;
    state.errored = action.payload;
  },
});

export default malAuthReducer;
