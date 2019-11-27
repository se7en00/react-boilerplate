const prefix = "@@user"

export default {
    GET_USERS: `${prefix}/GET_USERS`,
    GET_USERS_BY_ID: `${prefix}/GET_USER_BY_ID`
} as const
