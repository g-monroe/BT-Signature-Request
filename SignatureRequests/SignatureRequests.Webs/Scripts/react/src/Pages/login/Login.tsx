import * as React from 'react';
import { Layout } from 'antd';
import ChooseUser from '../../Components/User/ChooseUser';
import UserType from '../../Util/Enums/UserTypes';
import LoginForm from '../../Components/LogIn-SignUp/LoginForm';
import { UserHandler, IUserHandler } from '../../Handlers/UserHandler';
import UserEntity from '../../Entities/UserEntity';

export interface ILoginProps {
    userSelected: (user: UserType) => void
    handler?:IUserHandler
}
 
export interface ILoginState {
    error?:any
}
 
class Login extends React.Component<ILoginProps, ILoginState> {

    state : ILoginState = {
        error:<></>
    }
    static defaultProps = {
        handler: new UserHandler()
    }

    login = (user:UserEntity) =>{
        if(user.id < 0){
            this.setState({
                error:<p id = "errorText">You have entered either an incorrect username or password</p>
            })
        }else{
            
        }
        console.log(user)
    }

    render() { 
        return ( 
            <div>
                
                <Layout>
                    <Layout.Header style = {{background:'inherit'}}>
                
                    </Layout.Header>
                    <Layout.Content>
                        <div id = "SignUpContent">
                            <h1>Login Here</h1>
                            <LoginForm handler = {this.props.handler!} loginAttempt = {this.login}></LoginForm>
                            {this.state.error}
                        </div>
                        <h1 id = 'HeaderText'>Choose User Type</h1>
                        <ChooseUser changeUser={this.props.userSelected}></ChooseUser>
                    </Layout.Content>
                </Layout>
             
            </div>
         );
    }
}
 
export default Login;
