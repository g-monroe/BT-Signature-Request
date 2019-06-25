import * as React from 'react';
import SendForm from '../../../Components/Form/SendForm';
import UserEntity from '../../../Entities/UserEntity';

export interface ISendProps {
    
}
 
export interface ISendState {
    
}
 
class Send extends React.Component<ISendProps, ISendState> {

    render() { 
        return (  
            <>
            <h1 id = 'HeaderText'>Send a Form</h1>
            <SendForm currentUser={new UserEntity ({
      Id: 1,
      Role: "role",
      Name: "name",
      Email: "email",
      Password: "password"
    })} ></SendForm>
            </>
        );
    }
}
 
export default Send;