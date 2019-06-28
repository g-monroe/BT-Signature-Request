import * as React from 'react';

export interface ISignUpProps {
    
}
 
export interface ISignUpState {
    
}
 
class SignUp extends React.Component<ISignUpProps, ISignUpState> {
    render() { 
        return ( 
            <h1 id = 'HeaderText'>Sign Up</h1>
         );
    }
}
 
export default SignUp;