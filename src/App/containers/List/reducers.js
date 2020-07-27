/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import * as downloaded from './actions';

const linkToggInitialState = {
  linkOpen: false,
  title: null,
};

export const linkToggler = createReducer(linkToggInitialState, {
  [downloaded.link_togg]: (state) => {
    state.linkOpen = !state.linkOpen;
  },
  [downloaded.link_title]: (state, action) => {
    state.title = action.payload;
  }
});

const listInitialState = {
  dledAnime: null,
  errorMessage: null
};

const listReducer = createReducer(listInitialState, {
  [downloaded.success]: (state, action) => {
    state.dledAnime = action.payload;
  },
  [downloaded.failed]: (state, action) => {
    state.errorMessage = action.payload;
  }
});

export default listReducer;

const syncLocalInitialState = {
  isSyncing: false,
  localList: null,
  syncMessage: null,
  syncError: null,
};

export const syncLocalReducer = createReducer(syncLocalInitialState, {
  [downloaded.sync_req]: (state, action) => {
    state.isSyncing = true;
    state.localList = action.payload;
  },
  [downloaded.sync_rec]: (state, action) => {
    state.isSyncing = false;
    state.localList = null;
    state.syncMessage = action.payload;
    state.syncError = false;
  },
  [downloaded.sync_err]: (state, action) => {
    state.isSyncing = false;
    state.localList = false;
    state.syncMessage = action.payload;
    state.syncError = true;
  }
});
