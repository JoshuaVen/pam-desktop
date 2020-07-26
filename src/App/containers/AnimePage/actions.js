import { createAction } from '@reduxjs/toolkit';

export const req = createAction('ANIME_DETAILS_REQUEST');
export const res = createAction('ANIME_DETAILS_RESPONSE');
export const err = createAction('ANIME_DETAILS_ERRORED');
