import React from "react";
import { Form as AntForm, Button, Input, Upload, Icon, Select, message, } from 'antd';
import "antd/dist/antd.css";
import { BoxHandler, IBoxHandler } from "../../Handlers/BoxHandler";
import ContextUserObject from "../WrapperComponents/ContextUserObject";
import FormEntity from "../../Entities/FormEntity";
import { IFormHandler, FormHandler } from "../../Handlers/FormHandler";
import GroupResponseList from "../../Entities/GroupResponseList";
import GroupEntity from "../../Entities/GroupEntity";
import FormImage from "./FormImage";
import BoxRequest from "../../Entities/BoxRequest";
import UserEntity from "../../Entities/UserEntity";
import RequestEntity from "../../Entities/RequestEntity";
import BoxEntity from "../../Entities/BoxEntity";
import BoxResponseList from "../../Entities/BoxResponseList";
import RequestResponseList from "../../Entities/RequestResponseList";
import { IUserHandler, UserHandler } from "../../Handlers/UserHandler";
import { request } from "https";
import Step2 from "../../Pages/Requester/Send/Step2";
import TextArea from "antd/lib/input/TextArea";
import GroupRequest from "../../Entities/GroupRequest";
import { RequestStatusSigning } from "../../Util/Enums/RequestStatus";
import { IGroupHandler, GroupHandler } from "../../Handlers/GroupHandler";
import RequestRequest from "../../Entities/RequestRequest";
import { IRequestHandler, RequestHandler } from "../../Handlers/RequestHandler";
import BoxType from "../../Util/Enums/BoxType";
import SignerType from "../../Util/Enums/SignerType";
import SignedStatus from "../../Util/Enums/SignedStatus";
import { RequestDueDate } from "../../Util/Constants";
import ActionType from "../../Util/Enums/ActionType";

const {Option} = Select;
export interface IFileViewerProps {
    formHandler?: IFormHandler;
    userHandler?: IUserHandler;
    groupHandler?: IGroupHandler;
    requestHandler?: IRequestHandler;
    boxHandler?: IBoxHandler;
    form: number;
    users: UserEntity[];
    userObject:ContextUserObject;
    parent: Step2;
}
 
export interface IFileViewerState {
    fileUploaded: boolean;
    page: number;
    boxesDrawn: BoxEntity[];
    images: JSX.Element[];
}
 
class FileViewer extends React.Component<IFileViewerProps, IFileViewerState> {

    static defaultProps = {
        formHandler: new FormHandler(),
        userHandler: new UserHandler(),
        groupHandler: new GroupHandler(),
        requestHandler: new RequestHandler(),
        boxHandler: new BoxHandler()
     };

    state: IFileViewerState = {
        fileUploaded: false,
        page: 0,
        images: [],
        boxesDrawn: []
    };
    
    async componentDidMount() {
        const file = (await this.props.formHandler!.getFormById(this.props.form));
        const boxes = (await this.props.boxHandler!.getModelBoxes(this.props.form));
        const requestor =  (await this.props.userHandler!.getUserById(this.props.userObject.user.id));
        let newBoxes: BoxEntity[] = [];
        boxes.collection.map((box) => {
            
             let rBox = new BoxEntity({
                PageNumber: box.pageNumber,
                Width: box.width,
                Height: box.height,
                SignerType: box.signerType,
                X: box.x,
                Y: box.y,
                Type:box.type,
                SignedStatus:box.signedStatus,
                IsModel: box.isModel,
                FormWidth: box.formWidth,
                FormHeight: box.formHeight
             });
             newBoxes.push(rBox);
        })
        let items = [];
        const form = file.filePath.split('.');
        const formName = form.slice(0, form.length-1);
        let groupObj = new GroupEntity({
            Id: 0,
            Form: {
                Id: file.id,
                FilePath: file.filePath,
                Title: file.title,
                Description: file.description,
                CreateDate: file.createDate,
                User: file.user,
                NumPages: file.numPages,
                GroupEntities: {
                    TotalResults: 0,
                    GroupList:[] as GroupEntity[]
                }
            },
            Title: "",
            DueDate: new Date(),
            CreateDate: new Date(),
            Description: "",
            Status: "",
            RequestEntities: new RequestResponseList({
                TotalResults: 0,
                RequestList: [] as RequestEntity[]
            })
        });
        for(let i = 0; i<file.numPages; i++){
            let newItem = <FormImage pageNum={i} 
                                    src={`../../../../../assets/v1/documents/${formName}/${i}.png`} 
                                    failedSrc={"https://assets.cdn.thewebconsole.com/ZWEB5519/product-item/591a517c5057d.jpg"} 
                                    userObject={this.props.userObject} 
                                    pageChange={this.pageChange} 
                                    boxesDrawn={newBoxes} 
                                    numPages={file!.numPages}
                                    parent={this}
                                    users={this.props.users}
                                    requestor={requestor}
                                    form={file}
                                    group={groupObj}/>;
            items.push(newItem);
        }

        this.setState({
            fileUploaded: true,
            images: items,
            boxesDrawn: newBoxes
        });
    };

    renderPage = (): JSX.Element =>{
        const {page, images} = this.state;
        for(let i=0; i<images.length; i++){
            if(images[i].props.pageNum === page){
                return images[i];
            }
        }
        return <><h1>No Page Found</h1></>;
    };

    pageChange = async (change: number, boxes: BoxEntity[]) => {
        (await this.setState({
            page: this.state.page+change,
            boxesDrawn: boxes,
        }));
    }
  
    render() { 
        if(!this.state.fileUploaded){
            return <></>;
        } else{
            let display =            <> 
            {this.renderPage()}
            </>;
        return (
            <>
            {
                display
            }
            </>
         );
        }
        
    };
}
 
export default FileViewer;