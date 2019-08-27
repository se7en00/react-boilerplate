import * as _R from 'ramda'

declare global {
    const R = typeof _R
}

type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>