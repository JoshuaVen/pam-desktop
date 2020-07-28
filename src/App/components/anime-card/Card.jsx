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
  try {
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
                onClick={() => {
                  initiateLinking(anime);
                }}
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
              <img className="animeImage" src={anime.main_picture.medium} alt="Anime Poster" />
              <p className="animeTitle">{anime.title}</p>
            </div>
          )}
      </div>
    );
  } catch (error) {
    console.log(error);
    return (<div>An error occured!</div>);
  }
};

Card.propTypes = {
  anime: PropTypes.shape({
    main_picture: PropTypes.shape({
      large: PropTypes.string.isRequired,
      medium: PropTypes.string.isRequired
    }),
    title: PropTypes.string.isRequired
  }).isRequired,
  initiateLinking: PropTypes.func.isRequired
};

export default Card;
