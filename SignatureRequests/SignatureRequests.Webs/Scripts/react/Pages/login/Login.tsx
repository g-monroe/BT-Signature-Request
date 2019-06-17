import * as React from 'react';
import { Layout } from '../../node_modules/antd/dist/antd';
import ChooseUser from '../../Components/User/ChooseUser';
import UserType from '../../Util/Enums/UserTypes';

export interface ILoginProps {
    userSelected: (user: UserType) => void
}
 
export interface ILoginState {
    
}
 
class Login extends React.Component<ILoginProps, ILoginState> {
    state = {  }

    render() { 
        return ( 
            <div>
                <h1 id = 'HeaderText'>Choose User Type</h1>
                <Layout>
                    <ChooseUser changeUser = {this.props.userSelected}></ChooseUser>
   
                
                </Layout>
            </div>
         );
    }
}
 
export default Login;