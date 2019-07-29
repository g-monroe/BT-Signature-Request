import * as React from 'react';
import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';
import FileViewer from '../../../Components/Form/FileViewer';
import BoxRequest from '../../../Entities/BoxRequest';
import '../../../Components/Signatures/DrawTest.css';
import { BoxHandler, IBoxHandler } from '../../../Handlers/BoxHandler';
import { Layout, Button } from "antd";
import ViewFormImage from '../../../Components/Form/ViewFormImage';
import ViewForm from '../../../Components/Form/ViewForm';
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;

export interface IFormViewProps {
   userObject: ContextUserObject;
   boxHandler: IBoxHandler;
}
 
export interface IFormViewState {
}
 
class FormView extends React.Component<IFormViewProps, IFormViewState> {
    
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
                
                <ViewForm
                    userObject={this.props.userObject}
                >
                </ViewForm>
                </div>
            </>
        );
    }
}
 
export default FormView;