import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import gameReducer from './gameReducer'

let reducers = combineReducers({
    gamePage: gameReducer,
})

let store = createStore(reducers,applyMiddleware(thunkMiddleware))

window.store = store

export default store