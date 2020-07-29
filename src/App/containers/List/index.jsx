import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

import { useInjectReducer } from '../../Utils/injectReducer';
import { useInjectSaga } from '../../Utils/injectSaga';
import { local } from '../../services/localFiles';

import listReducer, { syncLocalReducer, linkToggler } from './reducers';
import loadable from '../../Utils/loadable';
import * as actions from './actions';
import listSaga from './saga';

import Item from '../../components/item';
import ExpandableItem from '../../components/expandable-item';
import './List.css';
import LoadingComp from '../../components/loading-component';

const AnimeLinking = loadable(() => import('../../components/anime-linking'), { fallback: <LoadingComp /> });

const List = (props) => {
  const { history } = props;
  useInjectReducer({ key: 'list', reducer: listReducer });
  useInjectReducer({ key: 'sync', reducer: syncLocalReducer });
  useInjectReducer({ key: 'linkToggler', reducer: linkToggler });
  useInjectSaga({ key: 'listSaga', saga: listSaga });
  const list = useSelector(
    (state) => state.list
  );
  const linkToggle = useSelector(
    (state) => state.linkToggler
  );
  const dispatch = useDispatch();
  const [isLinkedExpanded, setLinkedExpanded] = useState(true);
  const [isNotLinkedExpanded, setNotLinkedExpanded] = useState(false);

  useEffect(() => {
    const localList = local();
    dispatch(actions.sync_req(localList));
  }, []);

  const handleClickLinked = () => {
    setLinkedExpanded(!isLinkedExpanded);
  };

  const handleClickNotLinked = () => {
    setNotLinkedExpanded(!isNotLinkedExpanded);
  };

  if (linkToggle && linkToggle.linkOpen) return <AnimeLinking />;

  try {
    return (
      <div className="list-main">
        <div className="grouped">
          <span className="grouped-span">Linked</span>
          <div
            className="grouped-icon"
            onClick={handleClickLinked}
            role="presentation"
          >
            {isLinkedExpanded ? <FaChevronUp className="icon up" /> : <FaChevronDown className="icon down" />}
          </div>
        </div>
        <div className={`list linked${isLinkedExpanded ? '' : ' collapse'}`}>
          {list.dledAnime.associatedDocs.map(
            (anime) => <Item anime={anime} key={anime.title} history={history} />
          )}
        </div>
        <div className="grouped">
          <span className="grouped-span">Unlinked</span>
          <div
            className="grouped-icon"
            onClick={handleClickNotLinked}
            role="presentation"
          >
            {isNotLinkedExpanded ? <FaChevronUp className="icon up" /> : <FaChevronDown className="icon down" />}
          </div>
        </div>
        <div className={`list notlinked${isNotLinkedExpanded ? '' : ' collapse'}`}>
          {list.dledAnime.unAssociated.map(
            (anime) => <ExpandableItem anime={anime} key={anime.title} index={anime.title} />
          )}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="loading-comp">
        <LoadingComp />
      </div>
    );
  }
};

List.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
};

export default List;
