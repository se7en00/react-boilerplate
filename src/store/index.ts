import { createStore, compose, applyMiddleware } from "redux"
import { createEpicMiddleware } from "redux-observable"
import { routerMiddleware } from "connected-react-router"
import { RootAction, RootState, IServices } from "typesafe-actions"
//middleware
// import loadingMiddleware from './middleware/loadingMiddleware'
import { createBrowserHistory } from "history"

import services from "@/services"
import rootReducer from "./root-reducer"
import rootEpic from "./root-epic"

//browser history
export const history = createBrowserHistory()

export const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, IServices>({
    dependencies: services
})

const middlewares = [
    epicMiddleware,
    routerMiddleware(history)
    // process.env.NODE_ENV !== 'production' && (createLogger())
].filter(Boolean)

const composeEnhancers =
    (process.env.NODE_ENV === "development" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const enhancer = composeEnhancers(applyMiddleware(...middlewares))

// const finalCreateStore = compose(
//     applyMiddleware(...middleware)
// )(createStore)

// rehydrate state on app start
const initialState = {}

// create store
const store = createStore(rootReducer(history), initialState, enhancer)

epicMiddleware.run(rootEpic)

export default store

// export default function configureStore(initialState = {}) {
//     return finalCreateStore(rootReducer(history), initialState)
// }
