/* eslint-disable no-undef */
import React from 'react';
import { expect } from 'chai';
import { shallow, render } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import App, { AppTest } from './App';
import testHook from './Utils/testHook';
import Header from './containers/Header/Header';
import Root from './configureStore';

let testApp;

describe('App', () => {
  it('renders', () => {
    render(
      <Root>
        <Router>
          <App />
        </Router>
      </Root>
    );
  });
});
