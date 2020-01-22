import { combineReducers } from "redux"
import { createReducer } from "typesafe-actions"
import { IUser } from "./userModel"
import { loadUsersAsync, searchUserByName } from "./actions"

/**
 * @description: 用户列表
 * @param {IUser[]} 成功加载用户列表
 * @return: state
 */
const userList = createReducer([] as IUser[]).handleAction(loadUsersAsync.success, (_, action) => {
    return action.payload
})

/**
 * @description: 搜索用户名
 * @param {string} searchName
 * @return: state
 */
const searchName = createReducer("").handleAction(searchUserByName, (_, action) => {
    const name = action.payload.name
    return name
})

const userReducer = combineReducers({
    userList,
    searchName
})

export default userReducer
export type IUsersState = ReturnType<typeof userReducer>
