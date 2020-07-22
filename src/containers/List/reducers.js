import * as downloaded from './actions'
import { createReducer } from '@reduxjs/toolkit'

const listInitialState = {
    isFetching: false,
    currentActive: null,
    dledAnime: {
        associatedDocs: [],
        unAssociated: []
    },
    errorMessage: ''
}

const listReducer = createReducer(listInitialState, {
    [downloaded.request]: (state) => { state.isFetching = true },
    [downloaded.success]: (state, action) => {
        state.isFetching = false
        state.dledAnime = action.payload.data
    },
    [downloaded.failed]: (state, action) => {
        state.isFetching = false
        state.errorMessage = action.payload
    }
})

export default listReducer

const syncLocalInitialState = {
    isSyncing: false,
    localList: null,
    syncMessage: null,
    syncError: null,
}

export const syncLocalReducer = createReducer(syncLocalInitialState, {
    [downloaded.sync_req]: (state, action) => {
        state.isSyncing = true
        state.localList = action.payload
    },
    [downloaded.sync_rec]: (state, action) => {
        state.isSyncing = false
        state.localList = null
        state.syncMessage = action.payload
        state.syncError = false
    },
    [downloaded.sync_err]: (state, action) => {
        state.isSyncing = false
        state.localList = false
        state.syncMessage = action.payload
        state.syncError = true
    }
})

const searchInitialState = {
    errorOccured: false,
    errorMessage: null,
    loading: false,
    searchRes: [],
    searchTitle: ''
}

export const searchReducer = createReducer(searchInitialState, {
    [downloaded.search_req]: (state, action) => {
        state.searchTitle = action.payload
        state.loading = true
    },
    [downloaded.search_rec]: (state, action) => {
        state.loading = false
        state.searchRes = action.payload.data
    },
    [downloaded.search_err]: (state, action) => {
        state.errorOccured = true
        state.errorMessage = action.payload
    }
})


const linkInitialState = {
    isLinking: false,
    referenceItem: '',
    toBeLinked: {},
    message: null,
    linkingStarted: false,
    linkingSuccess: false,
}

export const linkReducer = createReducer(linkInitialState, {
    [downloaded.link_togg]: (state) => {
        state.isLinking = !state.isLinking
    },
    [downloaded.link_init]: (state, action) => {
        state.toBeLinked = action.payload.toBeLinked
        state.referenceItem = action.payload.referenceItem
        state.linkingStarted = true
    },
    [downloaded.link_succ]: (state, action) => {
        state.linkingStarted = false
        state.linkingSuccess = true
        state.message = action.payload
    },
    [downloaded.link_fail]: (state, action) => {
        state.isLinking = false
        state.linkingStarted = false
        state.linkingSuccess = false
        state.message = action.payload
    },
    [downloaded.link_reset]: (state) => {
        state.isLinking = false
        state.referenceItem = ''
        state.toBeLinked = {}
        state.message = null
        state.linkingStarted = false
        state.linkingSuccess = false
    }
})
