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
import FormImage from "./FormImage";
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
    images: JSX.Element[];
    clearPage: Boolean;
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
        page: 0,
        images: [],
        clearPage: true
    };
    
    async componentDidMount() {
        let file = (await this.props.formHandler!.getFormById(this.props.UserObject.formId));
        let items = [];
        let form = file.filePath.split('.')[0];
        for(let i = 0; i<file.numPages; i++){
            let newItem = <FormImage pageNum={i} src={`../../../../../../assets/v1/documents/${form}/${i}.png`} failedSrc={"https://assets.cdn.thewebconsole.com/ZWEB5519/product-item/591a517c5057d.jpg"}/>;
            items.push(newItem);
        }
        this.setState({
            file: file,
            fileUploaded: true,
            images: items
        });
    };
    
    onNext = () => {
        this.setState({
            page: this.state.page+1,
            clearPage: true
        });
    };

    onPrev = () => {
        this.setState({
            page: this.state.page-1,
            clearPage: true
        })
    };

    clearPage = () : JSX.Element => {
        return <></>;
    };

    renderpage = (): JSX.Element =>{
        if(this.state.clearPage){
            this.setState({
                clearPage: false
            });
            return <></>;
        }
        const {page, images} = this.state;
        for(let i=0; i<images.length; i++){
            if(images[i].props.pageNum == page){
                return images[i];
            }
        }
        return images[0];
    }

    render() { 
        if(!this.state.fileUploaded){
            return <div>Loading...</div>;
        } else{
            
        return (
            <> 
            {this.clearPage()}
            {this.renderpage()}
            <div
            style={{
                borderTopLeftRadius: "11px",
                borderBottomLeftRadius: "11px",
                padding: "0px",
                margin: "auto",
                paddingRight: "5px",
                display: "block",
                textAlign: "center"
            }}
            >
                <Button 
                    disabled={this.state.page==0}
                    onClick={this.onPrev}>
                    Prev
                </Button>
                  Page {this.state.page+1} of {this.state.file!.numPages}  
                <Button 
                    disabled={this.state.page==this.state.file!.numPages-1}
                    onClick={this.onNext}>
                    Next
                </Button>
            </div>
            </>
         );
        }
        
    };
}
 
export default Edit;