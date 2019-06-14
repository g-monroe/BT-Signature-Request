import * as React from 'react';


export interface IErrorProps {
    
}
 
export interface IErrorState {
    
}
 
class Error extends React.Component<IErrorProps, IErrorState> {
    state : IErrorState= {   }
    render() { 
        return ( 
            <h3>You have found an issue</h3>
         );
    }
}
 
export default Error;