import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FaLink } from 'react-icons/fa';
import { link_togg, link_title } from '../../containers/List/actions';
import './ExpandableItem.css';

const ExpandableItem = (props) => {
  const { anime } = props;
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(link_title(anime.title));
    dispatch(link_togg());
  };
  return (
    <div
      className="expandable-item"
      onClick={handleClick}
      role="presentation"
    >
      <div className="expandable-item-icon">
        <FaLink className="link" />
      </div>
      <div className="expandable-item-title">
        <p>{anime.title}</p>
      </div>
    </div>
  );
};

ExpandableItem.propTypes = {
  anime: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired
};

export default ExpandableItem;
