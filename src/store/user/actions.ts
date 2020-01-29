import { createAsyncAction, createAction } from "typesafe-actions"
import TYPES, { getAsyncActionConstants } from "./types"
import { ISearchParam } from "./userModel"
import { IUser } from "./userModel"

/**
 * @description: 获取用户列表
 * @param {undefined}
 * @return: EmptyAC<string>
 */
export const loadUsersAsync = createAsyncAction(...getAsyncActionConstants("user"))<undefined, IUser[], Error>()

/**
 * @description: 搜索用户
 * @param {string}
 * @return: PayloadAC<string, string>
 */
export const searchUserByName = createAction(TYPES.GET_USERS)<ISearchParam>()
// export const searchUserByName = createAction(TYPES.GET_USERS, (name: string) => ({ name }))<ISearchParam>()

/* eslint-disable-next-line */
// export const getUserById = (userId: number) => action(TYPES.GET_USERS_BY_ID, {})
