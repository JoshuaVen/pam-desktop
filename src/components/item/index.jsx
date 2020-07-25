/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Item.css';
import './item-advance.css';
import './item-default.css';
import {
  FaCheck, FaUnlink, FaPlay, FaInfo, FaAngleRight
} from 'react-icons/fa';

const Item = (props) => {
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
  };

  const { anime } = props;
  const history = useHistory();

  // eslint-disable-next-line react/no-array-index-key
  const genres = anime.genre.map((g, index) => <span className="genre-span" key={index}>{g.name}</span>);

  return (
    <div className={`item${isOpen ? ' advance' : ''}`} onClick={handleClick} role="presentation">
      <div className={`item-title${isOpen ? ' hide' : ''}`}>
        <span className="span-title">{anime.title}</span>
      </div>
      <img className="item-image" src={`http://localhost:8080/${anime.offline_img}`} alt="Anime Poster" />
      <div className="item-genre">
        {genres}
      </div>
      <div className="item-default">
        <div
          className="item-default-icon"
        >
          <FaCheck className="check" />
          <FaAngleRight className="extend" />
        </div>
        <div className={`item-advance${isOpen ? '' : ' hide'}`}>
          <div className={`item-advance-icon${isOpen ? '' : ' hide'}`}>
            <FaUnlink className="advance-icon" />
          </div>
          <div className={`item-advance-icon${isOpen ? '' : ' hide'}`}>
            <FaPlay className="advance-icon" />
          </div>
          <div
            className={`item-advance-icon${isOpen ? '' : ' hide'}`}
            onClick={() => history.push(
              `/anime?mal_id=${anime.mal_id}`
            )}
            role="presentation"
          >
            <FaInfo className="advance-icon" />
          </div>

        </div>
        <div className={`item-default-premier${isOpen ? ' hide' : ''}`}>
          <span className="year-span">
            Year Premiered: {anime.premier_year}
          </span>
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  anime: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    genre: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    premier_year: PropTypes.number.isRequired,
    mal_id: PropTypes.number.isRequired,
    offline_img: PropTypes.string.isRequired,
  }).isRequired
};

export default Item;
