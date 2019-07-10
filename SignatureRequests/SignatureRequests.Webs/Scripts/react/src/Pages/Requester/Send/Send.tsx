import * as React from 'react';
import SendForm from '../../../Components/Form/SendForm';
import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';

export interface ISendProps {
    UserObject:ContextUserObject
}
 
export interface ISendState {
    
}
 
class Send extends React.Component<ISendProps, ISendState> {

    render() { 
        return (  
            <>
            <h1 id = 'HeaderText'>Send a Form</h1>
            <SendForm currentUser={this.props.UserObject.user} >
            </SendForm>
            </>
        );
    }
}
 
export default Send;