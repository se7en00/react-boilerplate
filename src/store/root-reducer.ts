import { combineReducers } from "redux"
import { History } from "history"

import { connectRouter } from "connected-react-router"
import userReducer from "./user/reducer"
import loadingReducer from "./middleware/loading/reducer"

const rootReducer = (history: History) =>
    combineReducers({
        router: connectRouter(history),
        user: userReducer,
        loading: loadingReducer
    })

export default rootReducer
