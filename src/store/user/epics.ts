import { Epic } from "redux-observable"
import { Observable, from } from "rxjs"
import { filter, map, distinctUntilChanged, combineLatest, switchMap } from "rxjs/operators"
import { RootAction, RootState, IServices, isActionOf } from "typesafe-actions"
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

export const logAddAction: Epic<RootAction, RootAction, RootState, IServices> = (action$, state$, { api }) => {
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
            return from(api.user.getUseList(params.name)).pipe(map(data => loadUsersAsync.success(data.data)))
        })
    )
}
