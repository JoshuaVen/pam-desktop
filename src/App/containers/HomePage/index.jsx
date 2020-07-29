import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useRequireAuth from '../../services/requireAuth';
import { useInjectReducer } from '../../Utils/injectReducer';
import loadable from '../../Utils/loadable';

import homeReducer from './reducer';
import Header from '../../components/header';
import LoadingComp from '../../components/loading-component';

const List = loadable(() => import('../List'), { fallback: <LoadingComp /> });

const pages = [
  { title: 'Anime', description: 'All anime displayed that are added by the user' },
  { title: 'Completed', description: 'Titles that are finished watching' },
  { title: 'Currently Watching', description: 'Titles that are currently being watched' },
  { title: 'Plan To Watch', description: 'Titles that are to be watched' },
  { title: 'Downloaded', description: 'Titles that added to the local device for watching' },
];

const Home = (props) => {
  const { history } = props;
  useRequireAuth();
  useInjectReducer({ key: 'home', reducer: homeReducer });
  const home = useSelector(
    (state) => state.home
  );
  if (!home) return null;

  return (
    <div className="home">
      {/*
                {this.props.isConnectedToMAL ? <SideNav /> : null}

                {this.props.form.isPopped ? <PopupForm /> : null}
                 */}
      <Header pages={pages} currentActive={home.currentActive} />
      <List history={history} />
    </div>
  );
};

export default Home;

Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired
};
