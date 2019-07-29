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
import { thisTypeAnnotation } from "@babel/types";

const {Option} = Select;
export interface IFileViewerProps {
    formHandler?: IFormHandler;
    userHandler?: IUserHandler;
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
    requestor?: UserEntity;
    formName: string;
    clearPage: boolean;
    fileForm?: FormEntity;
    requests: RequestEntity[];
}
 
class FileViewer extends React.Component<IFileViewerProps, IFileViewerState> {

    static defaultProps = {
        formHandler: new FormHandler(),
        userHandler: new UserHandler(),
        boxHandler: new BoxHandler(),
     };

    state: IFileViewerState = {
        fileUploaded: false,
        page: 0,
        images: [],
        boxesDrawn: [],
        formName: "",
        clearPage: false,
        requests: [],
    };
    async componentDidMount() {
        const file = (await this.props.formHandler!.getFormById(this.props.form));
        const boxes = (await this.props.boxHandler!.getModelBoxes(this.props.form));
        const requestor =  (await this.props.userHandler!.getUserById(this.props.userObject.user.id));
        let newBoxes: BoxEntity[] = [];
        let newRequests: RequestEntity[] = [];

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
             if (rBox.signerType === SignerType.REQUESTOR){
                if (newRequests.length === 0 ){
                    let req = new RequestEntity({
                        Id: 0,
                        Boxes: {
                            TotalResults: 0,
                            BoxesList: []
                        },
                        Requestor: {
                            Id: requestor.id,
                            Email: requestor.email,
                            Name: requestor.name,
                            Password: requestor.password,
                            Initial: requestor.initial!,
                            Role: requestor.role,
                            Signature: requestor.signature!
                        },
                        Signer: {
                            Id: requestor.id,
                            Email: requestor.email,
                            Name: requestor.name,
                            Password: requestor.password,
                            Initial: requestor.initial!,
                            Role: requestor.role,
                            Signature: requestor.signature!
                        },
                        SentDate: new Date(),
                        Status: SignedStatus.NOTSIGNED
                    });
                    req.boxes.collection.push(rBox);
                    newRequests.push(req);
                }else{
                    newRequests[0].boxes.collection.push(rBox);
                }
             }
             newBoxes.push(rBox);
        })
        
        const form = file.filePath.split('.');
        const formName = form.slice(0, form.length-1);
        this.setState({
            fileUploaded: true,
            boxesDrawn: newBoxes,
            requestor:requestor,
            fileForm: file,
            requests: newRequests,
            formName: formName[0]
        });
    };

    populateItems = (): JSX.Element => {

        if(this.state.clearPage){
                    this.setState({
                        clearPage: false
                    });
                    return <></>;
        }
        let groupObj = new GroupEntity({
            Id: 0,
            Form: {
                Id: this.state.fileForm!.id,
                FilePath: this.state.fileForm!.filePath,
                Title: this.state.fileForm!.title,
                Description: this.state.fileForm!.description,
                CreateDate: this.state.fileForm!.createDate,
                User: this.state.fileForm!.user,
                NumPages: this.state.fileForm!.numPages,
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
        return <FormImage pageNum={this.state.page} 
        src={`../../../../../assets/v1/documents/${this.state.formName}/${this.state.page}.png`} 
        failedSrc={"https://assets.cdn.thewebconsole.com/ZWEB5519/product-item/591a517c5057d.jpg"} 
        userObject={this.props.userObject} 
        pageChange={this.pageChange} 
        boxesDrawn={this.state.boxesDrawn} 
        numPages={this.state.fileForm!.numPages}
        parent={this}
        users={this.props.users}
        requestor={this.state.requestor!}
        form={this.state.fileForm!}
        group={groupObj}
        requests={this.state.requests!}/>;
        
    }

    pageChange = async (change: number, boxes: BoxEntity[]) => {
        (await this.setState({
            page: this.state.page+change,
            boxesDrawn: boxes,
            clearPage: true,
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