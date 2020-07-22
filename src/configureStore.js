import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import { staticReducers } from './reducer'

export function createReducerManager(initialReducers) {

    const reducers = { ...initialReducers }
    let combinedReducer = combineReducers(reducers)
    let keysToRemove = []

    return {
        getReducerMap: () => reducers,

        reduce: (state, action) => {
            if (keysToRemove.length > 0) {
                state = { ...state }
                for (let key of keysToRemove) {
                    delete state[key]
                }
                keysToRemove = []
            }
            return combinedReducer(state, action)
        },

        add: (key, reducer) => {
            if (!key || reducers[key]) {
                return
            }
            reducers[key] = reducer
            combinedReducer = combineReducers(reducers)
        },

        remove: key => {
            if (!key || !reducers[key]) {
                return
            }
            delete reducers[key]
            keysToRemove.push(key)
            combinedReducer = combineReducers(reducers)
        }
    }
}

function configureStore() {
    const reduxSagaMonitorOptions = {}
    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions)

    const middlewares = [sagaMiddleware]
    const middlewareEnhancers = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancers]
    const composedEnhancers = composeWithDevTools(...enhancers)

    const reducerManager = createReducerManager(staticReducers)
    const store = createStore(
        reducerManager.reduce, composedEnhancers
    )

    store.injectedSagas = {}
    store.runSaga = sagaMiddleware.run
    store.reducerManager = reducerManager
    return store
}

export default (props) => {
    return (
        <Provider store={configureStore()}>
            {props.children}
        </Provider>
    )
}
