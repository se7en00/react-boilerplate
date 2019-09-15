
import { Epic } from 'redux-observable'
import { tap, ignoreElements, filter } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'

import { E_USER_ACTION_TYPES } from './types'
// contrived example!!!
export const logAddAction: Epic<Types.RootAction, Types.RootAction, Types.RootState> = (
  action$,
  state$,
) =>
  action$.pipe(
    filter(isOfType(E_USER_ACTION_TYPES.GET_USERS)), // action is narrowed to: { type: "ADD_TODO"; payload: string; }
    tap(action => {
      console.log(
        `action type must be equal: ${E_USER_ACTION_TYPES.GET_USERS} === ${action.type}`
      )
    }),
    ignoreElements()
  )
