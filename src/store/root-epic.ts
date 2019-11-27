import { combineEpics } from "redux-observable"

import * as userEpics from "./user/epics"

export default combineEpics(...Object.values(userEpics))
