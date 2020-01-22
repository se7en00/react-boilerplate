import { combineReducers } from "redux"
import { History } from "history"

import { connectRouter } from "connected-react-router"
import userReducer from "./user/reducer"

const rootReducer = (history: History) =>
    combineReducers({
        router: connectRouter(history),
        user: userReducer
    })

export default rootReducer
