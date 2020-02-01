import { createStore, applyMiddleware } from "redux"
import { createEpicMiddleware } from "redux-observable"
import { composeWithDevTools } from "redux-devtools-extension"
import { composeWithDevTools as devToolsEnhancer } from "redux-devtools-extension/logOnlyInProduction"
import { routerMiddleware } from "connected-react-router"
import { RootAction, RootState, IServices } from "typesafe-actions"
//middleware
import { loadingMiddleware } from "./middleware/loading"
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
    loadingMiddleware,
    epicMiddleware,
    routerMiddleware(history)
    // process.env.NODE_ENV !== 'production' && (createLogger())
].filter(Boolean)

const composeEnhancers = process.env.NODE_ENV === "development" ? composeWithDevTools : devToolsEnhancer

const enhancer = composeEnhancers(applyMiddleware(...middlewares))

// rehydrate state on app start
const initialState = {}

// create store
const store = createStore(rootReducer(history), initialState, enhancer)

epicMiddleware.run(rootEpic)

export default store

// export default function configureStore(initialState = {}) {
//     return finalCreateStore(rootReducer(history), initialState)
// }
