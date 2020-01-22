/*
 * @Date: 2020-01-18 09:43:20
 * @LastEditors  : seven
 * @LastEditTime : 2020-01-22 15:01:26
 */
import axios from "axios"
import { IUser } from "@/store/user/userModel"

export function getUseList(name?: string) {
    if (!name) {
        return axios.get<IUser[]>("http://localhost:7300/mock/5dabd3af27ce50ab7a7ee6ac/reactMock/userList", {
            params: name
        })
    } else {
        return axios.get<IUser[]>("http://localhost:7300/mock/5dabd3af27ce50ab7a7ee6ac/reactMock/search", {
            params: name
        })
    }
}
