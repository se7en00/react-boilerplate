import { combineReducers } from 'redux'
import { History } from 'history'

import { connectRouter } from 'connected-react-router'
import usersReducer from './user/reducer'

const rootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  users: usersReducer,
})

export default rootReducer
