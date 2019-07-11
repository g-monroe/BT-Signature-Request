import * as React from 'react';
import SendForm from '../../../Components/Form/SendForm';
import UserEntity from '../../../Entities/UserEntity';
import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';

export interface ISendProps {
   userObject: ContextUserObject;
}
 
export interface ISendState {
    
}
 
class Send extends React.Component<ISendProps, ISendState> {

    render() { 
        return (  
            <>
            <h1 id = 'HeaderText'>Send a Form</h1>
            <SendForm
                userObject={this.props.userObject}
            >
            </SendForm>
            </>
        );
    }
}
 
export default Send;