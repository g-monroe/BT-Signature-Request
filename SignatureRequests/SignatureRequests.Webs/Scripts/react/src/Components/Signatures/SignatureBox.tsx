import * as React from 'react';
import DrawCanvas from './DrawCanvas';
import {manualInputTypes} from '../../Util/Enums/SelectTypes';
import {inputMethods} from '../../Util/Enums/SelectTypes';
import ButtonSelect from './ButtonSelect';
import TypedSignature from './TypedSignature';
import { Button, message } from 'antd';
import html2canvas from 'html2canvas';

export interface ISignatureBoxProps {
    signType?: String
}
 
export interface ISignatureBoxState {
    method: String,
    type: String,
    canvasRef: any;
}
 
class SignatureBox extends React.Component<ISignatureBoxProps, ISignatureBoxState> {

    state :ISignatureBoxState = {
        method: inputMethods[0],
        type: this.props.signType || manualInputTypes[0],
        canvasRef: undefined
    }

    success = () =>{
        message.success('Signature Saved');
    }

    manualInputTypeChanged = (e:string) =>{
        this.setState({
            type:e
        })
        console.log(e);
    }

    inputMethodChanged = (e:string)=>{
        this.setState({
            method:e
        })
        console.log(e);
    }

    setCanvasRef = (canvas:any) =>{
        this.setState({
            canvasRef:canvas
        })
    }

    resetCanvas = () =>{
        const can = this.state.canvasRef.current;
        if(can){
            can.clear();
        }
        console.log("Cleared");
        this.setState({

        })
    }

    saveCanvas = () => {
        const can = this.state.canvasRef.current;
        let anchor;
        if(true){
            html2canvas(document.getElementById("ThingToSave")!).then((canvas)=>{
                canvas.toBlob((blob)=>{
                    if(blob){
                        //file = new File([blob],"uploaded_signature.jpeg",{type: "image/jpeg", lastModified:Date.now() });
                        anchor = document.createElement('a');
                        anchor.download = "test.png";
                        anchor.href = (window.URL).createObjectURL(blob);
                        anchor.dataset.downloadurl = ["image/png", anchor.download, anchor.href].join(':');
                        anchor.click();
                    }
                },"image/png");
            })
        }
        setTimeout(()=> {
            this.success()
        }, 1000);
    }

    render() { 
        return ( 
            <div id = 'SignatureBox'>
            <div id = 'SignatureButtons'>
                {
                    this.props.signType ? 
                    <></>:
                    <div id = "SignatureHeader">
                        <ButtonSelect options = {manualInputTypes} onChange = {this.manualInputTypeChanged}></ButtonSelect>
                    </div>
                } 
                <div id = "ThingToSave">
                {
                this.state.method === inputMethods[0] ? 
                <DrawCanvas type = {this.state.type} getCanvas = {this.setCanvasRef}></DrawCanvas> :
                <TypedSignature></TypedSignature>

                }
                </div>
                
                <div id = "SignatureFooter">
                    <ButtonSelect options = {inputMethods} onChange = {this.inputMethodChanged}></ButtonSelect>
                </div>
                {
                    !!this.state.canvasRef ? 
                        <div id = 'EditCanvasButtons'>
                            <Button onClick = {this.resetCanvas}>Reset Signature</Button>{" "}
                            <Button type = 'primary' onClick = {this.saveCanvas}>Save Signature</Button>
                        </div> :
                        <></>
                }
                
                
            </div>
            </div>
         );
    }
}
 
export default SignatureBox;