// import { createSelector } from 'reselect';

import { UserState } from "./reducer"

export const getUsers = (state: UserState) => state.userList
