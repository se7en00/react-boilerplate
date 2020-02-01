import { createAction } from "typesafe-actions"

/**
 * @description: 切换语言
 * @param {string}
 * @return: PayloadAC<string, string>
 */
export const toggleLanguage = createAction("@@locale/TOGGLE_LANGUAGE")<string>()
