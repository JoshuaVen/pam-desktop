import React from 'react';
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';

const Mal = () => {
  const auth = useSelector((state) => state.malAuth);

  return (
    <div>This is the mal auth pagge!!!</div>
  );
};

export default Mal;
