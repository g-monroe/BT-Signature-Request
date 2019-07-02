import * as React from 'react';
import { Layout, Modal, Button } from 'antd';
import ChooseUser from '../../Components/User/ChooseUser';
import UserType from '../../Util/Enums/UserTypes';
import LoginForm from '../../Components/LogIn-SignUp/LoginForm';
import { UserHandler, IUserHandler } from '../../Handlers/UserHandler';
import UserEntity from '../../Entities/UserEntity';
import { Link } from 'react-router-dom';
import * as routes from '../Routing/routes';
import MainPageUser from '../../Entities/MainPageUser';


export interface ILoginProps {
    userSelected: (user: UserType) => void
    handler?:IUserHandler
    updateUser: (data:MainPageUser)=> void
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
            console.log("Entered else statement");
            await this.props.updateUser({
                 id: user.id,
                 role: user.role,
                 name: user.name,
                 email: user.email,
                 type: UserType.REGISTERED
             });
            this.setState({
                visible:true
            });
            console.log(this.state.visible);
        }
        console.log(user)
    }

    render() { 
        return ( 
                <Layout>
                    {console.log("the fuck")}
                    <Layout.Header style = {{background:'inherit'}}>
                
                    </Layout.Header>
                    <Layout.Content>
                        <div id = "SignUpContent">
                            <h1>Login Here</h1>
                            {console.log("Handler", this.props.handler)}
                            <LoginForm handler = {this.props.handler!} loginAttempt = {this.login}></LoginForm>
                            {console.log("MADE IT", this.state.visible)}
                            {this.state.error}
                        </div>
                        <h1 id = 'HeaderText'>Choose User Type</h1>
                        {/* <ChooseUser changeUser={this.props.userSelected}></ChooseUser> */}
                        {console.log("TEST",this.state.visible)}
                        
                          
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
                        
                        {console.log("Maybe")}
                    </Layout.Content>
                </Layout>
         );
    }
}
 
export default Login;
