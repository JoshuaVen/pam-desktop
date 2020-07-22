/* eslint-disable import/prefer-default-export */
import React from 'react';
import { ReactReduxContext } from 'react-redux';
import invariant from 'invariant';
import {
  isEmpty, isFunction, isString, conformsTo
} from 'lodash';

// import getInjectors from './sagaInjectors';
import { DAEMON, ONCE_TILL_UNMOUNT, RESTART_ON_REMOUNT } from './constants';
import checkStore from './checkStore';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];
const checkKey = (key) => invariant(
  isString(key) && !isEmpty(key),
  '(app/utils...) injectSaga: Expected `key` to be a non empty string',
);
const checkDescriptor = (descriptor) => {
  const shape = {
    saga: isFunction,
    mode: (mode) => isString(mode) && allowedModes.includes(mode),
  };
  invariant(
    conformsTo(descriptor, shape),
    '(app/utils...) injectSaga: Expected a valid saga descriptor',
  );
};

/**
 * Dynamically injects a saga, passes component's props as saga arguments
 *
 * @param {string} key A key of the saga
 * @param {function} saga A root saga that will be injected
 * @param {string} [mode] By default (constants.DAEMON) the saga will be started
 * on component mount and never canceled or started again. Another two options:
 *   - constants.RESTART_ON_REMOUNT — the saga will be started on component mount and
 *   cancelled with `task.cancel()` on component unmount for improved performance,
 *   - constants.ONCE_TILL_UNMOUNT — behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 *
 */
export const useInjectSaga = ({ key, saga, mode }) => {
  const context = React.useContext(ReactReduxContext);

  React.useEffect(() => {
    checkStore(context.store);
    const newDescriptor = {
      saga,
      mode: mode || DAEMON
    };
    checkKey(key);
    checkDescriptor(newDescriptor);
    let hasSaga = Reflect.has(context.store.injectedSagas, key);

    if (process.env.NODE_ENV !== 'production') {
      const oldDescriptor = context.store.injectedSagas[key];
      // enable hot reloading of daemon and once-till-unmount sagas
      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (!hasSaga
      || (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)) {
      context.store.injectedSagas[key] = {
        ...newDescriptor,
        task: context.store.runSaga(saga, { key, saga, mode })
      };
    }

    return () => {
      checkKey(key);

      if (Reflect.has(context.store.injectedSagas, key)) {
        const descriptor = context.store.injectedSagas[key];
        if (descriptor.mode && descriptor.mode !== DAEMON) {
          descriptor.task.cancel();
          // Clean up in production; in development we need `descriptor.saga` for hot reloading
          if (process.env.NODE_ENV === 'production') {
            // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
            context.store.injectedSagas[key] = 'done'; // eslint-disable-line no-param-reassign
          }
        }
      }
    };
  }, []);
};
