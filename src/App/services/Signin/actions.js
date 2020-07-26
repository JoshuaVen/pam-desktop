import { createAction } from '@reduxjs/toolkit'

export const request = createAction('SIGN_IN_REQUEST')
export const success = createAction('SIGN_IN_SUCCESS')
export const failed = createAction('SIGN_IN_FAILED')
export const deny = createAction('SIGN_IN_DENIED')
export const reallow = createAction('SIGN_IN_REALLOW')
export const updateTimeout = createAction('SIGN_IN_UPDATE_TIMEOUT')
