import * as React from 'react';
import DrawCanvas from './DrawCanvas';
import {manualInputTypeEnum, inputMethodEnum} from '../../Util/Enums/SelectTypes';
import ButtonSelect from './ButtonSelect';
import TypedSignature from './TypedSignature';
import { Button, message } from 'antd';
import html2canvas from 'html2canvas';
import SignatureRequest from '../../Entities/SignatureRequest';
import ContextUserObject from '../WrapperComponents/ContextUserObject';
import { SignatureHandler, ISignatureHandler } from '../../Handlers/SignatureHandler';

export interface ISignatureBoxProps {
    signType?: manualInputTypeEnum,
    userObject?:ContextUserObject
    SignatureHandler?:ISignatureHandler
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

    static defaultProps = {
        SignatureHandler: new SignatureHandler(),
        UserObject: new ContextUserObject()
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
            html2canvas(document.getElementById("ThingToSave")!).then((canvas:HTMLCanvasElement)=>{
                canvas.toBlob((blob)=>{
                    if(blob){
                        const init = this.state.type === manualInputTypeEnum.Initial;
                        let request = new SignatureRequest({
                            isInitial: init,
                            UserId: this.props.userObject!.user.id,
                            ImagePath: init ? "../assets/v1/images/initials" : "../assets/v1/images/signatures",
                            CertificatePath: init ? "../assets/v1/images/initials" : "../assets/v1/images/signatures",
                            CertificatePassword: this.props.userObject!.user.email,
                            ExpirationDate: new Date()

                        })
                        
                        let pic = new FormData();
                        pic.append('file', new File([blob], this.props.userObject!.user.id + ".png",{type: "image/png", lastModified:Date.now() }))
                        
                        this.props.SignatureHandler!.createSignature(request);
                        init ? this.props.SignatureHandler!.uploadInitials(pic) : this.props.SignatureHandler!.uploadSignature(pic);

                    }
                },"image/octet-stream");
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
                            <Button onClick = {this.resetCanvas} style = {{marginLeft:'2px'}}>Reset {manualInputTypeEnum[this.state.type]}</Button>
                            <Button type = 'primary' onClick = {this.saveCanvas}>Save {manualInputTypeEnum[this.state.type]}</Button>
                        </div> :
                        <></>
                }
            </div>
            </div>
         );
    }
}
 
export default SignatureBox;