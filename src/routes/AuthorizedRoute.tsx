import * as React from "react"
import { Route, RouteProps } from "react-router"
import { Redirect } from "react-router-dom"

export interface IAuthorizedRouteProps extends RouteProps {
    isAuthenticated: boolean
    component: React.ComponentType<RouteProps>
}

const AuthorizedRoute: React.SFC<IAuthorizedRouteProps> = ({
    component: Component,
    isAuthenticated,
    ...rest
}: {
    component: React.ComponentType<RouteProps>
    isAuthenticated: boolean
}) => <Route {...rest} render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)} />

export default AuthorizedRoute
