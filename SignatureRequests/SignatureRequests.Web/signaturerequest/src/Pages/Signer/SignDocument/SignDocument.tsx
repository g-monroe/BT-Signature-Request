import * as React from 'react';

export interface ISignDocumentProps {
    
}
 
export interface ISignDocumentState {
    
}
 
class SignDocument extends React.Component<ISignDocumentProps, ISignDocumentState> {
    state : ISignDocumentState= {   }
    render() { 
        return ( 
            <h3>Sign the Document here</h3>
         );
    }
}
 
export default SignDocument;