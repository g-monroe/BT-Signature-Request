import React from "react";
import { Form as AntForm, Button, Input, Upload, Icon, } from 'antd';
import "antd/dist/antd.css";
import { Form, InjectedFormikProps, withFormik } from "formik";
import * as yup from 'yup';
import TextArea from "antd/lib/input/TextArea";
import { BoxHandler, IBoxHandler } from "../../../Handlers/BoxHandler";
import UserEntity from "../../../Entities/UserEntity";
import ContextUserObject from "../../../Components/WrapperComponents/ContextUserObject";
import FormEntity from "../../../Entities/FormEntity";
import { IFormHandler, FormHandler } from "../../../Handlers/FormHandler";
import GroupResponseList from "../../../Entities/GroupResponseList";
import GroupEntity from "../../../Entities/GroupEntity";
const FileViewer = require('react-file-viewer');
const FormItem = AntForm.Item;

export interface IEditProps {
    formId: number;
    boxHandler?: IBoxHandler;
    formHandler?: IFormHandler;
    handleSave: (data: any) => Promise<void>;
    UserObject:ContextUserObject;
}
 
export interface IEditState {
    file: FormEntity;
    fileUploaded: Boolean;
    page: number;
}
 
class Edit extends React.Component<IEditProps, IEditState> {
    static defaultProps = {
        boxHandler: new BoxHandler(),
        formHandler: new FormHandler()
     };

    state: IEditState = {
        file : new FormEntity({
            id: 1,
            filePath: "",
            title: "",
            description: "",
            createDate: "",
            userId: 1,
            GroupEntities: new GroupResponseList({TotalResults: 0, GroupsList: [] as GroupEntity[]})
        }),
        fileUploaded: false,
        page: 0
    };
    
    async componentDidMount() {
        this.setState({
            file: (await this.props.formHandler!.getFormById(this.props.UserObject.formId)),
            fileUploaded: true
        });
        console.log(this.state.file!);
    }
    

    render() { 
        if(!this.state.fileUploaded){
            return <div>Loading...</div>;
        } else{
            let form = this.state.file!.filePath.split('.')[0];
        return (
            <> 
            <h1  id = 'HeaderText'>Edit a Form</h1>
            <h1>{this.props.UserObject.formId}</h1>
            <img src={require("../../../../../../assets/v1/documents/"+form+"/"+this.state.page+".png")}/>
            </>
         );
        }
        
    }
}
 
export default Edit;