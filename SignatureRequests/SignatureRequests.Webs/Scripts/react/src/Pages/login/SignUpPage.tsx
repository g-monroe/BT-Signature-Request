import * as React from 'react';
import Signup from '../../Components/LogIn-SignUp/SignUpForm';
import { Layout, Modal, Button } from 'antd';
import {UserHandler, IUserHandler} from '../../Handlers/UserHandler';
import { Link } from 'react-router-dom';
import * as routes from '../Routing/routes';

export interface ISignupPageProps {
    handler?:IUserHandler
}
 
export interface ISignupPageState {
    username?:string
    visible:boolean
}
 
class SignupPage extends React.Component<ISignupPageProps, ISignupPageState> {
    
    state : ISignupPageState = {
        visible:false
    }
    
    static defaultProps = {
        handler: new UserHandler()
    }

    signedup = (name:string) =>{
        this.setState({
            username:name,
            visible:true
        })
    }

    render() { 
        return ( 
            <>
        <Layout>
            <Layout.Header style = {{background:'inherit'}}>
                
            </Layout.Header>
            <Layout.Content>
                <div id = "SignUpContent">
                    <h1>Signup Here</h1>
                    <Signup handler = {this.props.handler!}signUp = {this.signedup}></Signup>
                </div>
            </Layout.Content>
        </Layout>


        <Modal
            title = "Signup Successful"
            visible = {this.state.visible}
            closable = {false}
            footer = {[
                
                    <Button type = "primary">
                        <Link to = {routes.COMMON._Login.path}>
                            Login
                        </Link>
                    </Button>   
                
            ]}
        >
        <div id = "SignUpModalContent">
            Hello
        </div>
        </Modal>
        </>
         );
    }
}
 
export default SignupPage;