import { combineReducers } from "redux"
import { ActionType, getType } from "typesafe-actions"
import produce, { Draft } from "immer"

import * as localeActions from "./actions"

export type localeActions = ActionType<typeof localeActions>

export type loadingState = Readonly<{
    language: string
}>

const defaultLocale = localStorage.getItem("LANGUAGE")

const initialState: loadingState = {
    language: defaultLocale ?? "zh"
}

export default combineReducers<loadingState, localeActions>({
    language: produce((draft: Draft<string> = initialState.language, action: localeActions) => {
        switch (action.type) {
            case getType(localeActions.toggleLanguage):
                draft = action.payload
                localStorage.setItem("LANGUAGE", action.payload)
                return draft
            default:
                return draft
        }
    })
})
