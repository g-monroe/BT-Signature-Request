import * as React from 'react';
import { Layout, Modal, Button } from 'antd';
import UserType from '../../Util/Enums/UserTypes';
import LoginForm from '../../Components/LogIn-SignUp/LoginForm';
import { UserHandler, IUserHandler } from '../../Handlers/UserHandler';
import UserEntity from '../../Entities/UserEntity';
import { Link } from 'react-router-dom';
import * as routes from '../Routing/routes';
import MainPageUser from '../../Entities/MainPageUser';
import ChooseUser from '../../Components/User/ChooseUser';
import ContextUserObject from '../../Components/WrapperComponents/ContextUserObject';


export interface ILoginProps { 
    handler?:IUserHandler
    UserObject:ContextUserObject
}
 
export interface ILoginState {
    error?:any,
    visible:boolean
}



class Login extends React.Component<ILoginProps, ILoginState> {
    state : ILoginState = {
        error:<></>,
        visible:false
    }


    static defaultProps = {
        handler: new UserHandler()
    }

    login = async (user:UserEntity) =>{
        if(user.id < 0){
            this.setState({
                error:<p id = "errorText">You have entered either an incorrect username or password</p>
            })
        }else{
            await this.props.UserObject.update({
                 id: user.id,
                 role: user.role,
                 name: user.name,
                 email: user.email,
                 type: UserType.REGISTERED
             });
             console.log(this.state.visible, "In log in")
            this.setState({
                visible:true
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
                    <Layout.Header style = {{background:'inherit'}}>
                
                    </Layout.Header>
                    <Layout.Content>
                        <div id = "SignUpContent">
                            <h1>Login Here</h1>
                            <LoginForm handler = {this.props.handler!} loginAttempt = {this.login}></LoginForm>
                            {this.state.error}
                        </div>
                        <h1 id = 'HeaderText'>Choose User Type</h1>
                        <ChooseUser changeUser={this.chooseUserButton}></ChooseUser>
                        
                          {console.log(this.state.visible, "In Render")}
                            <Modal
                            title = "Login Successful"
                            visible={this.state.visible}
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
                                Welcome to the signature experiment!
                            </div>
                        </Modal>
                    </Layout.Content>
                </Layout>
         );
    }
}
 
export default Login;
