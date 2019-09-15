import { combineReducers } from 'redux'
import { ActionType, createReducer } from 'typesafe-actions'
import * as users from './actions'
import { E_USER_ACTION_TYPES, IUserState } from './types'

export type IUesrActions = ActionType<typeof users>

const initialState: IUserState = {
    userList: []
}

/**
 * get users
 */
const getUsers = createReducer(initialState.userList).handleAction(
    E_USER_ACTION_TYPES.GET_USERS,
    (state, action) => action.payload
)

export default combineReducers({
    getUsers
})