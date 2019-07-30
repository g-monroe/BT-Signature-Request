import React from 'react';
import BoxRequest from '../../Entities/BoxRequest';
import ContextUserObject from '../WrapperComponents/ContextUserObject';
import SignedStatus from '../../Util/Enums/SignedStatus';
import SignerType from '../../Util/Enums/SignerType';
import { SignatureColors } from '../../Util/Enums/colors';
import BoxType from '../../Util/Enums/BoxType';
import { Button, Select, Icon, Row, Col, Form, Input, DatePicker, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import { Layout } from "antd";
import BoxEntity from '../../Entities/BoxEntity';
import FileViewer from './FileViewer';
import UserEntity from '../../Entities/UserEntity';
import RequestEntity from '../../Entities/RequestEntity';
import FormEntity from '../../Entities/FormEntity';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import * as routes from '../../Pages/Routing/routes';
import GroupRequest from '../../Entities/GroupRequest';
import { RequestStatusSigning } from '../../Util/Enums/RequestStatus';
import RequestRequest from '../../Entities/RequestRequest';
import { IFormHandler, FormHandler } from '../../Handlers/FormHandler';
import { IUserHandler, UserHandler } from '../../Handlers/UserHandler';
import { IGroupHandler, GroupHandler } from '../../Handlers/GroupHandler';
import { IRequestHandler, RequestHandler } from '../../Handlers/RequestHandler';
import { BoxHandler, IBoxHandler } from '../../Handlers/BoxHandler';
import GroupEntity from '../../Entities/GroupEntity';
const { Header } = Layout;

const { Option } = Select;
const PictureToWrap = "PictureToWrap";

export interface IFormImageProps{
  src: string;
  failedSrc:string;
  userObject: ContextUserObject;
  pageChange: (change: number, boxes: BoxEntity[]) => void;
  numPages: number;
  pageNum: number;
  boxesDrawn: BoxEntity[];
  parent: FileViewer;
  users: UserEntity[];
  requestor: UserEntity;
  form: FormEntity;
  formHandler?: IFormHandler;
  userHandler?: IUserHandler;
  groupHandler?: IGroupHandler;
  requestHandler?: IRequestHandler;
  boxHandler?: IBoxHandler;
  group: GroupEntity;
  requests: RequestEntity[];
}

interface IFormImageState{
  src: string;
  errored:boolean;
  mouseDown: boolean;
  boxesDrawn: BoxEntity[]; 
  drawnBox?: BoxEntity;
  selectedBox?: BoxEntity;
  xVal: number;
  yVal: number;
  height: number;
  width: number;
  canvasRef:React.RefObject<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null;
  isBoxSelected: boolean;
  pageNumber: number;
  isCanvasRendered: boolean;
  formHeight: number;
  formWidth: number;
  isConfirmVisible:boolean;
  selectedUser: string;
  title:string;
  description:string;
  date:Date;
  wasSuccess:boolean;
}

class FormImage extends React.Component<IFormImageProps, IFormImageState> {
  static defaultProps = {
    boxHandler: new BoxHandler(),
    formHandler: new FormHandler(),
    userHandler: new UserHandler(),
    groupHandler: new GroupHandler(),
    requestHandler: new RequestHandler()
 };
  state: IFormImageState = {
    src: this.props.src,
    errored: false,
    boxesDrawn: this.props.boxesDrawn,
    drawnBox: new BoxEntity({
        Width: 0,
        Height: 0,
        xVal: 0,
        yVal: 0,
        Type: "",
        SignerType: "",
        SignedStatus: "",
        RequestId: null,
        SignatureId: null
    }),
    isConfirmVisible: false,
    mouseDown: false,
    xVal: 0,
    selectedUser: SignerType.NONE,
    yVal: 0,
    height: 0,
    width: 0,
    canvasRef: React.createRef(),
    ctx: null,
    isBoxSelected: false,
    pageNumber: this.props.pageNum,
    isCanvasRendered: false,
    formHeight: 0,
    formWidth: 0,
    title:"",
    description:"",
    date: new Date(),
    wasSuccess:false
  };
  
  fitCanvasToContainer = (rect:any) =>{
    this.state.canvasRef.current!.style.width = '100%';
    this.state.canvasRef.current!.style.height = '100%';
    this.state.canvasRef.current!.width =  rect.width;
    this.state.canvasRef.current!.height =  rect.height;
  }

  async componentDidMount(){

    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate()+7);

    (await this.setState({
      ctx : this.state.canvasRef.current!.getContext("2d"),
      date: oneWeekFromNow
    }));
    const rect = document.getElementById(PictureToWrap)!.getBoundingClientRect();
    this.fitCanvasToContainer(rect);
    this.drawBoxes();
  }

  onError = () => {
    if (!this.state.errored) {
      this.setState({
        src: this.props.failedSrc,
        errored: true,
      });
    }
  }
  handleSelectionChange = (e:any) =>{
    this.setState({
        selectedUser: e
    })
  }
  boxSelected = (X: number, Y: number) => {
    let i = 0;
    for(i=0; i<this.state.boxesDrawn.length; i++){
      if( this.state.boxesDrawn[i].pageNumber === this.state.pageNumber && ((X >= this.state.boxesDrawn[i].x && X <= this.state.boxesDrawn[i].x+this.state.boxesDrawn[i].width && Y >= this.state.boxesDrawn[i].y && Y <= this.state.boxesDrawn[i].y+this.state.boxesDrawn[i].height) ||
          (X >= this.state.boxesDrawn[i].x && X <= this.state.boxesDrawn[i].x+this.state.boxesDrawn[i].width && Y <= this.state.boxesDrawn[i].y && Y >= this.state.boxesDrawn[i].y+this.state.boxesDrawn[i].height) ||
          (X <= this.state.boxesDrawn[i].x && X >= this.state.boxesDrawn[i].x+this.state.boxesDrawn[i].width && Y >= this.state.boxesDrawn[i].y && Y <= this.state.boxesDrawn[i].y+this.state.boxesDrawn[i].height) ||
          (X <= this.state.boxesDrawn[i].x && X >= this.state.boxesDrawn[i].x+this.state.boxesDrawn[i].width && Y <= this.state.boxesDrawn[i].y && Y >= this.state.boxesDrawn[i].y+this.state.boxesDrawn[i].height) )  ){
            this.setState({
              selectedBox: this.state.boxesDrawn[i],
              isBoxSelected: true
            });
            return;
      }
    }
    this.setState({
      isBoxSelected: false
    });
  }
  boxClicked = (box: BoxEntity) =>{
    const {users, requestor, form, requests } = this.props;
    const {selectedUser } = this.state;
    let remove = false;
    let notFound = true;
    if (this.state.selectedUser === BoxType.NONE){
        remove = true;
        notFound = false;
    }
    let newBox = box;
    let newUser = users.find(x => x.id === Number(selectedUser));
    if (newBox.signerType === SignerType.REQUESTOR){
      return;
    }
    if (!remove && newUser!.id === requestor!.id){
        newBox!.signerType = SignerType.REQUESTOR;
    }else{
        newBox!.signerType = SignerType.SIGNER;
    }
    requests!.map((request) =>{
        if (request.signer.id === Number(selectedUser)){
            if (!remove){
              let exists = false;
              request.boxes.collection.map((inBox) => {
                if (inBox === newBox){
                  exists = true;
                }
              })
              if (!exists){
                request.boxes.collection.push(newBox!);
              }
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
                Id: requestor!.id,
                Email: requestor!.email,
                Name: requestor!.name,
                Password: requestor!.password,
                Initial: requestor!.initial!,
                Role: requestor!.role,
                Signature: requestor!.signature!
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
        requests!.push(newRequest);
    }
  }
  onMouseDown = (event:any) => {
    const rect = document.getElementById(PictureToWrap)!.getBoundingClientRect();
    if(!this.state.isCanvasRendered){
      this.setState({
        isCanvasRendered: true
      });
      this.fitCanvasToContainer(rect);
    }
    let sent = false;
    this.props.boxesDrawn.map((box) =>{
      if ((box.x <= (event.clientX - rect.left) && (box.x + box.width) >= (event.clientX - rect.left)) &&
         (box.y <= (event.clientY - rect.top) && (box.y + box.height) >= (event.clientY - rect.top)) && box.pageNumber === this.state.pageNumber && !sent){
          this.boxClicked(box);
          sent = true;
      }
    });
    this.drawBoxes();
  };

onMouseUp = (event:any) => {
  if(this.state.mouseDown){
    let boxes = this.state.boxesDrawn;
    let box = new BoxEntity({
        Width: this.state.width,
        Height: this.state.height,
        X: Math.floor(this.state.xVal),
        Y: Math.floor(this.state.yVal),
        SignedStatus: SignedStatus.NOTSIGNED,
        FormId: this.props.userObject.formId,
        PageNumber: this.state.pageNumber,
        IsModel: true,
        FormHeight: this.state.formHeight,
        FormWidth: this.state.formWidth
    });
    boxes.push(box);
    this.setState({
        boxesDrawn: boxes,
        mouseDown: false
    });
    this.drawBoxes();
  }
};

drawBoxes = async () => {
    this.state.ctx!.clearRect(0,0,this.state.canvasRef.current!.width,this.state.canvasRef.current!.height);
    let i=0;
    for(i=0; i<this.state.boxesDrawn.length; i++){
        if(this.state.boxesDrawn[i].pageNumber === this.state.pageNumber){
            
            //BOX
            this.state.ctx!.beginPath();
            let ctx = this.state.ctx;
            ctx!.globalAlpha = 0.2;
            ctx!.fillStyle = this.determineColor(this.state.boxesDrawn[i].type);
            (await this.setState({
              ctx: ctx
            })); 
            this.state.ctx!.clearRect(this.state.boxesDrawn[i].x,this.state.boxesDrawn[i].y,this.state.boxesDrawn[i].width,this.state.boxesDrawn[i].height);
            this.state.ctx!.fillRect(this.state.boxesDrawn[i].x, this.state.boxesDrawn[i].y, this.state.boxesDrawn[i].width, this.state.boxesDrawn[i].height);

            //RESET COLOR
            ctx!.globalAlpha = 0.2;
            ctx!.fillStyle = this.determineColor(this.state.boxesDrawn[i].type);
            (await this.setState({
              ctx: ctx
            }));
            
            //TEXT
            ctx!.fillStyle = SignatureColors.labels;
            ctx!.font = "11px Verdana";
            ctx!.globalAlpha = 1.0;
            (await this.setState({
              ctx: ctx
            }));
            this.state.ctx!.stroke();
            this.props.requests.map((request) =>{
              request.boxes.collection.map((box) => {
                 if (box === this.state.boxesDrawn[i]){
                  this.state.ctx!.fillText(request.signer.name, 
                  this.state.boxesDrawn[i].x < this.state.boxesDrawn[i].x+this.state.boxesDrawn[i].width ?  this.state.boxesDrawn[i].x+2 : this.state.boxesDrawn[i].x+this.state.boxesDrawn[i].width+2, 
                  this.state.boxesDrawn[i].y < this.state.boxesDrawn[i].y+this.state.boxesDrawn[i].height ?  this.state.boxesDrawn[i].y+13 : this.state.boxesDrawn[i].y+this.state.boxesDrawn[i].height+13);
                
                }
              })
            })
            
             this.state.ctx!.closePath();
        }
    }
  }
  onNext = () => {
    this.props.pageChange(1, this.state.boxesDrawn);

  };

  onPrev = () => {
    this.props.pageChange(-1, this.state.boxesDrawn);
  };

  onSave = async () => {
     //Create Group;
     const {title, description, date} = this.state;
     const {groupHandler, boxHandler, form, userObject, requestHandler, group, requests } = this.props;
     if (title.length < 0 || description.length < 0){
         message.info('Title or Description not big enough!');
         return;
     }//Continue
     if (requests === null || requests!.length === 0){
         message.info('Please assign some or all boxes out!');
         return;
     }
     let groupItem = new GroupRequest({
      Title: title,
      Description:description,
      CreateDate: new Date(),
      DueDate: this.state.date,
      Status: RequestStatusSigning.PENDING,
      FormId: form!.id
     });
     const groupResult = (await groupHandler!.createGroup(groupItem, this.props.userObject.user.id));
     if (groupResult === null){
         message.error('Failed to create Group!');
         return;
     }
     //Create Request, get response with ID, use ID to create boxes.
     requests!.map(async (request) => {
         //Create RequestRequest
         let req = new RequestRequest({
          GroupId: groupResult.id,
          RequestorId:userObject.user.id,
          SentDate: new Date(),
          SignerId: request.signer.id,
          Status: request.status
         });
         const requestResult = (await requestHandler!.createRequest(req));
         if (requestResult === null){//Check if it was created successfully.
             message.error('Failed to create Request!');
             return;
         }else{
             request.boxes.collection.map(async (box) =>{
                 let newBox = new BoxRequest(box);
                 newBox.formId = form!.id; 
                 newBox.requestId = requestResult.id;
                 newBox.isModel = false;
                 newBox.formHeight = box.formHeight;
                 newBox.formWidth = box.formWidth;
                 const boxResult = (await boxHandler!.createBox(newBox));
                 if (boxResult === null){//Check if it was created successfully.
                     message.error('Failed to create a box!');
                     return;
                 }
             })
         }
     })
     message.success('Success!');
     this.setState({
       wasSuccess: true
     })
  };

  onLoad = async () => {
    let rect = document.getElementById("loadedImage")!.getBoundingClientRect();
    (await this.setState({
      formHeight: rect.height,
      formWidth: rect.width
    }));
    this.fitCanvasToContainer(rect);
    this.drawBoxes();
  };

  removeBox = async () => {
    let boxes = this.state.boxesDrawn.filter(box => box !== this.state.selectedBox);
    (await this.setState({
      boxesDrawn: boxes,
      isBoxSelected: false
    }));
    let rect = document.getElementById("loadedImage")!.getBoundingClientRect();
    this.fitCanvasToContainer(rect);
    this.drawBoxes();
  }


  handleUndo = () => {
    let lastBox = this.state.boxesDrawn.pop();
    let boxes = this.state.boxesDrawn.filter(box => box != lastBox);
    this.setState({
      boxesDrawn: boxes
    });
    this.drawBoxes();
  }
  onCancel = () =>{
    this.setState({
        isConfirmVisible:false
    })
  }
  onFinal = () => {
    this.setState({
      isConfirmVisible: true
    })
  }
  determineColor = (boxType: string) => {
    switch(boxType){
      case BoxType.SIGNATURE:{
        return SignatureColors.signature;
      }
      case BoxType.INITIAL:{
        return SignatureColors.initial;
      }
      case BoxType.DATE:{
        return SignatureColors.date;
      }
      case BoxType.TEXT:{
        return SignatureColors.text;
      }
      default:{
        return SignatureColors.default;
      }
    }
  }
  handleTitleChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    this.setState({
        title:e.target.value
    })
}

handleDescChange = (e : React.ChangeEvent<HTMLTextAreaElement>) =>{
    this.setState({
        description:e.target.value
    })
}

handleDateChange = (date: moment.Moment, dateString: string) =>{
    this.setState({
        date: date.toDate()
    })
}
  renderOptions = () =>{
    return this.props.users.map((user, index) =>
        <Option value={user.id.toString()} key={index + 1}>{user.name}</Option>
    )
}
  render() {
    const { src } = this.state;

    return (
        <>
        <Modal
                title = "Some Final Information"
                visible = {this.state.isConfirmVisible}
                onCancel = {this.onCancel}
                onOk = {this.onSave}
                closable = {false}
                footer = {this.state.wasSuccess ? 
                        null : undefined}
                >
                {
                    this.state.wasSuccess ?
                    <div id = "sentFormSuccess">
                        <Icon type="check-circle" theme="twoTone" twoToneColor = "#2ac73c" style = {{fontSize:'100px', margin:'20px'}}/>
                        <Link to = {routes.REQUESTER._Dashboard.path}>
                            <Button type = "primary">Back To Dashboard</Button>
                        </Link>
                    </div> :
                    <Form>
                        <Form.Item label = "Title">
                            <Input value = {this.state.title} placeholder = "Enter a brief title summarizing the document(s)" onChange = {this.handleTitleChange}/>
                        </Form.Item>
                        <Form.Item label = "Description">
                            <TextArea rows = {3} value = {this.state.description} placeholder = "Why are you sending the document(s)? Are there any special notes?" onChange = {this.handleDescChange}/>
                        </Form.Item>
                        <Form.Item label = "Due Date">
                            <DatePicker value = {moment(this.state.date)}onChange = {this.handleDateChange}></DatePicker>
                        </Form.Item>
                    </Form>
                }

            </Modal>
        <Header style={{width: '100%', display: 'inline-flex' , position: 'relative', backgroundColor:"#003f7a"}}>
        <Row style={{width:'100%'}}>
          <Col span={8} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '100%'}}>
        <div style={{width: '72%',  display: 'flex', justifyContent: 'space-evenly' }}>
          <Select onChange={this.handleSelectionChange} defaultValue={BoxType.NONE} style={{width: 120}} >
          <Option value="None" key={0}>None</Option>
              {this.renderOptions()}
          </Select>
        </div>
        </Col>
        <Col span={8} style={{    display: 'flex', justifyContent: 'center'}}>
        <div style={{color: SignatureColors.white}}>
          Assign Users to PDF
          </div>
          </Col>
          <Col span={8} style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
        <div style={{display: 'flex', width: '26%', justifyContent: 'space-evenly', alignItems: 'center'}}>
          <Link to="/request/dashboard"><Button type="danger">Back</Button></Link>
          <Button type="primary" onClick={this.onFinal}>Finalize</Button>
        </div>
        </Col>
        </Row>
        </Header>
        <div id = "PictureToWrap"style = {{position:'relative'}}>
                <canvas ref={this.state.canvasRef} 
                        style = {{ position: 'absolute', zIndex: 81}} 
                        onMouseDown={this.onMouseDown}
                        onMouseUp={this.onMouseUp}
        />
        <img 
          id = "loadedImage"
          onLoad = {this.onLoad}
          src={src}
          onError={this.onError}
          style={{
            borderTopLeftRadius: "11px",
            borderBottomLeftRadius: "11px",
            padding: "0px",
            margin: "auto",
            display: "block",
            }}
        />
        </div>
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
        <Button disabled={this.state.pageNumber===0} onClick={this.onPrev}>Prev</Button>
        Page {this.state.pageNumber+1} of {this.props.numPages}
        <Button disabled={this.state.pageNumber===this.props.numPages-1} onClick={this.onNext}>Next</Button>
        </div>
        
        </>
    );
  }
}
export default FormImage;