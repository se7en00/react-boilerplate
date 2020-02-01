import React, { Suspense, lazy } from "react"
import { Route, Switch } from "react-router"
import { hot } from "react-hot-loader/root"
import { IntlProvider } from "react-intl" /* react-intl imports */
import AuthorizedRoute from "@/routes/AuthorizedRoute"
import msgs from "@/translations"
import { useSelector } from "@/utils"

const Login = lazy(() => import(/* webpackChunkName: "home" */ "@/views/login/LoginHook"))

const App = () => {
    const locale = useSelector(state => state.locale.language)
    const messages = (msgs as Record<string, object>)[locale] as Record<string, string>
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <IntlProvider locale={locale} messages={messages}>
                <Switch>
                    {/* <Route exact path="/" render={() => (<div>Match</div>)} /> */}
                    <AuthorizedRoute path="/" component={Login} isAuthenticated={true} />
                    <Route render={() => <div>Miss</div>} />
                </Switch>
            </IntlProvider>
        </Suspense>
    )
}

export default hot(App)
