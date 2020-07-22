import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    currentActive: 0
}

const homeReducer = createReducer(initialState, {})

export default homeReducer
