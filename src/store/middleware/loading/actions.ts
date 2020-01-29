import { createAction } from "typesafe-actions"

/**
 * @description: start loading indicator
 * @param {boolean}: show or hide
 * @return: PayloadAC<string, boolean>
 */
export const startLoading = createAction("@@RL/START_LOADING", () => true)()

/**
 * @description: stop loading indicator
 * @param {boolean}: show or hide
 * @return: PayloadAC<string, boolean>
 */
export const stopLoading = createAction("@@RL/LOADING", () => false)()
