import { RootState } from "typesafe-actions"
import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux"

/**
 * @description: 重新定义selector的方法中state类型，这样我们在使用useSelector hook时，不用每次多要去定义state类型
 */
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
