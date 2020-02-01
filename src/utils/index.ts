import logger from "./logger"
import cookies from "./utils.cookies"
import http from "./utils.axios"
import { useSelector } from "./utils.redux"

const utils = {
    logger,
    cookies,
    http
}

export { http, useSelector }
export default utils
