import * as React from 'react';
import SignatureBox from './SignatureBox';
import ImageViewer from './ImageViewer';

export interface ISignaturePageProps {
    
}
 
export interface ISignaturePageState {
    
}
 
class SignaturePage extends React.Component<ISignaturePageProps, ISignaturePageState> {

    render() { 
        return ( 
            <div id = 'signaturePage'>
            <div id = 'imageContainer'>
                <ImageViewer title = "Current Signature"></ImageViewer>
                <ImageViewer title = "Current Initials"></ImageViewer>
            </div>
                <SignatureBox></SignatureBox>
            </div>
         );
    }
}
 
export default SignaturePage;