import * as React from 'react';
import Signup from './SignUpForm';
import { Layout } from 'antd';
import {UserHandler, IUserHandler} from '../../Handlers/UserHandler';

export interface ISignupPageProps {
    handler?:IUserHandler
}
 
export interface ISignupPageState {
    
}
 
class SignupPage extends React.Component<ISignupPageProps, ISignupPageState> {
    static defaultProps = {
        handler: new UserHandler()
    }
    render() { 
        return ( 
        <Layout>
            <Layout.Header style = {{background:'inherit'}}>
                
            </Layout.Header>
            <Layout.Content>
                <div id = "SignUpContent">
                    <h1>Signup Here</h1>
                    <Signup handler = {this.props.handler!}></Signup>
                </div>
            </Layout.Content>
        </Layout>
            
        
         );
    }
}
 
export default SignupPage;