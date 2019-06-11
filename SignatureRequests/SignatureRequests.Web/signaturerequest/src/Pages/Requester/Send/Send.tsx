import * as React from 'react';

export interface ISendProps {
    
}
 
export interface ISendState {
    
}
 
class Send extends React.Component<ISendProps, ISendState> {
    state : ISendState = {   }
    render() { 
        return (  
            <h3>Send a Form</h3>
        );
    }
}
 
export default Send;