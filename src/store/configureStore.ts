import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
//middleware
// import loadingMiddleware from './middleware/loadingMiddleware';
import {createBrowserHistory} from 'history';
import rootReducer from '../reducers/reducers';

//browser history
const history = createBrowserHistory()

const middleware = [
    routerMiddleware(history),
    // process.env.NODE_ENV !== 'production' && (createLogger())
].filter(Boolean);


const finalCreateStore = compose(
    applyMiddleware(...middleware)
)(createStore);


export default function configureStore(initialState = {}) {
    return finalCreateStore(rootReducer, initialState);
}