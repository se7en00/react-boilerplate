import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router'
import { hot } from 'react-hot-loader/root'
import AuthorizedRoute from '@/routes/AuthorizedRoute'

const Login = lazy(() => import(/* webpackChunkName: "home" */'@/views/login/Login'))
const Drag = lazy(() => import(/* webpackChunkName: "SimpleDrag" */'@/views/rxjs/drag'))
const Scroll = lazy(() => import(/* webpackChunkName: "SimpleDrag" */'@/views/rxjs/scroll'))

const App = () => {
    return <Suspense fallback={<div>Page Loading...</div>}>
        <Switch>
            <Route path="/drag" component={Drag} />
            <Route path="/scroll" component={Scroll} />
            {/* <Route exact path="/" render={() => (<div>Match</div>)} /> */}
            {/* <AuthorizedRoute path="/" component={Login} isAuthenticated={true} /> */}
            <Route render={() => (<div>Miss</div>)} />

        </Switch>
    </Suspense>

}

export default hot(App)
