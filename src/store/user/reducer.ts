import { combineReducers } from "redux"
import { createReducer, ActionType } from "typesafe-actions"
import produce, { Draft } from "immer"
import { IUser } from "./userModel"
import { loadUsersAsync, searchUserByName } from "./actions"

/**
 * @description: 用户列表
 * @param {IUser[]} 成功加载用户列表
 * @return: state
 */
// prettier-ignore
const userList = createReducer([] as IUser[])
    // 写法一
    // .handleAction(loadUsersAsync.success, (state, action) => {
    //     return produce(state, draft => {
    //         return draft
    //     })
    // })
    .handleAction(loadUsersAsync.success, produce((draft: Draft<IUser[]>, action: ActionType<typeof loadUsersAsync.success>) => action.payload))

/**
 * @description: 搜索用户名
 * @param {string} searchName
 * @return: state
 */
// prettier-ignore
const searchName = createReducer("")
    .handleAction(searchUserByName, produce((draft: Draft<string>, action: ActionType<typeof searchUserByName>) => {
        draft = action.payload.name
        return draft
    }))

const userReducer = combineReducers({
    userList,
    searchName
})

export default userReducer
export type IUsersState = ReturnType<typeof userReducer>
