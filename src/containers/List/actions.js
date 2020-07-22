import { createAction } from '@reduxjs/toolkit'

export const request = createAction('FETCH_DLED_REQUEST')
export const success = createAction('FETCH_DLED_SUCCESS')
export const failed = createAction('FETCH_DLED_FAILED')

export const sync_req = createAction('SYNC_LOCAL_REQ')
export const sync_rec = createAction('SYNC_LOCAL_REC')
export const sync_err = createAction('SYNC_LOCAL_ERR')

export const search_req = createAction('SEARCH_REQ')
export const search_rec = createAction('SEARCH_REC')
export const search_err = createAction('SEARCH_ERR')

export const link_togg = createAction('TOGGLE_LINKING')
export const link_init = createAction('INITIATE_LINKING')
export const link_succ = createAction('LINKING_SUCCESS')
export const link_fail = createAction('LINKING_FAIL')
export const link_reset = createAction('RESET_LINKING')
