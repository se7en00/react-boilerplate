import {} from "typesafe-actions"

declare module "typesafe-actions" {
    export type Utils = typeof import("./index").default
}
