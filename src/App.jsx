import { hot } from 'react-hot-loader';
import React from 'react';
import { Route } from 'react-router-dom';
import Header from './containers/Header/Header';
import loadable from './Utils/loadable';

const Signin = loadable(() => import('./services/Signin'),
  { fallback: <div>Loading...</div> });
const Signout = loadable(() => import('./services/Signout'));
const Home = loadable(() => import('./containers/HomePage'));

function App() {
  return (
    <div>
      <Header />
      <Route path="/signin" exact component={Signin} />
      <Route path="/signout" exact component={Signout} />
      <Route path="/" exact component={Home} />
    </div>

  );
}

export default hot(module)(App);
