import * as _R from "ramda"
import Lodash from "lodash"
import _dayjs from "dayjs"

declare global {
    const R = typeof _R
    const _ = typeof Lodash
    const dayjs = typeof _dayjs
}

type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>
