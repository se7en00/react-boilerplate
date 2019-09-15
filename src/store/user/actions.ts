import { action } from 'typesafe-actions'
import {E_USER_ACTION_TYPES} from './types'

export const getUsers = () => action(E_USER_ACTION_TYPES.GET_USERS)
