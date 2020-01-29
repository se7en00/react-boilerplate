import { combineReducers } from "redux"
import { ActionType, getType } from "typesafe-actions"
import produce, { Draft } from "immer"
import * as loadingActions from "./actions"

export type loadingAction = ActionType<typeof loadingActions>

export type loadingState = Readonly<{
    isLoading: boolean
}>

const initialState: loadingState = {
    isLoading: false
}

export default combineReducers<loadingState, loadingAction>({
    isLoading: produce((draft: Draft<boolean> = initialState.isLoading, action: loadingAction) => {
        switch (action.type) {
            case getType(loadingActions.startLoading):
                draft = true
                return draft
            case getType(loadingActions.stopLoading):
                draft = false
                return draft
            default:
                return draft
        }
    })
})
