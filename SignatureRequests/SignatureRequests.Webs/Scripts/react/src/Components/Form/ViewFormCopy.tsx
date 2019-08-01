import React from "react";
import "antd/dist/antd.css";
import { BoxHandler, IBoxHandler } from "../../Handlers/BoxHandler";
import ContextUserObject from "../WrapperComponents/ContextUserObject";
import FormEntity from "../../Entities/FormEntity";
import { IFormHandler, FormHandler } from "../../Handlers/FormHandler";
import GroupResponseList from "../../Entities/GroupResponseList";
import GroupEntity from "../../Entities/GroupEntity";
import ViewFormImage from "./ViewFormImage";
import ModelBox from "../../Entities/ToComplete/ModelBox";
import BoxEntity from "../../Entities/BoxEntity";
import { IGroupHandler, GroupHandler } from "../../Handlers/GroupHandler";
import RequestEntity from "../../Entities/RequestEntity";
import RequestResponseList from "../../Entities/RequestResponseList";


export interface IViewFormCopyProps {
    formHandler?: IFormHandler;
    boxHandler?: IBoxHandler;
    groupHandler?: IGroupHandler;
    userObject:ContextUserObject;

}
 
export interface IViewFormCopyState {
    group: GroupEntity;
    file: FormEntity;
    fileUploaded: boolean;
    page: number;
    clearPage: boolean;
    boxesDrawn: BoxEntity[] | ModelBox[];
}
 
class ViewFormCopy extends React.Component<IViewFormCopyProps, IViewFormCopyState> {

    static defaultProps = {
        boxHandler: new BoxHandler(),
        formHandler: new FormHandler(),
        groupHandler: new GroupHandler()
     };

    state: IViewFormCopyState = {
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
        group: new GroupEntity({
            id: 1,
            form: null,
            formId: 0,
            title: "",
            description: "",
            dueDate: new Date(),
            createDate: new Date(),
            status: "",
            requests: new RequestResponseList({TotalResults: 0, RequestsList: [] as RequestEntity[]})
        })
    };
    
    async componentDidMount() {
        let group = (await this.props.groupHandler!.getGroup(this.props.userObject.groupId))
        this.setState({
            group: group,
            file: group.form,
            fileUploaded: true,
            boxesDrawn: (await this.props.boxHandler!.getCopyBoxes(this.props.userObject.groupId)).collection //get boxes without signatures
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
        src={`../../../../../assets/v1/documents/${this.state.group.form.user.id}/${this.state.file.filePath.split('.').slice(0, this.state.file.filePath.split('.').length-1)}/${this.props.userObject.groupId}/${this.state.page}.png`} 
        failedSrc={"https://assets.cdn.thewebconsole.com/ZWEB5519/product-item/591a517c5057d.jpg"} 
        userObject={this.props.userObject} 
        pageChange={this.pageChange} 
        boxesDrawn={this.state.boxesDrawn}
        numPages={this.state.file!.numPages}/>;
        
    }

    pageChange = async (change: number, boxes: ModelBox[] | BoxEntity[]) => {
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
 
export default ViewFormCopy;