import React from "react";
import { Form as AntForm, Button, Input, Upload, Icon, } from 'antd';
import "antd/dist/antd.css";
import { BoxHandler, IBoxHandler } from "../../Handlers/BoxHandler";
import ContextUserObject from "../WrapperComponents/ContextUserObject";
import FormEntity from "../../Entities/FormEntity";
import { IFormHandler, FormHandler } from "../../Handlers/FormHandler";
import GroupResponseList from "../../Entities/GroupResponseList";
import GroupEntity from "../../Entities/GroupEntity";
import FormImage from "./FormImage";
import BoxRequest from "../../Entities/BoxRequest";

import SignerType from '../../Util/Enums/SignerType';
import BoxType from '../../Util/Enums/BoxType';

export interface IFileViewerProps {
    formHandler?: IFormHandler;
    userObject:ContextUserObject;
    handleSave: (boxes: BoxRequest[]) => void;
}
 
export interface IFileViewerState {
    file: FormEntity;
    fileUploaded: boolean;
    page: number;
    images: JSX.Element[];
    clearPage: boolean;
    boxesDrawn: BoxRequest[];
}
 
class FileViewer extends React.Component<IFileViewerProps, IFileViewerState> {

    static defaultProps = {
        boxHandler: new BoxHandler(),
        formHandler: new FormHandler()
     };

    state: IFileViewerState = {
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
        clearPage: true,
        boxesDrawn: []
    };
    
    async componentDidMount() {
        let file = (await this.props.formHandler!.getFormById(this.props.userObject.formId));
        let items = [];
        let form = file.filePath.split('.');
        let formName = form.slice(0, form.length-1);
        for(let i = 0; i<file.numPages; i++){
            let newItem = <FormImage pageNum={i} 
                                    src={`../../../../../assets/v1/documents/${formName}/${i}.png`} 
                                    failedSrc={"https://assets.cdn.thewebconsole.com/ZWEB5519/product-item/591a517c5057d.jpg"} 
                                    userObject={this.props.userObject} 
                                    pageChange={this.pageChange} 
                                    boxesDrawn={this.state.boxesDrawn} 
                                    numPages={file!.numPages} 
                                    handleSave={this.props.handleSave}/>;
            items.push(newItem);
        }
        this.setState({
            file: file,
            fileUploaded: true,
            images: items
        });
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
    };


    pageChange = (change: number, boxes: BoxRequest[]) => {
        let boxesDrawn = this.state.boxesDrawn;
        let i = 0;
        for(i=0; i<boxes.length; i++){
            if(!boxesDrawn!.includes(boxes[i])){
                boxesDrawn.push(boxes[i]);
            }
        }
        this.setState({
            page: this.state.page+change,
            boxesDrawn: boxesDrawn,
            clearPage: true
        });
    }

    render() { 
        if(!this.state.fileUploaded){
            return <></>;
        } else{
            
        return (
            <> 
            {this.clearPage()}
            {this.renderpage()}
            </>
         );
        }
        
    };
}
 
export default FileViewer;