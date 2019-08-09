import { createStore, compose, applyMiddleware } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware } from 'connected-react-router'
//middleware
// import loadingMiddleware from './middleware/loadingMiddleware';
import {createBrowserHistory} from 'history'
import {IRootState, createRootReducer} from './index'

//browser history
export const history = createBrowserHistory()

const middleware = [
    routerMiddleware(history),
    // process.env.NODE_ENV !== 'production' && (createLogger())
].filter(Boolean)


const finalCreateStore = compose(
    applyMiddleware(...middleware)
)(createStore)


export default function configureStore(initialState?:IRootState) {
    return finalCreateStore(createRootReducer(history), initialState)
}