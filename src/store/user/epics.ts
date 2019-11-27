import { Epic } from "redux-observable"
import { ignoreElements, filter } from "rxjs/operators"
import { RootAction, RootState, Utils, isActionOf } from "typesafe-actions"
import * as userActions from "./actions"

/* eslint-disable-next-line */
export const logAddAction: Epic<RootAction, RootAction, RootState, Utils> = (action$, state$, utils) =>
    action$.pipe(
        filter(isActionOf(userActions.getUsers)),
        // tap(action => {
        //     console.log(222333)
        // }),
        ignoreElements()
    )
