import { routerActions } from "connected-react-router"
import { usersActions } from "./user"
import { loadingActions } from "./middleware/loading"
import { localeActions } from "./locale"

export default {
    router: routerActions,
    users: usersActions,
    loading: loadingActions,
    locale: localeActions
}
