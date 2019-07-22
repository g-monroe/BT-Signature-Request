import * as React from 'react';
import { Layout, Modal, Button } from 'antd';
import UserType from '../../Util/Enums/UserTypes';
import LoginForm from '../../Components/LogIn-SignUp/LoginForm';
import { UserHandler, IUserHandler } from '../../Handlers/UserHandler';
import UserEntity from '../../Entities/UserEntity';
import { Link } from 'react-router-dom';
import * as routes from '../Routing/routes';
import ChooseUser from '../../Components/User/ChooseUser';
import ContextUserObject from '../../Components/WrapperComponents/ContextUserObject';

export interface ILoginProps { 
    handler?:IUserHandler
    userObject:ContextUserObject
}
 
export interface ILoginState {
    error?:string
}

class Login extends React.Component<ILoginProps, ILoginState> {
    state : ILoginState = {
        error:""
    }

    static defaultProps = {
        handler: new UserHandler()
    }

    login = async (user:UserEntity) =>{
        if(user.id < 0){
            this.setState({
                error:"You have entered either an incorrect username or password"
            })
        }else{
            await this.props.userObject.update({
                 id: user.id,
                 role: user.role,
                 name: user.name,
                 email: user.email,
                 type: UserType.REGISTERED
             });
            
        }
    }

    render() { 
        return ( 
                <Layout>
                    <Layout.Header>
                        
                    </Layout.Header>
                    <Layout.Content>
                        <div id = "SignUpContent">
                            <h1>Login Here</h1>
                            <LoginForm handler = {this.props.handler!} loginAttempt = {this.login}></LoginForm>
                            <div id = "errorText">
                                {this.state.error}
                            </div>
                        </div>
                            <Modal
                            title = "Login Successful"
                            visible={this.props.userObject.user.id! > 0}
                            closable = {false}
                            footer = {[
                
                                    <Button type = "primary">
                                        <Link to = {routes.REQUESTER._Dashboard.path}>
                                            Continue to Dashboard
                                        </Link>
                                    </Button>   
                            ]}
                        >
                            <div id = "SignUpModalContent">
                                {this.props.userObject.user.name}, welcome to the signature experiment!
                            </div>
                        </Modal>
                    </Layout.Content>
                </Layout>
         );
    }
}
 
export default Login;
