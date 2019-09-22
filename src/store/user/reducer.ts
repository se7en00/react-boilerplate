import { combineReducers } from 'redux'
import { ActionType, createReducer } from 'typesafe-actions'
import { IUser } from './user-types'
import * as userActions from './actions'

export type UserState = Readonly<{
    userList: IUser[],
    user: IUser | null
}>

const initialState: UserState = {
    userList: [],
    user: null
}

/**
 * get users
 */
const userList = createReducer(initialState.userList)
    .handleAction(userActions.getUsers, (state, action) => {
        console.log(3333)
        return [...state]
    })

const user = createReducer(initialState.user)
    .handleAction(userActions.getUserById, (state, action) => {
        console.log(33334)
        return state
    })


export default combineReducers({
    userList,
    user
})

// export type userActions = ActionType<typeof userActions>;

// export default combineReducers<UserState, userActions>({
//     userList: (state = initialState.userList, action) => {
//         switch (action.type) {
//           case E_USER_ACTION_TYPES.GET_USERS:
//             return [...state];

//           default:
//             return state;
//         }
//       }
// })
