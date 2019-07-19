
import * as React from 'react'

export interface ILoginProps {

}



class Login extends React.Component<ILoginProps> {

    goLogin(){
		alert("开始登录")
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



export default Login;