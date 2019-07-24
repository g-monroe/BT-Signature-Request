import * as React from 'react';
import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';
import FileViewer from '../../../Components/Form/FileViewer';
import BoxRequest from '../../../Entities/BoxRequest';
import '../../../Components/Signatures/DrawTest.css';
import { BoxHandler, IBoxHandler } from '../../../Handlers/BoxHandler';
import { Layout } from "antd";

const { Header, Content } = Layout;

export interface IEditProps {
   userObject: ContextUserObject;
   boxHandler: IBoxHandler;
}
 
export interface IEditState {
}
 
class Edit extends React.Component<IEditProps, IEditState> {
    
    static defaultProps = {
        boxHandler: new BoxHandler()
    };

    handleSave = (boxes: BoxRequest[]) => {
        let i=0;
        for(i=0; i<boxes.length; i++){
            this.props.boxHandler.createBox(boxes[i]);
        }
    }

    render() { 
        return (  
            <>
                <div style = {{     display: "flex",
                            position: "relative",
                            border: "5px black",
                            height:'100%',
                            width:'100%',
                            flexDirection:'column',
                            justifyContent:'space-around',
                            alignItems:'center'}}>
                
                <FileViewer
                    userObject={this.props.userObject}
                    handleSave={this.handleSave}
                >
                </FileViewer>
                </div>
            </>
        );
    }
}
 
export default Edit;