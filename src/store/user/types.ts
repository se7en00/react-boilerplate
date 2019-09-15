export enum E_USER_ACTION_TYPES {
    GET_USERS = '@@user/GET_USERS'
}

export interface IUserState {
    readonly userList: []
}