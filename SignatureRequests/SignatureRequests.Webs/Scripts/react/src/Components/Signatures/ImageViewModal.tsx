import * as React from 'react';
import { Popover, Button } from 'antd';

export interface IImageViewModalProps {
    title?:string,
    content?:JSX.Element,
    button?:string
}
 
export interface IImageViewModalState {
    
}
 
class ImageViewModal extends React.Component<IImageViewModalProps, IImageViewModalState> {
    render() { 
        return (
            <Popover placement = "rightTop"
                title = {this.props.title || "Title"}
                content = {this.props.content || <p>Create a signature below</p>}
                trigger = "click"
                >
                <Button>{this.props.button || "Press"}</Button>
            </Popover>
          );
    }
}
 
export default ImageViewModal;