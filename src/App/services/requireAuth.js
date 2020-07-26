// eslint-disable-next-line
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useRequireAuth = () => {
  const authToken = useSelector(
    (state) => state.auth.token
  );
  const history = useHistory();
  const shouldNavigateAway = () => {
    if (!authToken) {
      history.push('/signin');
    }
  };

  useEffect(() => {
    shouldNavigateAway();
  }, []);
};

export default useRequireAuth;
