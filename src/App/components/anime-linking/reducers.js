/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const searchInitialState = {
  errorOccured: false,
  errorMessage: null,
  loading: false,
  searchRes: [],
  searchTitle: ''
};

export const searchReducer = createReducer(searchInitialState, {
  [actions.search_req]: (state, action) => {
    state.searchTitle = action.payload;
    state.loading = true;
  },
  [actions.search_rec]: (state, action) => {
    state.loading = false;
    state.searchRes = action.payload.data;
  },
  [actions.search_err]: (state, action) => {
    state.loading = false;
    state.errorOccured = true;
    state.errorMessage = action.payload;
  }
});

const linkInitialState = {
  referenceItem: '',
  toBeLinked: {},
  message: null,
  linkingStarted: false,
  linkingSuccess: null,
};

export const linkReducer = createReducer(linkInitialState, {
  [actions.link_init]: (state, action) => {
    state.toBeLinked = action.payload.toBeLinked;
    state.referenceItem = action.payload.referenceItem;
    state.linkingStarted = true;
  },
  [actions.link_succ]: (state, action) => {
    state.linkingStarted = false;
    state.linkingSuccess = true;
    state.message = action.payload;
  },
  [actions.link_fail]: (state, action) => {
    state.isLinking = false;
    state.linkingStarted = false;
    state.linkingSuccess = false;
    state.message = action.payload;
  },
  [actions.link_reset]: (state) => {
    state.isLinking = false;
    state.referenceItem = '';
    state.toBeLinked = {};
    state.message = null;
    state.linkingStarted = false;
    state.linkingSuccess = false;
  }
});
