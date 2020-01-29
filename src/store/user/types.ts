import BaseType from "../BaseType"

class UserTypes extends BaseType {
    private moduleName = "user"

    public getPrefix = () => {
        return `@@${this.moduleName}`
    }

    public getSyncConstants = () => ({
        GET_USERS: `${this.getPrefix()}/GET_USERS`,
        GET_USERS_BY_ID: `${this.getPrefix()}/GET_USER_BY_ID`
    })
}

const Types = new UserTypes()
const getAsyncActionConstants = Types.getAsyncActionConstants
const TYPES = Types.getSyncConstants()

export { getAsyncActionConstants, TYPES as default }
