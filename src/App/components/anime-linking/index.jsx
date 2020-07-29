import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCheckCircle } from 'react-icons/fa';

import './Linking.css';
import '../form/PopupForm.css';
import Loading from '../../Assets/spinner.svg';
import AnimeCard from '../anime-card/Card';
import { useInjectReducer } from '../../Utils/injectReducer';
import { useInjectSaga } from '../../Utils/injectSaga';
import { local } from '../../services/localFiles';
import linkSaga from './saga';
import { linkReducer, searchReducer } from './reducers';
import {
  link_init, link_reset, search_req
} from './actions';
import { sync_req, link_togg } from '../../containers/List/actions';

const Results = (props) => {
  const { search, handleLinking, } = props;
  if (search.errorOccured) {
    return <div>An error occured during searching</div>;
  }
  try {
    const searchResults = search.searchRes.data.data.map(
      // eslint-disable-next-line react/no-array-index-key
      (anime, index) => <AnimeCard key={index} anime={anime.node} initiateLinking={handleLinking} />
    );
    return searchResults;
  } catch (error) {
    console.log(error);
    return (<div>Error on anime card</div>);
  }
};

const Alert = () => (
  <div className="alert-box">
    <FaCheckCircle className="alert-icon" />
    <h2 className="alert-title">Linking Successful</h2>
    <p>The selected anime is linked with the downloaded anime</p>
  </div>
);

const AnimeLinking = () => {
  useInjectReducer({ key: 'link', reducer: linkReducer });
  useInjectReducer({ key: 'search', reducer: searchReducer });
  useInjectSaga({ key: 'linkSaga', saga: linkSaga });
  const linkToggler = useSelector((state) => state.linkToggler);
  const link = useSelector((state) => state.link);
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const handleLinking = (tobeInserted) => {
    dispatch(link_init({ tobeInserted, searchTitle: search.searchTitle }));
  };
  const escFunc = (event) => {
    if (event.keyCode === 27) {
      dispatch(link_reset());
      dispatch(link_togg());
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-undef
    document.addEventListener('keydown', escFunc);
    const { title } = linkToggler;
    dispatch(search_req(title));
    return () => {
      const localList = local();
      dispatch(sync_req(localList));
      // eslint-disable-next-line no-undef
      document.removeEventListener('keydown', escFunc);
    };
  }, []);

  if (!search && !link) return null;
  try {
    const isLinking = link.linkingStarted
      ? <Loading /> : <Results search={search} handleLinking={handleLinking} />;

    return (
      <div className="popup">
        <div className="popup-inner">
          <div className="downloaded-anime">
            <h1>{search.searchTitle}</h1>
          </div>
          {link.linkingSuccess
            ? <Alert linkMessage={link.message} dispatch={dispatch} />
            : (
              <div className="content">
                {search.loading
                  ? <Loading />
                  : isLinking}
              </div>
            )}
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return (<div>An error occured in anime linking!</div>);
  }
};

export default AnimeLinking;
