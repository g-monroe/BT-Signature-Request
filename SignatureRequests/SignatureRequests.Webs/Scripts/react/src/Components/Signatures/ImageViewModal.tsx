import * as React from 'react';
import { Popover, Button } from 'antd';

export interface IImageViewModalProps {
    title?:string,
    button?:string,
    isSignature: boolean,
    userId:number
}
 
export interface IImageViewModalState {
    didImageFailtoLoad:boolean
}
 
class ImageViewModal extends React.Component<IImageViewModalProps, IImageViewModalState> {
    state:IImageViewModalState = {
        didImageFailtoLoad: false
    };

    handleImageFailedtoLoad = () =>{
        this.setState({
            didImageFailtoLoad: true
        })
    }

    render() { 
        const image = <img src = {`../../../../../assets/v1/images/${this.props.isSignature ? "signatures" : "initials"}/${this.props.userId}.png`} 
                alt = {this.props.isSignature ? "signature" : "initial"} 
                onError = {this.handleImageFailedtoLoad}
                ></img>
        return (
            <Popover placement = "rightTop"
                title = {this.props.title || "Title"}
                content = {this.state.didImageFailtoLoad ? (this.props.isSignature ? <p>Save your signature below</p> : <p>Save your initial below</p>) : image}
                trigger = "click"
                >
                <Button>{this.props.button || "Press"}</Button>
            </Popover>
          );
    }
}
 
export default ImageViewModal;