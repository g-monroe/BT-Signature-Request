import React from "react";
import { Button, Select, message, } from 'antd';
import "antd/dist/antd.css";
import { BoxHandler, IBoxHandler } from "../../Handlers/BoxHandler";
import ContextUserObject from "../WrapperComponents/ContextUserObject";
import FormEntity from "../../Entities/FormEntity";
import { IFormHandler, FormHandler } from "../../Handlers/FormHandler";
import GroupEntity from "../../Entities/GroupEntity";
import FormImage from "./FormImage";
import BoxRequest from "../../Entities/BoxRequest";
import UserEntity from "../../Entities/UserEntity";
import RequestEntity from "../../Entities/RequestEntity";
import BoxEntity from "../../Entities/BoxEntity";
import RequestResponseList from "../../Entities/RequestResponseList";
import { IUserHandler, UserHandler } from "../../Handlers/UserHandler";
import Step2 from "../../Pages/Requester/Send/Step2";
import { RequestStatusSigning } from "../../Util/Enums/RequestStatus";
import { IGroupHandler, GroupHandler } from "../../Handlers/GroupHandler";
import RequestRequest from "../../Entities/RequestRequest";
import { IRequestHandler, RequestHandler } from "../../Handlers/RequestHandler";
import BoxType from "../../Util/Enums/BoxType";
import SignerType from "../../Util/Enums/SignerType";
import SignedStatus from "../../Util/Enums/SignedStatus";
import GroupRequest from "../../Entities/GroupRequest";
import { boolean } from "yup";

const {Option} = Select;

export interface IFileViewerProps {
    formHandler?: IFormHandler;
    userHandler?: IUserHandler;
    groupHandler?: IGroupHandler;
    requestHandler?: IRequestHandler;
    form: number;
    boxHandler?: IBoxHandler;
    users: UserEntity[];
    userObject:ContextUserObject;
    parent: Step2;
    onPressSend:(send: (title:string, desc:string, dueDate:Date)=>Promise<boolean>, preTitle:string, preDesc:string )=>void;
}
 
export interface IFileViewerState {
    fileUploaded: boolean;
    page: number;
    images: JSX.Element[];
    clearPage: boolean;
    boxesDrawn: BoxEntity[];
    requests?: RequestEntity[]
    showOptions: boolean;
    form?: FormEntity;
    showX: number;
    showY: number;
    requestor?: UserEntity;
    group?: GroupEntity;
    selectedBox?: BoxEntity;
}
 
class FileViewer extends React.Component<IFileViewerProps, IFileViewerState> {

    static defaultProps = {
        boxHandler: new BoxHandler(),
        formHandler: new FormHandler(),
        userHandler: new UserHandler(),
        groupHandler: new GroupHandler(),
        requestHandler: new RequestHandler()
     };

    state: IFileViewerState = {
        fileUploaded: false,
        page: 0,
        images: [],
        clearPage: true,
        boxesDrawn: [],
        showOptions: false,
        showX: 0,
        showY: 0,
        requests: [],
        
    };
    showOption = (show: boolean, x:number, y:number, box:BoxEntity) =>{
        if (show){
            this.setState({
                showOptions: true,
                showX: x,
                showY: y,
                selectedBox: box
                
            })
        }else{
            this.setState({
                showOptions: false
            })
        }
    }
     selectionChanged = async (e:any) =>{
        
        let remove = false;
        let notFound = true;
        if (e === BoxType.NONE){
            remove = true;
            notFound = false;
        }
        let newBox = this.state.selectedBox;
        let newUser = this.props.users.find(x => x.id === Number(e));
        if (newUser!.id === this.state.requestor!.id && !remove){
            newBox!.signerType = SignerType.REQUESTOR;
        }else{
            newBox!.signerType = SignerType.SIGNER;
        }
        this.state.requests!.map((request) =>{
            if (request.signer.id === Number(e)){
                if (!remove){
                    request.boxes.collection.push(newBox!);
                }
                notFound = false;
            }else if (remove){
                request.boxes.collection =
                    request.boxes.collection.filter(function(box) {
                        if (box.x !== newBox!.x || box.y !== newBox!.y || newBox!.pageNumber !== box.pageNumber){
                            return box;
                        }
                    })
            }
        })
        if (notFound){
            let newRequest = new RequestEntity({
                Id: 0,
                Boxes: {
                    TotalResults: 0,
                    BoxesList: []
                },
                Requestor: {
                    Id: this.state.requestor!.id,
                    Email: this.state.requestor!.email,
                    Name: this.state.requestor!.name,
                    Password: this.state.requestor!.password,
                    Initial: this.state.requestor!.initial!,
                    Role: this.state.requestor!.role,
                    Signature: this.state.requestor!.signature!
                },
                Signer: {
                    Id: newUser!.id,
                    Email: newUser!.email,
                    Name: newUser!.name,
                    Password: newUser!.password,
                    Initial: newUser!.initial,
                    Role: newUser!.role,
                    Signature: newUser!.signature
                },
                SentDate: new Date(),
                Status: SignedStatus.NOTSIGNED
            });
            newRequest.boxes.collection.push(newBox!);
            this.state.requests!.push(newRequest);
        }
        for(let i = 0; i<this.state.form!.numPages; i++){
            this.state.images[i].props.parent = this;
        }
        this.setState({
            images: this.state.images
        })
    }
    onSave = async (title:string, desc:string, dueDate:Date) : Promise<boolean> =>{
        //Create Group;
        const { group, form, requests} = this.state;
        const {groupHandler, boxHandler, userObject, requestHandler } = this.props;
        
        let groupItem = new GroupRequest(group);
        groupItem.title = title;
        groupItem.description = desc;
        groupItem.createDate = new Date();
        groupItem.dueDate = dueDate;
        groupItem.status = RequestStatusSigning.PENDING;
        groupItem.formId = form!.id;
        let groupResult : GroupEntity;
        try{
            groupResult = (await groupHandler!.createGroup(groupItem));
        }catch(e){
            message.error('Failed to create Group!');
            return false;
        }  
        //Create request, get response with ID, use ID to create boxes.
        await requests!.map(async (request) => {
            //Create RequestRequest
            let req = new RequestRequest(request);
            req.groupId = groupResult.id;
            req.requestorId = userObject.user.id;
            req.sentDate = new Date();
            req.signerId  = request.signer.id;
            req.status = request.status;
            let requestResult : RequestEntity;
            try{
                requestResult = (await requestHandler!.createRequest(req));
            }catch(e){
                message.error('Failed to create Request!');
                return false;
            }
                await request.boxes.collection.map(async (box) =>{
                    let newBox = new BoxRequest(box);
                    newBox.formId = form!.id;
                    newBox.requestId = requestResult.id;
                    newBox.date = new Date();
                    newBox.isModel = false;
                    
                    try{
                        (await boxHandler!.createBox(newBox));
                        console.log("This should be first")
                    }catch(e){
                        message.error('Failed to create a box!');
                        return false;
                    }              
                })           
        })
        console.log("This should be 2nd")
        return true;
    }
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
             });
             newBoxes.push(rBox);
        })
        let items = [];
        const form = file.filePath.split('.');
        const formName = form.slice(0, form.length-1);
        for(let i = 0; i<file.numPages; i++){
            let newItem = <FormImage pageNum={i} 
                                    src={`../../../../../assets/v1/documents/${formName}/${i}.png`} 
                                    failedSrc={"https://assets.cdn.thewebconsole.com/ZWEB5519/product-item/591a517c5057d.jpg"} 
                                    userObject={this.props.userObject} 
                                    pageChange={this.pageChange} 
                                    boxesDrawn={newBoxes} 
                                    numPages={file!.numPages}
                                    parent={this}/>;
            items.push(newItem);
        }
        this.setState({
            fileUploaded: true,
            form: file,
            images: items,
            requestor: requestor, 
            group: new GroupEntity({
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
            }),
        });
    };

    renderPage = (): JSX.Element =>{
        if(this.state.clearPage){
            this.setState({
                clearPage: false
            });
            return <></>;
        }
        const {page, images} = this.state;
        for(let i=0; i<images.length; i++){
            if(images[i].props.pageNum === page){
                return images[i];
            }
        }
        return <><h1>No Page Found</h1></>;
    };

    onFinal = async () =>{
        let title = "";
        let description = "";

        if (this.state.requests === null || this.state.requests!.length === 0){
            message.info('Assign one or more boxes to a user');
            return;
        } else if(this.state.form){
          title = this.state.form.title || "";
          description = this.state.form.description || "";
        }
        await this.props.onPressSend(this.onSave, title, description)
    }
    
    pageChange = (change: number, boxes: BoxEntity[]) => {
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
    renderOptions = () =>{
        return this.props.users.map((user, index) =>
            <Option value={user.id.toString()} key={index + 1}>{user.name}</Option>
        )
    }
    
    render() { 
        if(!this.state.fileUploaded){
            return <></>;
        } else{
            let selectOptions = <></>
            if (this.state.showOptions){
                selectOptions = <Select onChange={this.selectionChanged} style={{position:"absolute", zIndex:90, display:"block", minWidth:"50px", left:this.state.showX + "px", top:this.state.showY +"px"}}><Option value="None" key={0}>None</Option>{this.renderOptions()}</Select>;
            }
            let display =            <> 
            {this.renderPage()}
            {selectOptions}
            <Button onClick={this.onFinal} type={"primary"}>
                Finalize
            </Button>
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