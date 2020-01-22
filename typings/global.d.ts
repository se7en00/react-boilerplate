import * as _R from "ramda"
import Lodash from "lodash"
import _dayjs from "dayjs"

declare global {
    const R = typeof _R
    const _ = typeof Lodash
    const dayjs = typeof _dayjs

    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__: any
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    }
}

type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>
