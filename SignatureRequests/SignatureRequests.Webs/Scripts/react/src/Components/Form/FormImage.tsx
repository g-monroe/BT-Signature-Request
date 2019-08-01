import React, { Component } from 'react';
import BoxRequest from '../../Entities/BoxRequest';
import ContextUserObject from '../WrapperComponents/ContextUserObject';
import SignedStatus from '../../Util/Enums/SignedStatus';
import SignerType from '../../Util/Enums/SignerType';
import { SignatureColors } from '../../Util/Enums/colors';
import BoxType from '../../Util/Enums/BoxType';
import ActionType from '../../Util/Enums/ActionType';
import { Button, Select, Icon, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { Layout } from "antd";

const { Header, Content } = Layout;

const { Option } = Select;
const PictureToWrap = "PictureToWrap";

export interface IFormImageProps{
  src: string;
  failedSrc:string;
  userObject: ContextUserObject;
  pageChange: (change: number, boxes: BoxRequest[], signerType: SignerType, boxType: BoxType, actionType: ActionType) => void;
  numPages: number;
  pageNum: number;
  handleSave: (boxes: BoxRequest[]) => void;
  signerType: SignerType;
  boxType: BoxType;
  actionType: ActionType;
  boxesDrawn: BoxRequest[];
}

interface IFormImageState{
  src: string;
  errored:boolean;
  mouseDown: boolean;
  boxesDrawn: BoxRequest[]; 
  drawnBox?: BoxRequest;
  selectedBox?: BoxRequest;
  xVal: number;
  yVal: number;
  height: number;
  width: number;
  type: BoxType;
  signerType: SignerType;
  actionType: ActionType;
  canvasRef:React.RefObject<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null;
  isBoxSelected: boolean;
  pageNumber: number;
  isCanvasRendered: boolean;
}

class FormImage extends React.Component<IFormImageProps, IFormImageState> {

  state: IFormImageState = {
    src: this.props.src,
    errored: false,
    boxesDrawn: this.props.boxesDrawn,
    drawnBox: new BoxRequest({
        width: 0,
        height: 0,
        xVal: 0,
        yVal: 0,
        type: "",
        signerType: "",
        signedStatus: "",
        requestId: null,
        signatureId: null
    }),
    mouseDown: false,
    xVal: 0,
    yVal: 0,
    height: 0,
    width: 0,
    canvasRef: React.createRef(),
    ctx: null,
    isBoxSelected: false,
    pageNumber: this.props.pageNum,
    isCanvasRendered: false,
    type: this.props.boxType,
    signerType: this.props.signerType,
    actionType: this.props.actionType
  };
  
  fitCanvasToContainer = (rect:any) =>{
    this.state.canvasRef.current!.style.width = '100%';
    this.state.canvasRef.current!.style.height = '100%';
    this.state.canvasRef.current!.width =  rect.width;
    this.state.canvasRef.current!.height =  rect.height;
  }

  async componentDidMount(){
    (await this.setState({
      ctx : this.state.canvasRef.current!.getContext("2d")
    }));
    let rect = document.getElementById(PictureToWrap)!.getBoundingClientRect();
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

  onMouseDown = (event:any) => {
    let rect = document.getElementById(PictureToWrap)!.getBoundingClientRect();
    if(!this.state.isCanvasRendered){
      this.setState({
        isCanvasRendered: true
      });
      this.fitCanvasToContainer(rect);
    }
    
    if(this.state.signerType !== SignerType.NONE && this.state.type !== BoxType.NONE && this.state.actionType === ActionType.ADD){
      this.setState({
          xVal: event.clientX-rect.left,
          yVal: event.clientY-rect.top,
          height: 0,
          width: 0,
          mouseDown: true,
          isBoxSelected: false
      });
    }else if(this.state.actionType === ActionType.EDIT){
      this.boxSelected(event.clientX-rect.left, event.clientY-rect.top);
    }

    this.drawBoxes();
  };

onMouseUp = (event:any) => {
  if(this.state.mouseDown){
    let rect = document.getElementById("loadedImage")!.getBoundingClientRect();
    let boxes = this.state.boxesDrawn;
    let box = new BoxRequest({
        width: this.state.width,
        height: this.state.height,
        x: Math.floor(this.state.xVal),
        y: Math.floor(this.state.yVal),
        type: this.state.type!,
        signerType: this.state.signerType!,
        signedStatus: SignedStatus.NOTSIGNED,
        formId: this.props.userObject.formId,
        pageNumber: this.state.pageNumber,
        isModel: true,
        formHeight: Math.floor(rect.height),
        formWidth: Math.floor(rect.width)
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

            //TEXT
            ctx!.fillStyle = SignatureColors.labels;
            ctx!.font = "11px Verdana";
            ctx!.globalAlpha = 1.0;
            (await this.setState({
              ctx: ctx
            }));
            this.state.ctx!.fillText(this.state.boxesDrawn[i].signerType, 
                                     this.state.boxesDrawn[i].x < this.state.boxesDrawn[i].x+this.state.boxesDrawn[i].width ?  this.state.boxesDrawn[i].x+2 : this.state.boxesDrawn[i].x+this.state.boxesDrawn[i].width+2, 
                                     this.state.boxesDrawn[i].y < this.state.boxesDrawn[i].y+this.state.boxesDrawn[i].height ?  this.state.boxesDrawn[i].y+13 : this.state.boxesDrawn[i].y+this.state.boxesDrawn[i].height+13);

            //RESET COLOR
            ctx!.globalAlpha = 0.2;
            ctx!.fillStyle = this.determineColor(this.state.type);
            (await this.setState({
              ctx: ctx
            }));

            //BORDER
            if(this.state.isBoxSelected && this.state.boxesDrawn[i] === this.state.selectedBox && this.state.actionType === ActionType.EDIT){
              ctx!.globalAlpha = 1.0;
              ctx!.strokeStyle = this.determineColor(this.state.boxesDrawn[i].type);
              this.setState({
                ctx: ctx
              });
              this.state.ctx!.strokeRect(this.state.boxesDrawn[i].x, this.state.boxesDrawn[i].y, this.state.boxesDrawn[i].width, this.state.boxesDrawn[i].height);
            }
            this.state.ctx!.stroke();
        }
    }
  }

  onMouseMove = async (event:any) => {
    let rect = document.getElementById(PictureToWrap)!.getBoundingClientRect();
      if(this.state.mouseDown===true){
          let ctx = this.state.ctx;
          ctx!.globalAlpha = 0.2;
          ctx!.fillStyle = this.determineColor(this.state.type);
          this.setState({
              ctx: ctx,
              height: (event.clientY - rect.top) - this.state.yVal,
              width: (event.clientX - rect.left) - this.state.xVal
          });
          (await this.drawBoxes());
          this.state.ctx!.beginPath();
          this.state.ctx!.fillRect(this.state.xVal, this.state.yVal, this.state.width, this.state.height);
          this.state.ctx!.stroke();
      }
  }

  onNext = () => {
    this.props.pageChange(1, this.state.boxesDrawn, this.state.signerType, this.state.type, this.state.actionType);

  };

  onPrev = () => {
    this.props.pageChange(-1, this.state.boxesDrawn, this.state.signerType, this.state.type, this.state.actionType);
  };

  signerTypeChange = (value: any) => {
    this.setState({
      signerType: value
    });
  };

  typeChange = (value: any) => {
    this.setState({
      type: value
    });
  };

  onSave = async () => {
    (await this.props.handleSave(this.state.boxesDrawn));
  };

  onLoad = async () => {
    let rect = document.getElementById("loadedImage")!.getBoundingClientRect();
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

  addSelected = () => {
    this.setState({
      actionType: ActionType.ADD
    });
  }

  editSelected = () => {
    this.setState({
      actionType: ActionType.EDIT
    });
  }

  handleUndo = () => {
    let lastBox = this.state.boxesDrawn.pop();
    let boxes = this.state.boxesDrawn.filter(box => box != lastBox);
    this.setState({
      boxesDrawn: boxes
    });
    this.drawBoxes();
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

  render() {
    const { src } = this.state;

    return (
        <>
        <Header style={{width: '100%', display: 'inline-flex' , position: 'relative'}}>
        <Row style={{width:'100%'}}>
          <Col span={8} style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '100%'}}>
        <div style={{width: '72%',  display: 'flex', justifyContent: 'space-evenly' }}>
          <Select defaultValue={this.state.signerType} style={{width: 120}} onChange={this.signerTypeChange}>
            <Option value={SignerType.NONE}>None</Option>
            <Option value={SignerType.REQUESTOR}>Requestor</Option>
            <Option value={SignerType.SIGNER}>Signer</Option>
          </Select>
          <Select defaultValue={this.state.type} style={{width:120}} onChange={this.typeChange}>
            <Option value={BoxType.NONE}>None</Option>
            <Option value={BoxType.SIGNATURE} style={{color: SignatureColors.signature}}>Signature</Option>
            <Option value={BoxType.INITIAL} style={{color: SignatureColors.initial}}>Initial</Option>
            <Option value={BoxType.DATE} style={{color: SignatureColors.date}}>Date</Option>
            <Option value={BoxType.TEXT} style={{color: SignatureColors.text}}>Text</Option>
          </Select>
          <Button onClick={this.addSelected} icon="plus" ghost={this.state.actionType === ActionType.ADD}/>
          <Button onClick={this.editSelected} icon="edit" ghost={this.state.actionType === ActionType.EDIT}/>
          <Button type={"danger"} disabled={!this.state.isBoxSelected || (this.state.actionType !== ActionType.EDIT)} onClick={this.removeBox} icon="delete"/>
          <Button type={"default"} onClick={this.handleUndo} icon="undo"/>
        </div>
        </Col>
        <Col span={8} style={{    display: 'flex', justifyContent: 'center'}}>
        <div style={{color: SignatureColors.white}}>
          Add Boxes to PDF
          </div>
          </Col>
          <Col span={8} style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
        <div style={{display: 'flex', width: '26%', justifyContent: 'space-evenly', alignItems: 'center'}}>
          <Link to="/request/dashboard"><Button type="default">Skip</Button></Link>
          <Link to="/request/dashboard"><Button type="primary" onClick={this.onSave}>Save</Button></Link>
        </div>
        </Col>
        </Row>
        </Header>
        <div id = "PictureToWrap"style = {{position:'relative'}}>
                <canvas ref={this.state.canvasRef} 
                        style = {{ position: 'absolute', zIndex: 81}} 
                        onMouseDown={this.onMouseDown}
                        onMouseMove={this.onMouseMove}
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
            <Button 
                    disabled={this.state.pageNumber===0}
                    onClick={this.onPrev}>
                    Prev
                </Button>
                  Page {this.state.pageNumber+1} of {this.props.numPages}  
                <Button 
                    disabled={this.state.pageNumber===this.props.numPages-1}
                    onClick={this.onNext}>
                    Next
                </Button>
        </div>
        
        </>
    );
  }
}
export default FormImage;