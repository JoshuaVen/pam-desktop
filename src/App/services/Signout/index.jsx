import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useInjectSaga } from '../../Utils/injectSaga';

import signoutSaga from './saga';
import { signout } from './actions';
import './signout.css';

const Signout = () => {
  useInjectSaga({ key: 'signout', saga: signoutSaga });
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      dispatch(signout());
      history.push('/');
    }, 3000);
  }, []);
  return (
    <div className="signout">
      <div className="signout-box">
        <span className="signout-text">Signing out...</span>
      </div>
    </div>
  );
};

export default Signout;
