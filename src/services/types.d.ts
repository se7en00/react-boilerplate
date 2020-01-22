import {} from "typesafe-actions"

interface IRequest<T> {
    method?: "GET" | "POST" | "PUT"
    data: T
}

declare module "typesafe-actions" {
    export type IServices = typeof import("./index").default
}
