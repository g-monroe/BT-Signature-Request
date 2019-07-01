import * as React from 'react';
import { Layout } from 'antd';
import SignupPage from '../../Components/LogIn-SignUp/SignUpPage'

export interface ISignUpProps {
    
}
 
export interface ISignUpState {
    
}
 
class SignUp extends React.Component<ISignUpProps, ISignUpState> {
    render() { 
        return ( 
            <Layout>
                <SignupPage></SignupPage>
            </Layout>


         );
    }
}
 
export default SignUp;