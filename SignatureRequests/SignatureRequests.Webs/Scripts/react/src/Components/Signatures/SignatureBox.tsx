import * as React from 'react';
import DrawCanvas from './DrawCanvas';
import {manualInputTypeEnum, inputMethodEnum} from '../../Util/Enums/SelectTypes';
import ButtonSelect from './ButtonSelect';
import TypedSignature from './TypedSignature';
import { Button, message } from 'antd';
import html2canvas from 'html2canvas';

export interface ISignatureBoxProps {
    signType?: manualInputTypeEnum
}
 
export interface ISignatureBoxState {
    method: inputMethodEnum,
    type: manualInputTypeEnum,
    canvasRef: any;
}
 
class SignatureBox extends React.Component<ISignatureBoxProps, ISignatureBoxState> {

    state :ISignatureBoxState = {
        method: inputMethodEnum.Draw,
        type: this.props.signType || manualInputTypeEnum.Signature,
        canvasRef: null
    }

    success = () =>{
        message.success('Signature Saved');
    }

    manualInputTypeChanged = (e:string) =>{
        const en : manualInputTypeEnum = (manualInputTypeEnum as any)[e];
        this.setState({
            type:en
        })
    }

    inputMethodChanged = (e:string)=>{
        const en : inputMethodEnum = (inputMethodEnum as any)[e];
        this.setState({
            method:en
        })
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
    }

    saveCanvas = () => {
        const can = this.state.canvasRef.current;
        let anchor;
        
            html2canvas(document.getElementById("ThingToSave")!).then((canvas:HTMLCanvasElement)=>{
                canvas.toBlob((blob)=>{
                    if(blob){
                        anchor = document.createElement('a');
                        anchor.download = "test.png";
                        anchor.href = (window.URL).createObjectURL(blob);
                        anchor.dataset.downloadurl = ["image/png", anchor.download, anchor.href].join(':');
                        anchor.click();
                    }
                },"image/png");
            })
        
        setTimeout(()=> {
            this.success() //Wait allows animation to play before success pops up
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
                        <ButtonSelect options = {manualInputTypeEnum} onChange = {this.manualInputTypeChanged}></ButtonSelect>
                    </div>
                } 
                <div id = "ThingToSave">
                {
                this.state.method === inputMethodEnum.Draw ? 
                <DrawCanvas type = {this.state.type} getCanvas = {this.setCanvasRef}></DrawCanvas> :
                <TypedSignature></TypedSignature>

                }
                </div>
                
                <div id = "SignatureFooter">
                    <ButtonSelect options = {inputMethodEnum} onChange = {this.inputMethodChanged}></ButtonSelect>
                </div>
                {
                    this.state.canvasRef ? 
                        <div id = 'EditCanvasButtons'>
                            <Button onClick = {this.resetCanvas} style = {{marginLeft:'2px'}}>Reset {this.state.type}</Button>
                            <Button type = 'primary' onClick = {this.saveCanvas}>Save {this.state.type}</Button>
                        </div> :
                        <></>
                }
            </div>
            </div>
         );
    }
}
 
export default SignatureBox;