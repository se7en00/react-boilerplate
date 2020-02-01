import { combineReducers } from "redux"
import { History } from "history"

import { connectRouter } from "connected-react-router"
import { userReducer } from "./user"
import { localeReducer } from "./locale"
import { loadingReduce } from "./middleware/loading"

const rootReducer = (history: History) =>
    combineReducers({
        router: connectRouter(history),
        user: userReducer,
        loading: loadingReduce,
        locale: localeReducer
    })

export default rootReducer
