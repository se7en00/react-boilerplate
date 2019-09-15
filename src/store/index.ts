import { createStore, compose, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
// import { composeWithDevTools } from 'redux-devtools-extension'
import { routerMiddleware,RouterState } from 'connected-react-router'
//middleware
// import loadingMiddleware from './middleware/loadingMiddleware'
import {createBrowserHistory} from 'history'
import rootReducer from './root-reducer'

import { LayoutState } from './layout'
import { usersReducer, IUserState} from './user'
import rootEpic from './root-epic'

export interface IRootState {
    router: RouterState,
    layout: LayoutState,
    user: IUserState
}

//browser history
export const history = createBrowserHistory()

export const epicMiddleware = createEpicMiddleware<
  Types.RootAction,
  Types.RootAction,
  Types.RootState
//   Services
>({
//   dependencies: services,
})

const middleware = [
    epicMiddleware,
    routerMiddleware(history),
    // process.env.NODE_ENV !== 'production' && (createLogger())
].filter(Boolean)

const finalCreateStore = compose(
    applyMiddleware(...middleware)
)(createStore)


epicMiddleware.run(rootEpic)

export default function configureStore(initialState?:IRootState) {
    return finalCreateStore(rootReducer(history), initialState)
}
