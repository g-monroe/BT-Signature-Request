import React from "react";
import "antd/dist/antd.css";
import { BoxHandler, IBoxHandler } from "../../Handlers/BoxHandler";
import ContextUserObject from "../WrapperComponents/ContextUserObject";
import FormEntity from "../../Entities/FormEntity";
import { IFormHandler, FormHandler } from "../../Handlers/FormHandler";
import GroupResponseList from "../../Entities/GroupResponseList";
import GroupEntity from "../../Entities/GroupEntity";
import FormImage, { IFormImageProps } from "./FormImage";
import BoxRequest from "../../Entities/BoxRequest";
import SignerType from "../../Util/Enums/SignerType";
import BoxType from "../../Util/Enums/BoxType";
import { Layout } from "antd";
import ActionType from "../../Util/Enums/ActionType";

const { Header, Content } = Layout;

export interface IFileViewerProps {
    formHandler?: IFormHandler;
    userObject:ContextUserObject;
    handleSave: (boxes: BoxRequest[]) => void;
}
 
export interface IFileViewerState {
    file: FormEntity;
    fileUploaded: boolean;
    page: number;
    clearPage: boolean;
    boxesDrawn: BoxRequest[];
    signerType: SignerType;
    boxType: BoxType;
    actionType: ActionType;
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
        clearPage: true,
        boxesDrawn: [],
        signerType: SignerType.NONE,
        boxType: BoxType.NONE,
        actionType: ActionType.NONE
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

        return <FormImage pageNum={this.state.page} 
        src={`../../../../../assets/v1/documents/${this.props.userObject.user.id}/${this.state.file.filePath.split('.').slice(0, this.state.file.filePath.split('.').length-1)}/${this.state.page}.png`} 
        failedSrc={"https://assets.cdn.thewebconsole.com/ZWEB5519/product-item/591a517c5057d.jpg"} 
        userObject={this.props.userObject} 
        pageChange={this.pageChange} 
        boxesDrawn={this.state.boxesDrawn}
        numPages={this.state.file!.numPages}  
        handleSave={this.props.handleSave}
        signerType={this.state.signerType}
        boxType={this.state.boxType}
        actionType={this.state.actionType}/>;
        
    }

    pageChange = async (change: number, boxes: BoxRequest[], signerType: SignerType, boxType: BoxType, actionType: ActionType) => {
        (await this.setState({
            page: this.state.page+change,
            boxesDrawn: boxes,
            clearPage: true,
            signerType: signerType,
            boxType: boxType,
            actionType: actionType
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