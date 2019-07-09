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
    UserObject:ContextUserObject
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
            await this.props.UserObject.update({
                 id: user.id,
                 role: user.role,
                 name: user.name,
                 email: user.email,
                 type: UserType.REGISTERED
             });
            
        }
    }

    chooseUserButton = (user: UserType) =>{
        this.props.UserObject.update({
            id: 1,
            role: "Role here",
            name: "Max Min",
            email: "MM@gmail.com",
            type: user
        });
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
                        <h1 id = 'HeaderText'>Display Testing User Only</h1>
                        <ChooseUser changeUser={this.chooseUserButton}></ChooseUser>
                            <Modal
                            title = "Login Successful"
                            visible={this.props.UserObject.user.id! > 0}
                            closable = {false}
                            footer = {[
                
                                    <Button type = "primary">
                                        <Link to = {routes.REQUESTER._Dashboard.link}>
                                            Continue to Dashboard
                                        </Link>
                                    </Button>   
                            ]}
                        >
                            <div id = "SignUpModalContent">
                                {this.props.UserObject.user.name}, welcome to the signature experiment!
                            </div>
                        </Modal>
                    </Layout.Content>
                </Layout>
         );
    }
}
 
export default Login;
