import { createAction } from '@reduxjs/toolkit';

// post the code and code verifer stored in localStorage to myanimelist
export const mal_auth_post = createAction('MAL_AUTH_POST_INIT');

// the post request return a JSON object
// and store the JSON object
// clean the storage
export const mal_auth_post_res = createAction('MAL_AUTH_POST_RES');

// Return an error state when an error occured
export const mal_auth_post_err = createAction('MAL_AUTH_POST_ERR');
