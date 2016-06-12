import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

export function configurateStore() {
    return createStore(
        reducer,
        applyMiddleware(thunk)
    )
}
