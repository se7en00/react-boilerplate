import { Middleware, MiddlewareAPI, Dispatch } from "redux"
import { RootState, RootAction } from "typesafe-actions"
import { E_ASYNC_TYPES } from "../../BaseType"
import { startLoading, stopLoading } from "./actions"

// 缓存异步请步名
const loadingChain = new Set<string>()

interface ILoadingAction {
    type: string
    meta?: {
        // do not show the Loading indicator
        omitLoading: boolean
    }
}
/**
 * 每次发起异步请求，都要在每个epic, reduce里手动增加loading的逻辑很是无聊，
 * 也导致reduce不够范式。业务逻辑里增加了很多无关的UI逻辑。
 * 通过redux的middleware机制，我们可以去监听后缀带有REQUEST|SUCCESS|FALIED的异步action来改变Loading state
 * 如果有做局部的loading或者手动维护loading的话，可以在action中增加Omitloading为true
 * 如果是轮询性质的异步请求，这时Loading可能会有问题，因为在loadingChain记录的请求名只有一个
 */
const loadingMiddleWare: Middleware = (store: MiddlewareAPI<Dispatch<RootAction>, RootState>) => (next: Dispatch) => (
    action: ILoadingAction
) => {
    const { type, meta } = action
    const isOmitLoading = meta ? meta.omitLoading : false

    const regexp = `(.*)_(${Object.keys(E_ASYNC_TYPES).join("|")})$`
    const matches = new RegExp(regexp, "g").exec(type)

    // 判断是否是异步请求类型
    if (!matches || isOmitLoading) return next(action)

    const [, requestName, requestState] = matches
    const { isLoading } = store.getState().loading

    switch (requestState) {
        case E_ASYNC_TYPES.REQUEST:
            loadingChain.add(requestName)

            // 首个请求 显示loading
            if (!isLoading) {
                store.dispatch(startLoading())
            }
            break
        case E_ASYNC_TYPES.SUCCEED:
        case E_ASYNC_TYPES.FALIED:
        case E_ASYNC_TYPES.CANCEL:
            if (loadingChain.has(requestName)) {
                loadingChain.delete(requestName)

                //hide loading
                if (!loadingChain.size) {
                    store.dispatch(stopLoading())
                }
            }
            break
    }

    return next(action)
}

export default loadingMiddleWare
