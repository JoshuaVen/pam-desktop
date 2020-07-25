import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCheckCircle } from 'react-icons/fa';

import './Linking.css';
import '../form/PopupForm.css';
import Loading from '../../Assets/loading.svg';
import AnimeCard from '../anime-card/Card';
import {
  link_togg, link_init, link_reset, request
} from '../../containers/List/actions';

const Results = (props) => {
  const { search, handleLinking } = props;
  if (search.errorOccured) {
    return <div>An error occured during searching of the anime!</div>;
  }
  return search.searchRes.data.data.map(
    // eslint-disable-next-line react/no-array-index-key
    (anime, index) => <AnimeCard key={index} anime={anime.node} initiateLinking={handleLinking} />
  );
};

const Alert = () => (
  <div className="alert-box">
    <FaCheckCircle className="alert-icon" />
    <h2 className="alert-title">Linking Successful</h2>
    <p>The selected anime is linked with the downloaded anime</p>
  </div>
);

const AnimeLinking = () => {
  const link = useSelector((state) => state.link);
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const handleLinking = (tobeInserted) => {
    dispatch(link_init({ tobeInserted, searchTitle: search.searchTitle }));
  };
  const escFunc = (event) => {
    if (event.keyCode === 27) {
      dispatch(link_togg());
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    document.addEventListener('keydown', escFunc);
    return () => {
      dispatch(link_reset());
      dispatch(request());
      // eslint-disable-next-line no-undef
      document.removeEventListener('keydown', escFunc);
    };
  }, []);

  if (!search && !link) return null;
  return (
    <div className="popup">
      <div className="popup-inner">
        <div className="downloaded-anime">
          <h1>{search.searchTitle}</h1>
        </div>
        {link.linkingSuccess
          ? <Alert linkMessage={link.message} />
          : (
            <div className="content">
              {search.loading
                ? <Loading />
                : (
                  <Results
                    search={search}
                    handleLinking={handleLinking}
                  />
                )}
            </div>
          )}
      </div>
    </div>
  );
};

export default AnimeLinking;
