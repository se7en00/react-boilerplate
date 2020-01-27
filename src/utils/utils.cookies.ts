import Cookies, { CookieAttributes } from "js-cookie"

interface ICookies<T extends object = object> {
    /**
     * Create a cookie
     */
    set(name: string, value: string | T, options?: CookieAttributes): void

    /**
     * Read cookie
     */
    get(name: string): string | undefined

    /**
     * Read all available cookies
     */
    getAll(): { [key: string]: string }

    /**
     * Delete cookie
     */
    remove(name: string, options?: CookieAttributes): void
}

/* eslint-disable-next-line */
const cookies: ICookies = {} as any
const cookiesPrefix = "portal"

/**
 * @description 存储 cookie 值
 * @param {string} name cookie name
 * @param {string} value cookie value
 * @param {CookieAttributes} cookieSetting cookie setting
 */
cookies.set = (name = "default", value = "", cookieSetting) => {
    const currentCookieSetting = {
        expires: 1
    }
    Cookies.set(`${cookiesPrefix}-${name}`, value, { ...currentCookieSetting, ...cookieSetting })
}

/**
 * @description 拿到 cookie 值
 * @param {string} name cookie name
 */
cookies.get = (name = "default") => {
    return Cookies.get(`${cookiesPrefix}-${name}`)
}

/**
 * @description 拿到 cookie 全部的值
 */
cookies.getAll = () => {
    return Cookies.get()
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
cookies.remove = (name = "default") => {
    return Cookies.remove(`${cookiesPrefix}-${name}`)
}

export default cookies
