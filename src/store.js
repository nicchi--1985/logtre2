import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './redux/modules/reducers'

export function configurateStore() {
    return createStore(
        reducers,
        applyMiddleware(thunk)
    )
}
