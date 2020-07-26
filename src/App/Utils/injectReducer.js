/* eslint-disable import/prefer-default-export */
import React from 'react';
import { isString, isEmpty, isFunction } from 'lodash';
import invariant from 'invariant';
import { ReactReduxContext } from 'react-redux';

function checkParams(key, reducer) {
  invariant(
    isString(key) && !isEmpty(key) && isFunction(reducer),
    '(app/utils...) injectReducer: Expected `reducer` to be a reducer function',
  );
}

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export const useInjectReducer = ({ key, reducer }) => {
  checkParams(key, reducer);
  const context = React.useContext(ReactReduxContext);
  // eslint-disable-next-line prefer-destructuring
  const reducerManager = context.store.reducerManager;
  React.useEffect(() => {
    if (
      Reflect.has(reducerManager.getReducerMap(), key)
      && context.store.injectedReducers[key] === reducer
    ) {
      return;
    }
    reducerManager.add(key, reducer);
    context.store.replaceReducer(reducerManager.reduce);

    // eslint-disable-next-line consistent-return
    return () => {
      reducerManager.remove(key);
      context.store.replaceReducer(reducerManager.reduce);
    };
  }, [key]);
};
