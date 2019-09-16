import { StateType, ActionType } from 'typesafe-actions'
declare module 'store-types' {
    export type Store = StateType<typeof import('./index').default>
  
    export type RootState = StateType<ReturnType<typeof import('./root-reducer').default>>
  
    export type RootAction = ActionType<typeof import('./root-action').default>
  
    interface Types {
      RootAction: RootAction
    }
  }
