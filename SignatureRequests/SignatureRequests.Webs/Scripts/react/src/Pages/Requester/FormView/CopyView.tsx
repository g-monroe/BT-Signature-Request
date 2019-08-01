import * as React from 'react';
import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';
import FileViewer from '../../../Components/Form/FileViewer';
import BoxRequest from '../../../Entities/BoxRequest';
import '../../../Components/Signatures/DrawTest.css';
import { BoxHandler, IBoxHandler } from '../../../Handlers/BoxHandler';
import { Layout, Button } from "antd";
import ViewFormImage from '../../../Components/Form/ViewFormImage';
import ViewFormCopy from '../../../Components/Form/ViewFormCopy';
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;

export interface ICopyViewProps {
   userObject: ContextUserObject;
   boxHandler: IBoxHandler;
}
 
export interface ICopyViewState {
}
 
class CopyView extends React.Component<ICopyViewProps, ICopyViewState> {
    
    static defaultProps = {
        boxHandler: new BoxHandler()
    };

    render() { 
        return (  
            <>
                <div style={{padding: '10px'}}>
                    <Link to="/request/view"><Button>Back</Button></Link>
                </div>
                <div style = {{     display: "flex",
                            position: "relative",
                            border: "5px black",
                            height:'100%',
                            width:'100%',
                            flexDirection:'column',
                            justifyContent:'space-around',
                            alignItems:'center'}}>
                
                <ViewFormCopy
                    userObject={this.props.userObject}
                >
                </ViewFormCopy>
                </div>
            </>
        );
    }
}
 
export default CopyView;