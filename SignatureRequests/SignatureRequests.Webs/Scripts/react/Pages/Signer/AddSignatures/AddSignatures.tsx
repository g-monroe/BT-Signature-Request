import * as React from 'react';

export interface IAddSignatuesProps {
    
}
 
export interface IAddSignatuesState {
    
}
 
class AddSignatues extends React.Component<IAddSignatuesProps, IAddSignatuesState> {

    render() { 
        return ( 
            <h1  id = 'HeaderText'>Add signatures to your profile</h1>
         );
    }
}
 
export default AddSignatues;