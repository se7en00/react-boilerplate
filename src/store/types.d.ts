import { StateType, ActionType } from 'typesafe-actions'
import dec from 'ramda/es/dec'

//umd
export as namespace Types

type Store = StateType<typeof import('./configureStore').default>
type RootAction = ActionType<typeof import('./root-action').default>
type RootState = StateType<ReturnType<typeof import('./root-reducer').default>>
