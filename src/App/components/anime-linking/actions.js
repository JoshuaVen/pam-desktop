import { createAction } from '@reduxjs/toolkit';

export const search_req = createAction('SEARCH_REQ');
export const search_rec = createAction('SEARCH_REC');
export const search_err = createAction('SEARCH_ERR');

export const link_init = createAction('INITIATE_LINKING');
export const link_succ = createAction('LINKING_SUCCESS');
export const link_fail = createAction('LINKING_FAIL');
export const link_reset = createAction('RESET_LINKING');
