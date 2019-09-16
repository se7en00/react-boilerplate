import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore, { history } from '@/store'
import 'scss/global.scss'

const store = configureStore
const render = (Component: React.FC) => {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Component />
            </ConnectedRouter>

        </Provider>
        ,
        document.getElementById('root'))
}

render(App)

