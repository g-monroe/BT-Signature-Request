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
}
 
export interface IFileViewerState {
    fileUploaded: boolean;
    page: number;
    images: JSX.Element[];
    clearPage: boolean;
    boxesDrawn: BoxRequest[];
    requests?: RequestEntity[]
    showOptions: boolean;
    form?: FormEntity;
    showX: number;
    showY: number;
    requestor?: UserEntity;
    finialize: boolean;
    descript: string;
    title: string;
    group?: GroupEntity;
    selectedBox?: BoxRequest;
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
        title: "",
        descript: "",
        finialize: false,
        requests: [],
        
    };
    showOption = (show: boolean, x:number, y:number, box:BoxRequest) =>{
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
        if (e == "none"){
            remove = true;
            notFound = false;
        }
        let newBox = new BoxEntity(this.state.selectedBox)
        newBox.width = this.state.selectedBox!.width;
        newBox.height = this.state.selectedBox!.height;
        newBox.x = this.state.selectedBox!.x;
        newBox.y = this.state.selectedBox!.y;
        newBox.type = this.state.selectedBox!.type;
        newBox.pageNumber = this.state.selectedBox!.pageNumber;
        newBox.text = this.state.selectedBox!.text;
        newBox.signerType = this.state.selectedBox!.signerType;
        newBox.signedStatus = this.state.selectedBox!.signedStatus;
        newBox.isModel = this.state.selectedBox!.isModel;
        this.state.requests!.map((request) =>{
            if (request.signer.id === Number(e)){
                if (!remove){
                    request.boxes.collection.push(newBox);
                }
                notFound = false;
            }else if (remove){
                request.boxes.collection =
                    request.boxes.collection.filter(function(box) {
                        if (box.x != newBox.x || box.y != newBox.y || newBox.pageNumber != box.pageNumber){
                            return box;
                        }
                    })
            }
        })
        let newUser = this.props.users.find(x => x.id == e);
        if (newUser!.id == this.state.requestor!.id){
            newBox.signerType = "Requestor";
        }else{
            newBox.signerType = "Signer";
        }
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
                Status: "Not Signed"
            });

            newRequest.boxes.collection.push(newBox);
            this.state.requests!.push(newRequest);
        }
        for(let i = 0; i<this.state.form!.numPages; i++){
            this.state.images[i].props.parent = this;
        }
        this.setState({
            images: this.state.images
        })
    }
    onSave = async () =>{
        //Create Group;
        const {title, descript, group, form, requests} = this.state;
        const {groupHandler, boxHandler, userObject, requestHandler } = this.props;
        if (title.length < 2 || descript.length < 2){
            message.info('Title or Description not big enough!');
            return;
        }//Continue
        if (requests == null || requests!.length == 0){
            message.info('Please assign some or all boxes out!');
            return;
        }
        let groupItem = new GroupRequest(group);
        groupItem.title = title;
        groupItem.description = descript;
        groupItem.createDate = new Date();
        groupItem.dueDate = new Date(20);
        groupItem.status = RequestStatusSigning.PENDING;
        groupItem.formId = form!.id;
        const groupResult = (await groupHandler!.createGroup(groupItem));
        if (groupResult === null){
            message.error('Failed to create Group!');
            return;
        }
        //Create Request, get response with ID, use ID to create boxes.
        requests!.map(async (request) => {
            //Create RequestRequest
            let req = new RequestRequest(request);
            req.groupId = groupResult.id;
            req.requestorId = userObject.user.id;
            req.sentDate = new Date();
            req.signerId  = request.signer.id;
            req.status = request.status;
            const requestResult = (await requestHandler!.createRequest(req));
            if (requestResult === null){//Check if it was created successfully.
                message.error('Failed to create Request!');
                return;
            }else{
                request.boxes.collection.map(async (box) =>{
                    let newBox = new BoxRequest(box);
                    newBox.formId = form!.id;
                    newBox.height = box.height;
                    newBox.pageNumber = box.pageNumber;
                    newBox.requestId = requestResult.id;
                    newBox.signedStatus = box.signedStatus;
                    newBox.x = box.x;
                    newBox.date = new Date();
                    newBox.signerType = box.signerType;
                    newBox.signedStatus = "Note Signed";
                    newBox.y = box.y;
                    newBox.type = box.type;
                    newBox.isModel = false;
                    newBox.signatureId = undefined;
                    newBox.text = "";
                    const boxResult = (await boxHandler!.createBox(newBox));
                    if (boxResult === null){//Check if it was created successfully.
                        message.error('Failed to create a box!');
                        return;
                    }
                })
            }
        })
        message.success('Success! Redirecting to Dashboard!');
    }
    async componentDidMount() {
        let file = (await this.props.formHandler!.getFormById(this.props.form));
        let boxes = (await this.props.boxHandler!.getModelBoxes(this.props.form));
        let requestor =  (await this.props.userHandler!.getUserById(this.props.userObject.user.id));
        let newBoxes: BoxRequest[] = [];
        boxes.collection.map((box) => {
             let rBox = new BoxRequest(box);
             rBox.width = box.width;
             rBox.height = box.height;
             rBox.x = box.x;
             rBox.y = box.y;
             rBox.type = box.type;
             rBox.pageNumber = box.pageNumber;
             rBox.text = box.text;
             rBox.signedStatus = rBox.signedStatus;
             rBox.isModel = box.isModel;
             newBoxes.push(rBox);
        })
        let items = [];
        let form = file.filePath.split('.');
        let formName = form.slice(0, form.length-1);
        for(let i = 0; i<file.numPages; i++){
            let newItem = <FormImage pageNum={i} 
                                    src={`../../../../../assets/v1/documents/${formName}/${i}.png`} 
                                    failedSrc={"https://assets.cdn.thewebconsole.com/ZWEB5519/product-item/591a517c5057d.jpg"} 
                                    userObject={this.props.userObject} 
                                    pageChange={this.pageChange} 
                                    boxesDrawn={newBoxes} 
                                    numPages={file!.numPages} 
                                    handleSave={this.onSave}
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

    onFinal =() =>{
        this.setState({
            finialize: true
        })
    }
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
    renderOptions = () =>{
        return this.props.users.map((user, index) =>
            <Option value={user.id.toString()} key={index + 1}>{user.name}</Option>
        )
    }
    onhandleTitleChange = (event:any) => {
        this.setState({
            title: event.target.value
        })
    }
    onhandleDescrChange = (event:any) => {
        this.setState({
            descript: event.target.value
        })
    }
    render() { 
        if(!this.state.fileUploaded){
            return <></>;
        } else{
            let selectOptions = <></>
            if (this.state.showOptions){
                selectOptions = <Select onChange={this.selectionChanged} style={{position:"absolute", zIndex:90, display:"block", minWidth:"50px", left:this.state.showX + "px", top:this.state.showY +"px"}}><Option value="none" key={0}>None</Option>{this.renderOptions()}</Select>;
            }
            let display =            <> 
            {this.clearPage()}
            {this.renderpage()}
            {selectOptions}
            <Button onClick={this.onFinal} type={"primary"}>
                Finaliaze
            </Button>
            </>;
            if (this.state.finialize){
                display = <>
                    <Input value={this.state.title} onChange={this.onhandleTitleChange} id="title" placeholder="'Winson House Contract'" type="text" name="Title"/>
                    <TextArea value={this.state.descript} onChange={this.onhandleDescrChange} id="description" rows={4} name="Description" placeholder="This contact blah blah blah"/>
                    <Button onClick={this.onSave}>Finish</Button>
                </>;
            }
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