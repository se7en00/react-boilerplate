import { routerActions } from "connected-react-router"
import * as usersActions from "./user/actions"
import * as loadingAction from "./middleware/loading/actions"

export default {
    router: routerActions,
    users: usersActions,
    loading: loadingAction
}
