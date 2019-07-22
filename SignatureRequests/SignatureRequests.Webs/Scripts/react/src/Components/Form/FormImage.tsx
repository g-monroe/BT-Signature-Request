import React, { Component } from 'react';
import BoxRequest from '../../Entities/BoxRequest';
import ContextUserObject from '../WrapperComponents/ContextUserObject';
import SignedStatus from '../../Util/Enums/SignedStatus';
import SignerType from '../../Util/Enums/SignerType';
import BoxType from '../../Util/Enums/BoxType';
import { Button, Select } from 'antd';
import { Link } from 'react-router-dom';

const { Option } = Select;
const PictureToWrap = "PictureToWrap";

interface IFormImageProps{
  src: string;
  failedSrc:string;
  userObject: ContextUserObject;
  pageChange: (change: number, boxes: BoxRequest[], signerType: string, boxType: string, isSignerTypeSelected: boolean, isTypeSelected: boolean) => void;
  numPages: number;
  pageNum: number;
  handleSave: (boxes: BoxRequest[]) => void;
  signerType: string;
  boxType: string;
  isTypeSelected: boolean;
  isSignerTypeSelected: boolean;
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
  type: string;
  signerType: string;
  canvasRef:React.RefObject<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null;
  isTypeSelected: boolean;
  isSignerTypeSelected: boolean;
  isBoxSelected: boolean;
  pageNumber: number;
  isCanvasRendered: boolean;
  formHeight: number;
  formWidth: number;
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
    isTypeSelected: this.props.isTypeSelected,
    isSignerTypeSelected: this.props.isSignerTypeSelected,
    isBoxSelected: false,
    pageNumber: this.props.pageNum,
    isCanvasRendered: false,
    formHeight: 0,
    formWidth: 0,
    type: this.props.boxType,
    signerType: this.props.signerType
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

  boxSelected = (X: number, Y: number) : boolean => {
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
            return true;
      }
    }
    this.setState({
      isBoxSelected: false
    });
    return false;
  }

  onMouseDown = (event:any) => {
    let rect = document.getElementById(PictureToWrap)!.getBoundingClientRect();
    if(!this.state.isCanvasRendered){
      this.setState({
        isCanvasRendered: true
      });
      this.fitCanvasToContainer(rect);
    }
    
    if(this.state.isSignerTypeSelected && this.state.isTypeSelected){
      this.setState({
          xVal: event.clientX-rect.left,
          yVal: event.clientY-rect.top,
          height: 0,
          width: 0,
          mouseDown: true
      });
    }else{
      this.boxSelected(event.clientX-rect.left, event.clientY-rect.top);
    }

    this.drawBoxes();
  };

onMouseUp = (event:any) => {
  if(this.state.mouseDown){
    let boxes = this.state.boxesDrawn;
    let box = new BoxRequest({
        Width: this.state.width,
        Height: this.state.height,
        X: Math.floor(this.state.xVal),
        Y: Math.floor(this.state.yVal),
        Type: this.state.type!,
        SignerType: this.state.signerType!,
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
  }
};

drawBoxes = async () => {
    this.state.ctx!.clearRect(0,0,this.state.canvasRef.current!.width,this.state.canvasRef.current!.height);
    let i=0;
    for(i=0; i<this.state.boxesDrawn.length; i++){
        if(this.state.boxesDrawn[i].pageNumber === this.state.pageNumber){
            this.state.ctx!.beginPath();
            let ctx = this.state.ctx;
            ctx!.fillStyle = "#E3E1DF";
            (await this.setState({
              ctx: ctx
            })); 
            this.state.ctx!.clearRect(this.state.boxesDrawn[i].x,this.state.boxesDrawn[i].y,this.state.boxesDrawn[i].width,this.state.boxesDrawn[i].height);
            this.state.ctx!.fillRect(this.state.boxesDrawn[i].x, this.state.boxesDrawn[i].y, this.state.boxesDrawn[i].width, this.state.boxesDrawn[i].height);
            if(this.state.isBoxSelected && this.state.boxesDrawn[i] === this.state.selectedBox){
              this.state.ctx!.fillStyle = "#5fb2ff";
              this.state.ctx!.strokeRect(this.state.boxesDrawn[i].x, this.state.boxesDrawn[i].y, this.state.boxesDrawn[i].width, this.state.boxesDrawn[i].height);
            }
            this.state.ctx!.stroke();
        }
    }
  }

  onMouseMove = async (event:any) => {
    let rect = document.getElementById(PictureToWrap)!.getBoundingClientRect();
      if(this.state.mouseDown==true){
          let ctx = this.state.ctx;
          ctx!.fillStyle = "#E3E1DF";
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
    this.props.pageChange(1, this.state.boxesDrawn, this.state.signerType, this.state.type, this.state.isSignerTypeSelected, this.state.isTypeSelected);

  };

  onPrev = () => {
    this.props.pageChange(-1, this.state.boxesDrawn, this.state.signerType, this.state.type, this.state.isSignerTypeSelected, this.state.isTypeSelected);
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

  render() {
    const { src } = this.state;

    return (
        <>
        <div>
          <Select defaultValue={this.state.signerType} style={{width: 120}} onChange={this.signerTypeChange}>
            <Option value={SignerType.NONE}>None</Option>
            <Option value={SignerType.REQUESTOR}>Requestor</Option>
            <Option value={SignerType.SIGNER}>Signer</Option>
          </Select>
          <Select defaultValue={this.state.type} style={{width:120}} onChange={this.typeChange}>
            <Option value={BoxType.NONE}>None</Option>
            <Option value={BoxType.SIGNATURE}>Signature</Option>
            <Option value={BoxType.INITIAL}>Initial</Option>
            <Option value={BoxType.DATE}>Date</Option>
            <Option value={BoxType.TEXT}>Text</Option>
          </Select>
          <Button type={"danger"} disabled={!this.state.isBoxSelected} onClick={this.removeBox}>
            Delete
          </Button>
        </div>
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
        <div>
          <Link to="/request/dashboard"><Button type="default">Cancel</Button></Link>
          <Button type="primary" onClick={this.onSave}>Save</Button>
        </div>
        </>
    );
  }
}
export default FormImage;