const prefix = "@@user"

export default {
    GET_USERS: `${prefix}/GET_USERS`,
    GET_USERS_BY_ID: `${prefix}/GET_USER_BY_ID`
} as const

export const asyncTypes = (m: string): [string, string, string] => {
    return [`${prefix}/API_${m}REQUEST`, `${prefix}/API_${m}SUCCEED`, `${prefix}/API_${m}FALIED`]
}
