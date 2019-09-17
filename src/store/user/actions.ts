import { createStandardAction, action } from 'typesafe-actions'
import TYPES from './types'
// import { IUser } from './user-types'


export const getUsers = createStandardAction(TYPES.GET_USERS)<undefined>()

export const getUserById = (userId: number) => action(TYPES.GET_USERS_BY_ID, {})

