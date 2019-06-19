import * as React from 'react';

export interface ISignDocumentProps {
    
}
 
export interface ISignDocumentState {
    
}
 
class SignDocument extends React.Component<ISignDocumentProps, ISignDocumentState> {

    render() { 
        return ( 
            <h1  id = 'HeaderText'>Sign the Document here</h1>
         );
    }
}
 
export default SignDocument;