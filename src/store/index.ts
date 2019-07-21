import { combineReducers, Dispatch, Action, AnyAction } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import { LayoutState, layoutReducer } from './layout'

export interface IRootState {
    layout: LayoutState
}

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>
}


export const createRootReducer = (history: History) =>
    combineReducers({
        layout: layoutReducer
        // router: connectRouter(history)
    })