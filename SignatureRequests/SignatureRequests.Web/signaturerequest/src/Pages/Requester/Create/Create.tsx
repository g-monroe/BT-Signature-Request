import * as React from 'react';

export interface ICreateProps {
    
}
 
export interface ICreateState {
    
}
 
class Create extends React.Component<ICreateProps, ICreateState> {
    state : ICreateState = {  }
    render() { 
        return ( 
            <h3>Create a Form</h3>

         );
    }
}
 
export default Create;