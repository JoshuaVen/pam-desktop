import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaCheck, FaTimes } from 'react-icons/fa';
import './Card.css';

const Card = (props) => {
  const { anime, initiateLinking } = props;
  const [isConfirming, setConfirmation] = useState(false);

  const toggleConfirmation = () => {
    setConfirmation(!isConfirming);
  };

  return (
    <div
      className="anime-card"
      onClick={toggleConfirmation}
      role="presentation"
    >
      {isConfirming
        ? (
          <div className="confirmation">
            <div
              className="confirm-div"
              onClick={() => initiateLinking(anime)}
              role="presentation"
            >
              <FaCheck className="icon confirm" />
            </div>
            <div
              className="cancel-div"
              onClick={toggleConfirmation}
              role="presentation"
            >
              <FaTimes className="icon cancel" />
            </div>
          </div>
        )
        : (
          <div>
            <img className="animeImage" src={anime.image_url} alt="Anime Poster" />
            <p className="animeTitle">{anime.title}</p>
          </div>
        )}
    </div>
  );
};

Card.propTypes = {
  anime: PropTypes.shape({
    image_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  initiateLinking: PropTypes.func.isRequired
};

export default Card;
