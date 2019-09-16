
import { Epic } from 'redux-observable'
import { tap, ignoreElements, filter } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { RootAction, RootState, Utils } from 'store-types'
import utils from '@/utils'
import { E_USER_ACTION_TYPES } from './types'
// contrived example!!!
export const logAddAction: Epic<RootAction, RootAction, RootState, Utils> = (
  action$,
  state$,
  utils
) =>
  action$.pipe(
    filter(isOfType(E_USER_ACTION_TYPES.GET_USERS)), // action is narrowed to: { type: "ADD_TODO"; payload: string; }
    tap(action => {
      utils.logger.log(
        `action type must be equal: ${E_USER_ACTION_TYPES.GET_USERS} === ${action.type}`
      )
    }),
    ignoreElements()
  )
