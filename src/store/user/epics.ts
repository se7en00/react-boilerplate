import { Epic } from "redux-observable"
import { Observable, from, of } from "rxjs"
import { filter, map, distinctUntilChanged, combineLatest, switchMap, catchError, timeout } from "rxjs/operators"
import { RootAction, RootState, IServices, isActionOf } from "typesafe-actions"
import { AxiosError } from "axios"
import { loadUsersAsync } from "./actions"
import { ISearchParam } from "./userModel"

/**
 *
 * @description: 加载用户列表
 * @param {*} action$
 * @param {*} state$
 * @param {*} utils
 * @returns
 */

export const loadUsers: Epic<RootAction, RootAction, RootState, IServices> = (action$, state$, { api }) => {
    //订阅state, user -> searchName的变化
    const params$: Observable<ISearchParam> = state$.pipe(
        map(({ user }) => {
            return {
                name: user.searchName
            }
        }),
        distinctUntilChanged(_.isEqual)
    )

    return action$.pipe(
        filter(isActionOf([loadUsersAsync.request])),
        //通过combineLatest， 响应searchname的变化并重新去加载用户列表
        combineLatest(params$, (_, params) => params),
        switchMap(params => {
            return from(api.user.getUseList(params.name)).pipe(
                // 请求过期时间为2分钟
                timeout(20000),
                map(data => loadUsersAsync.success(data.data)),
                catchError((error: AxiosError) => of(loadUsersAsync.failure(error)))
            )
        })
    )
}
