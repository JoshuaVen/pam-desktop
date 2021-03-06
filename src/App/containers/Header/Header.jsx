/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
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
import './header-links.css';

const tokenSelector = createSelector(
  (state) => state.auth,
  (auth) => auth.token
);

const HeaderLinks = () => {
  const [activeLink, setActiveLink] = useState(1);
  const navLinks = [
    { name: 'Home', link: '/home' },
    { name: 'Animes', link: '/main_window' },
    { name: 'Progress', link: '/progress' },
  ];
  const buildLinks = navLinks.map((link, index) => (
    <Link
      to={link.link}
      className={`header-link${index === activeLink ? ' active' : ''}`}
      onClick={() => setActiveLink(index)}
    >
      <span>{link.name}</span>
    </Link>
  ));

  return (
    <div className="header-links">
      {buildLinks}
    </div>
  );
};

const Header = React.memo(() => {
  useInjectReducer({ key: 'malAuth', reducer: malAuthReducer });
  useInjectSaga({ key: 'malAuthSaga', saga: malAuthSaga });
  const dispatch = useDispatch();
  const handleClick = () => {
    const { code_verifier } = pkceChallenge(128);
    const code_challenge = code_verifier;
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
    <div className="header">
      <div className="header-body">
        <Link className="PAManager" to="/main_window">PAManager</Link>
        <div className="connect">
          {auth.accessToken
            ? (<div className="mal-indicator"><span className="span indicator">Connected</span></div>)
            : (<button type="button" onClick={handleClick}>Connect To MAL</button>)}
          {token
            ? (<Link to="/signout">Sign Out</Link>)
            : (<Link to="/signin">Sign In</Link>)}
        </div>
      </div>
      <HeaderLinks />
    </div>
  );
});

export default Header;
