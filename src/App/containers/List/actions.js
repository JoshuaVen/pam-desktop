import { createAction } from '@reduxjs/toolkit';

export const request = createAction('FETCH_DLED_REQUEST');
export const success = createAction('FETCH_DLED_SUCCESS');
export const failed = createAction('FETCH_DLED_FAILED');

export const sync_req = createAction('SYNC_LOCAL_REQ');
export const sync_rec = createAction('SYNC_LOCAL_REC');
export const sync_err = createAction('SYNC_LOCAL_ERR');

export const link_togg = createAction('LINK_TOGG');
export const link_title = createAction('LINK_TITLE');
