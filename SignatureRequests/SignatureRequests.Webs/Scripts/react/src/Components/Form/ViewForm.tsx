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
import ViewFormImage from "./ViewFormImage";
import BoxEntity from "../../Entities/BoxEntity";
import ModelBox from "../../Entities/ToComplete/ModelBox";

const { Header, Content } = Layout;

export interface IViewFormProps {
    formHandler?: IFormHandler;
    boxHandler?: IBoxHandler;
    userObject:ContextUserObject;

}
 
export interface IViewFormState {
    file: FormEntity;
    fileUploaded: boolean;
    page: number;
    clearPage: boolean;
    boxesDrawn: ModelBox[];
}
 
class ViewForm extends React.Component<IViewFormProps, IViewFormState> {

    static defaultProps = {
        boxHandler: new BoxHandler(),
        formHandler: new FormHandler()
     };

    state: IViewFormState = {
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
        boxesDrawn: []
    };
    
    async componentDidMount() {
        let file = (await this.props.formHandler!.getFormById(this.props.userObject.formId));
        this.setState({
            file: file,
            fileUploaded: true,
            boxesDrawn: (await this.props.boxHandler!.getModelBoxes(this.props.userObject.formId)).collection
        });
    };

    

    populateItems = (): JSX.Element => {

        if(this.state.clearPage){
                    this.setState({
                        clearPage: false
                    });
                    return <></>;
        }

        return <ViewFormImage pageNum={this.state.page} 
        src={`../../../../../assets/v1/documents/${this.state.file.filePath.split('.').slice(0, this.state.file.filePath.split('.').length-1)}/${this.state.page}.png`} 
        failedSrc={"https://assets.cdn.thewebconsole.com/ZWEB5519/product-item/591a517c5057d.jpg"} 
        userObject={this.props.userObject} 
        pageChange={this.pageChange} 
        boxesDrawn={this.state.boxesDrawn}
        numPages={this.state.file!.numPages}/>;
        
    }

    pageChange = async (change: number, boxes: ModelBox[]) => {
        (await this.setState({
            page: this.state.page+change,
            boxesDrawn: boxes,
            clearPage: true
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
 
export default ViewForm;