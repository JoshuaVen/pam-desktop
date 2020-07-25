/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import pkceChallenge from 'pkce-challenge';
import { parse } from 'url';
import { useInjectReducer } from '../../Utils/injectReducer';
import { useInjectSaga } from '../../Utils/injectSaga';
import { mal_auth_post } from './actions';
import malAuthReducer from './reducer';
import malAuthSaga from './saga';
import './header.css';

const tokenSelector = createSelector(
  (state) => state.auth,
  (auth) => auth.token
);

const Header = React.memo(() => {
  useInjectReducer({ key: 'malAuth', reducer: malAuthReducer });
  useInjectSaga({ key: 'malAuthSaga', saga: malAuthSaga });
  const dispatch = useDispatch();
  const handleClick = () => {
    const { code_verifier } = pkceChallenge(128);
    const code_challenge = code_verifier;
    console.log(code_challenge === code_verifier);
    localStorage.setItem('codeVerifier', code_verifier);
    ipcRenderer.invoke('authenticate', code_challenge);
  };

  const auth = useSelector((state) => state.malAuth);
  const token = useSelector(tokenSelector);

  const { state } = parse(window.location.href, true).query;
  useEffect(() => {
    if (state === 'requestTest1') {
      console.log('post auth attempt');
      dispatch(mal_auth_post());
    }
  }, [state]);
  if (!auth) return null;

  return (
    <div className="header-body">
      <Link className="PAManager" to="/">PAManager</Link>
      <div className="connect">
        {auth.accessToken
          ? (<div>Connected!!!</div>)
          : (<button type="button" onClick={handleClick}>Connect To MAL</button>)}
        {token
          ? (<Link to="/signout">Sign Out</Link>)
          : (<Link to="/signin">Sign In</Link>)}
      </div>
    </div>
  );
});

export default Header;
