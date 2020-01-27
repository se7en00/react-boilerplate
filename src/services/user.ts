/*
 * @Date: 2020-01-18 09:43:20
 * @LastEditors  : seven
 * @LastEditTime : 2020-01-27 16:14:09
 */
import { http } from "@/utils"
import { IUser } from "@/store/user/userModel"

export function getUseList(name?: string) {
    if (!name) {
        return http.get<IUser[]>("/mock/5dabd3af27ce50ab7a7ee6ac/reactMock/userList", {
            params: name
        })
    } else {
        return http.get<IUser[]>("/mock/5dabd3af27ce50ab7a7ee6ac/reactMock/search", {
            params: name
        })
    }
}
