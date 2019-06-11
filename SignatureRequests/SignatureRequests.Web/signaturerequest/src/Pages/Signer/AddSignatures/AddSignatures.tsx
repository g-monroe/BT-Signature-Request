import * as React from 'react';

export interface IAddSignatuesProps {
    
}
 
export interface IAddSignatuesState {
    
}
 
class AddSignatues extends React.Component<IAddSignatuesProps, IAddSignatuesState> {
    state : IAddSignatuesState= {   }
    render() { 
        return ( 
            <h3>Add signatures to your profile</h3>
         );
    }
}
 
export default AddSignatues;