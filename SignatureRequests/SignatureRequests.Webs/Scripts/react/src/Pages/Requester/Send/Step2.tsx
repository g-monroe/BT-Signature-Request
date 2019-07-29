import * as React from 'react';
import SendForm from '../../../Components/Form/SendForm';
import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';
import { Layout, Typography, Modal, Form, Input, DatePicker, message, Button, Icon, Drawer, Divider } from 'antd';
import './Send.css'
import FormEntity from '../../../Entities/FormEntity';
import UserEntity from '../../../Entities/UserEntity';
import BoxEntity from '../../../Entities/BoxEntity';
import FileViewer from '../../../Components/Request/FileViewer';
import { FormHandler, IFormHandler } from '../../../Handlers/FormHandler';
import { IBoxHandler, BoxHandler } from '../../../Handlers/BoxHandler';
export interface IStep2Props {
    form: number;
    users:UserEntity[];
    userObject: ContextUserObject;
}
 
export interface IStep2State {
}
 
class Step2 extends React.Component<IStep2Props, IStep2State> {
    render() { 
        const { userObject, form, users } = this.props;
        return (  

            <>
            <div style = {{ display: "flex",
                            position: "relative",
                            border: "5px black",
                            height:'100%',
                            width:'100%',
                            flexDirection:'column',
                            justifyContent:'space-around',
                            alignItems:'center',
                            overflow:"auto"}}>
                <FileViewer parent={this}
                 userObject={userObject} form={form} users={users}/>
                 </div>
            </>
        );
    }
}
 
export default Step2;