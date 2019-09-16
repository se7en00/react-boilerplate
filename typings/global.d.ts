import * as _R from 'ramda'

declare global {
    const R = typeof _R

    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__: any;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}

type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>