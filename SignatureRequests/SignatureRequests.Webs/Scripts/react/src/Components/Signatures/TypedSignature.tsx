import * as React from 'react';
import './DrawTest.css'


export interface ITypedSignatureProps {
    
}
 
export interface ITypedSignatureState {
    text:String
    
}
 
class TypedSignature extends React.Component<ITypedSignatureProps, ITypedSignatureState> {
    state = {  
        text:"Sign Here"
     }

    onChange = (str:String) =>{
        this.setState({
            text:str
        })
    }


    render() { 
        return ( 
            <div id = 'TypedSignature'>
                <input id = "text"></input>
            </div>
         );
    }
}
 
export default TypedSignature;