import { createStandardAction, action } from 'typesafe-actions'
import { E_USER_ACTION_TYPES } from './types'
import { UserList } from "./models"


export const getUsers = () => action(E_USER_ACTION_TYPES.GET_USERS)
