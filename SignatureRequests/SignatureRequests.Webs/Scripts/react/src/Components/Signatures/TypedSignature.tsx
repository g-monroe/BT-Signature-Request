import * as React from 'react';
import './DrawTest.css'
import {Typography} from 'antd';

const {Paragraph} = Typography

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
                {/* <Paragraph editable = {{onChange: (str) => this.onChange(str)}}>{this.state.text}</Paragraph> */}
            </div>
         );
    }
}
 
export default TypedSignature;