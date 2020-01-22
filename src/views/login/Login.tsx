import * as React from "react"
import { RouteComponentProps } from "react-router-dom"
// import withErrorHandler from '@/components/withErrorHandler'
// import { requiresUser } from '@/components/test2'
import { connect } from "react-redux"
import { RootState } from "typesafe-actions"
import { usersActions } from "@/store/user"

const mapStateToProps = (state: RootState) => {
    return {
        router: state.router,
        userList: state.user.userList
    }
}

const dispatchProps = {
    loadUsersAsync: usersActions.loadUsersAsync.request,
    searchByUserName: usersActions.searchUserByName
}

type unionTypes = Partial<RouteComponentProps> & ReturnType<typeof mapStateToProps> & typeof dispatchProps
interface IProps extends unionTypes {
    test?: string
}
// @withErrorHandler
// @withRouter
@connect(mapStateToProps, dispatchProps)
class Login extends React.Component<IProps> {
    private goLogin = () => {
        alert("开始登录")
    }

    componentDidMount() {
        this.props.loadUsersAsync()
    }

    search = (name: string) => {
        this.props.searchByUserName({ name })
    }

    render() {
        return (
            <div>
                <h3>登录页面</h3>
                <div>
                    用户名
                    <input type="text" />
                </div>
                <div>
                    密码
                    <input type="text" />
                </div>
                <div>
                    <button onClick={this.goLogin}>登录</button>
                </div>
            </div>
        )
    }
}

export default Login
