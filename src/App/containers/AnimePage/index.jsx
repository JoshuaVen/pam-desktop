/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { parse } from 'url';

import { useInjectReducer } from '../../Utils/injectReducer';
import { useInjectSaga } from '../../Utils/injectSaga';
import useRequireAuth from '../../services/requireAuth';

import animeReducer from './reducer';
import animeSaga from './saga';
import * as anime from './actions';
import './AnimePage.css';

const Anime = () => {
  useInjectReducer({ key: 'anime', reducer: animeReducer });
  useInjectSaga({ key: 'animeSaga', saga: animeSaga });
  useRequireAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    // eslint-disable-next-line no-undef
    const { mal_id } = parse(window.location.href, true).query;
    dispatch(anime.req(mal_id));
    return () => null;
  }, []);

  const animeDetails = useSelector((state) => state.anime);
  if (!animeDetails) return null;
  if (animeDetails.isRequesting) return null;
  const { details } = animeDetails;
  return (
    <div>
      <div className="title">
        <div className="title-jp">
          <span className="title-span jp">
            {details.alternative_titles.ja}
          </span>
        </div>
        <div className="title-en">
          <span className="title-span en">
            {details.title}
          </span>
        </div>
        <div className="box-genres">
          {details.genres.map((genre, index) => <span key={index} className="genre-span">{genre.name}</span>)}
        </div>
        <div className="details">
          <div className="summary">
            <img src={`http://localhost:8080/${details.offline_img}`} alt="Anime Poster" />
            <div className="year">
              <p>{details.start_date}</p>
            </div>
            <div className="studio">
              {details.studios.map((studio, index) => <span className="box-studio" key={index}>{studio.name}</span>)}
            </div>
          </div>
          <div className="synopsis">
            <p>{details.synopsis}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Anime;
