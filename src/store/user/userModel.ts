/*
 * @Date: 2020-01-18 10:35:57
 * @LastEditors  : seven
 * @LastEditTime : 2020-01-18 22:14:07
 */
export interface IUser {
    id: string
    name: string
    phone: number
    url: string
    email: string
    address?: string
}

export interface ISearchParam {
    name: string
}
