// import { createSelector } from 'reselect';

import { IUserState } from "./reducer"

export const getUsers = (state: IUserState) => state.userList
