import React, { useEffect, useCallback } from "react"
import { Dispatch } from "redux"
import { useDispatch, shallowEqual } from "react-redux"
import { useIntl } from "react-intl"
import { useSelector } from "@/utils"
import { usersActions } from "@/store/user"
import { localeActions } from "@/store/locale"
import style from "./Login.module.scss"

interface ILoginProps {
    test?: string
}
const Login: React.FC<ILoginProps> = () => {
    const { isloading, language } = useSelector(
        state => ({
            isloading: state.loading.isLoading,
            userList: state.user.userList,
            language: state.locale.language
        }),
        shallowEqual
    )
    const { formatMessage: f } = useIntl()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(usersActions.loadUsersAsync.request())
    }, [dispatch])

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(localeActions.toggleLanguage(e.target.value))
    }

    return (
        <div>
            <h3>登录页面</h3>
            <div>
                用户名 {navigator.language}
                <input type="text" />
            </div>
            <div>
                {f({ id: "Login.Password.Label" })}
                <input type="text" />
            </div>
            <div>
                <button className={style.btn}>登录</button>
                <select onChange={handleSelect} defaultValue={language}>
                    {["en", "zh"].map(l => (
                        <option key={l}>{l}</option>
                    ))}
                </select>
                {isloading && <div>加载中</div>}
            </div>
        </div>
    )
}

export default Login
