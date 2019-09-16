
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
// import withErrorHandler from '@/components/withErrorHandler'
// import { requiresUser } from '@/components/test2'
import { connect } from 'react-redux'
import { RootState } from 'store-types'
import { usersActions } from '@/store/user'

export interface ILoginProps extends Partial<RouteComponentProps> {
    test?: string
}

const mapStateToProps = (state: RootState) => {
    return {
        router: state.router
    }
}

const dispatchProps = {
    getUsers: usersActions.getUsers,
}

type Props = ReturnType<typeof mapStateToProps> & typeof dispatchProps

// @withErrorHandler

@connect(mapStateToProps, dispatchProps)
class Login extends React.Component<ILoginProps & Props> {

    private goLogin = () => {
        alert("开始登录")
    }

    componentDidMount() {
        this.props.getUsers()
    }

    render() {
        return <div>
            <h3>登录页面</h3>
            <div>
                用户名<input type="text" />
            </div>
            <div>
                密码<input type="text" />
            </div>
            <div>
                <button onClick={this.goLogin}>登录</button>
            </div>
        </div>;
    }
}



export default Login