import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from '@/store/configureStore'
import 'scss/global.scss'

const store = configureStore()
const render = (Component: React.FC) => {
    ReactDOM.render(
        <Provider store={store}>
            <Component />
        </Provider>
        ,
        document.getElementById('root'))
}

render(App)

