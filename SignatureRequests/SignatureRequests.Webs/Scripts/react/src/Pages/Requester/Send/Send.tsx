import * as React from 'react';
import SendForm from '../../../Components/Form/SendForm';

export interface ISendProps {
    
}
 
export interface ISendState {
    
}
 
class Send extends React.Component<ISendProps, ISendState> {

    render() { 
        return (  
            <>
            <h1 id = 'HeaderText'>Send a Form</h1>
            <SendForm ></SendForm>
            </>
        );
    }
}
 
export default Send;