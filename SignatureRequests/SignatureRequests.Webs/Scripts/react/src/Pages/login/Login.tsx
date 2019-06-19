import * as React from 'react';
import { Layout } from 'antd';
import ChooseUser from '../../Components/User/ChooseUser';
import UserType from '../../Util/Enums/UserTypes';

export interface ILoginProps {
    userSelected: (user: UserType) => void
}
 
export interface ILoginState {
    
}
 
class Login extends React.Component<ILoginProps, ILoginState> {


    render() { 
        return ( 
            <div>
                <h1 id = 'HeaderText'>Choose User Type-fvda</h1>
                <Layout>
                    <ChooseUser changeUser = {this.props.userSelected}></ChooseUser>
   
                
                </Layout>
            </div>
         );
    }
}
 
export default Login;