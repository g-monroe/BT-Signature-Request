import * as React from 'react';
import SignatureBox from './SignatureBox';

export interface ISignaturePageProps {
    
}
 
export interface ISignaturePageState {
    
}
 
class SignaturePage extends React.Component<ISignaturePageProps, ISignaturePageState> {

    render() { 
        return ( 
            <div id = 'signaturePage'>
                <div id='imageContainer'>
                    <h1>Current Signature</h1>
                    <h1>Current Initials</h1>
            </div>
                <SignatureBox></SignatureBox>
            </div>
         );
    }
}
 
export default SignaturePage;