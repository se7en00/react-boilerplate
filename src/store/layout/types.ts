export type ThemeColors = "light" | "dark"

// Use const enums for better autocompletion of action type name
export enum LayoutActionTypes {
    SET_THEME = "@@layout/SET_THEME"
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface ILayoutState {
    readonly theme: ThemeColors
}
