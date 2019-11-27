import React, { Suspense, lazy } from "react"
import { Route, Switch } from "react-router"
import { hot } from "react-hot-loader/root"
import AuthorizedRoute from "@/routes/AuthorizedRoute"

const Login = lazy(() => import(/* webpackChunkName: "home" */ "@/views/login/Login"))

const App = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                {/* <Route exact path="/" render={() => (<div>Match</div>)} /> */}
                <AuthorizedRoute path="/" component={Login} isAuthenticated={true} />
                <Route render={() => <div>Miss</div>} />
            </Switch>
        </Suspense>
    )
}

export default hot(App)
