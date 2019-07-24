import React, { Component } from 'react';
import BoxRequest from '../../Entities/BoxRequest';
import ContextUserObject from '../WrapperComponents/ContextUserObject';
import SignedStatus from '../../Util/Enums/SignedStatus';
import SignerType from '../../Util/Enums/SignerType';
import BoxType from '../../Util/Enums/BoxType';
import { Button, Select } from 'antd';
import { Link } from 'react-router-dom';
import FileViewer from './FileViewer';
import RequestStatus from '../../Util/Enums/RequestStatus';
import BoxEntity from '../../Entities/BoxEntity';

const { Option } = Select;
const PictureToWrap = "PictureToWrap";

interface IFormImageProps{
  src: string;
  failedSrc:string;
  userObject: ContextUserObject;
  pageChange: (change: number, boxes: BoxEntity[]) => void;
  boxesDrawn: BoxEntity[];
  numPages: number;
  pageNum: number;
  parent: FileViewer;
  handleSave: (boxes: BoxEntity[]) => void;
}

interface IFormImageState{
  src: string;
  errored:boolean;
  mouseDown: boolean;
  boxesDrawn: BoxEntity[];
  drawnBox?: BoxEntity;
  xVal: number;
  yVal: number;
  height: number;
  width: number;
  type?: string;
  signerType?: string;
  canvasRef:React.RefObject<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null;
  isTypeSelected: boolean;
  isSignerTypeSelected: boolean;
  pageNumber: number;
  isCanvasRendered: boolean;
}

class FormImage extends React.Component<IFormImageProps, IFormImageState> {

  state: IFormImageState = {
    src: this.props.src,
    errored: false,
    boxesDrawn: this.props.boxesDrawn,
    drawnBox: new BoxEntity({
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
    isTypeSelected: false,
    isSignerTypeSelected: false,
    pageNumber: this.props.pageNum,
    isCanvasRendered: false
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
    const rect = document.getElementById(PictureToWrap)!.getBoundingClientRect();
    this.fitCanvasToContainer(rect);
    (await this.drawBoxes());
  }

  onError = () => {
    if (!this.state.errored) {
      this.setState({
        src: this.props.failedSrc,
        errored: true,
      });
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
    this.drawBoxes();
    let sent = false;
    this.props.boxesDrawn.map((box) =>{
      if ((box.x <= (event.clientX - rect.left) && (box.x + box.width) >= (event.clientX - rect.left)) &&
         (box.y <= (event.clientY - rect.top) && (box.y + box.height) >= (event.clientY - rect.top)) && box.pageNumber === this.state.pageNumber){
          this.props.parent.showOption(true, box.x + rect.left, box.y, box);
         sent = true;
      }else{
        if (!sent){
          this.props.parent.showOption(false, 0, 0, box);
        }
      }
    });
    if(this.state.isSignerTypeSelected && this.state.isTypeSelected){
      this.setState({
          xVal: event.clientX-rect.left,
          yVal: event.clientY-rect.top,
          height: 0,
          width: 0,
          mouseDown: true
      });
    }
};

onMouseUp = (event:any) => {
  if(this.state.mouseDown){
    let boxes = this.state.boxesDrawn;
    let box = new BoxEntity({
        Width: this.state.width,
        Height: this.state.height,
        X: Math.floor(this.state.xVal),
        Y: Math.floor(this.state.yVal),
        Type: this.state.type!,
        SignerType: this.state.signerType!,
        SignedStatus: SignedStatus.NOTSIGNED,
        FormId: this.props.userObject.formId,
        PageNumber: this.state.pageNumber,
        IsModel: true
    });
    boxes.push(box);
    this.setState({
        boxesDrawn: boxes,
        mouseDown: false
    });
  }
};

drawBoxes = async () => {
    let i=0;
    for(i=0; i<this.state.boxesDrawn.length; i++){
        if(this.state.boxesDrawn[i].pageNumber === this.state.pageNumber){
            this.state.ctx!.beginPath();
            let ctx = this.state.ctx;
            let found = false;
            let boxX = 0;
            let boxY = 0;
            let name = "";
            this.props.parent.state.requests!.map((request) =>{
              request.boxes.collection.map((box) =>{
                if (box.x === this.state.boxesDrawn[i].x && box.y === this.state.boxesDrawn[i].y){
                  boxX = box.x;
                  boxY = box.y;
                  name = request.signer.name;
                  found = true;
                }
              })
            })
            if (found){
              ctx!.fillStyle = "#90EE90";
            }else{
              ctx!.fillStyle = "#E3E1DF";
            }
            (await this.setState({
              ctx: ctx
            }));
            this.state.ctx!.fillRect(this.state.boxesDrawn[i].x, this.state.boxesDrawn[i].y, this.state.boxesDrawn[i].width, this.state.boxesDrawn[i].height);
            this.state.ctx!.stroke();
            ctx!.fillStyle = "#000";
            ctx!.font = "14px Arial";
            ctx!.fillText(name, boxX + 5, boxY + 5);
        }
    }
}

onMouseMove = async (event:any) => {
    const rect = document.getElementById(PictureToWrap)!.getBoundingClientRect();
    if(this.state.mouseDown===true){
        let ctx = this.state.ctx;
        ctx!.fillStyle = "#E3E1DF";
        this.setState({
            ctx: ctx,
            height: (event.clientY - rect.top) - this.state.yVal,
            width: (event.clientX - rect.left) - this.state.xVal
        });
        this.state.ctx!.clearRect(0,0,this.state.canvasRef.current!.width,this.state.canvasRef.current!.height);
        (await this.drawBoxes());
        this.state.ctx!.beginPath();
        this.state.ctx!.fillRect(this.state.xVal, this.state.yVal, this.state.width, this.state.height);
        this.state.ctx!.stroke();
    
    }
}

onNext = () => {
  this.props.pageChange(1, this.state.boxesDrawn);
  this.drawBoxes();
};

onPrev = () => {
  this.props.pageChange(-1, this.state.boxesDrawn);
  this.drawBoxes();
};

signerTypeChange = (value: any) => {
  this.setState({
    signerType: value,
    isSignerTypeSelected: value !== SignerType.NONE
  });
};

typeChange = (value: any) => {
  this.setState({
    type: value,
    isTypeSelected: value !== BoxType.NONE
  });
};

onSave = async () => {
  (await this.props.handleSave(this.state.boxesDrawn));
};

  render() {
    const { src } = this.state;

    return (
        <>
        <div id = "PictureToWrap"style = {{position:'relative'}}>
                <canvas ref={this.state.canvasRef} 
                        style = {{ position: 'absolute', zIndex: 81}} 
                        onMouseDown={this.onMouseDown}
                        onMouseMove={this.onMouseMove}
                        onMouseUp={this.onMouseUp}
        />
        <img 
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