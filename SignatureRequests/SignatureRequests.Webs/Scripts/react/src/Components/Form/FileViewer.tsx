import React from "react";
import "antd/dist/antd.css";
import { BoxHandler, IBoxHandler } from "../../Handlers/BoxHandler";
import ContextUserObject from "../WrapperComponents/ContextUserObject";
import FormEntity from "../../Entities/FormEntity";
import { IFormHandler, FormHandler } from "../../Handlers/FormHandler";
import GroupResponseList from "../../Entities/GroupResponseList";
import GroupEntity from "../../Entities/GroupEntity";
import FormImage from "./FormImage";
import BoxRequest from "../../Entities/BoxRequest";
import SignerType from "../../Util/Enums/SignerType";
import BoxType from "../../Util/Enums/BoxType";
import { Modal } from "antd";
import { Link } from "react-router-dom";

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
    isPopulated: boolean;
    signerType: string;
    boxType: string;
    isSignerTypeSelected: boolean;
    isTypeSelected: boolean;
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
        boxesDrawn: [],
        signerType: SignerType.NONE,
        boxType: BoxType.NONE,
        isPopulated: false,
        isSignerTypeSelected: false,
        isTypeSelected: false
    };
    
    async componentDidMount() {
        let file = (await this.props.formHandler!.getFormById(this.props.userObject.formId));
        this.setState({
            file: file,
            fileUploaded: true
        });
    };

    populateItems = (): JSX.Element => {

        if(this.state.clearPage){
                    this.setState({
                        clearPage: false
                    });
                    return <></>;
        }

        let items = [];
        let form = this.state.file.filePath.split('.');
        let formName = form.slice(0, form.length-1);
        for(let i = 0; i<this.state.file.numPages; i++){
            let newItem = <FormImage pageNum={i} 
                                    src={`../../../../../assets/v1/documents/${formName}/${i}.png`} 
                                    failedSrc={"https://assets.cdn.thewebconsole.com/ZWEB5519/product-item/591a517c5057d.jpg"} 
                                    userObject={this.props.userObject} 
                                    pageChange={this.pageChange} 
                                    boxesDrawn={this.state.boxesDrawn}
                                    numPages={this.state.file!.numPages} 
                                    handleSave={this.props.handleSave}
                                    signerType={this.state.signerType}
                                    boxType={this.state.boxType}
                                    isSignerTypeSelected={this.state.isSignerTypeSelected}
                                    isTypeSelected={this.state.isTypeSelected}/>;
            items.push(newItem);
        }

        if(!this.state.isPopulated){
            this.setState({
                isPopulated: true,
                images: items
            });
        }
        
        const {page} = this.state;
        for(let i=0; i<items.length; i++){
            if(items[i].props.pageNum == page){
                return items[i];
            }
        }
        return items[0];
    }

    pageChange = async (change: number, boxes: BoxRequest[], signerType: string, boxType: string, isSignerTypeSelected: boolean, isTypeSelected: boolean) => {
        (await this.setState({
            page: this.state.page+change,
            boxesDrawn: boxes,
            clearPage: true,
            signerType: signerType,
            boxType: boxType,
            isPopulated: false,
            isSignerTypeSelected: isSignerTypeSelected,
            isTypeSelected: isTypeSelected
        }));
    }

    render() { 
        if(!this.state.fileUploaded){
            return <></>;
        } else{
            
        return (
            <> 
            {this.populateItems()}
            </>
         );
        }
        
    };
}
 
export default FileViewer;