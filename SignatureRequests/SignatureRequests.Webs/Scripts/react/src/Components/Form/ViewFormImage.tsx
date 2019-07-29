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
import ModelBox from '../../Entities/ToComplete/ModelBox';

const { Header, Content } = Layout;

const { Option } = Select;
const PictureToWrap = "PictureToWrap";

export interface IViewFormImageProps{
  src: string;
  failedSrc:string;
  userObject: ContextUserObject;
  pageChange: (change: number, boxes: ModelBox[]) => void;
  numPages: number;
  pageNum: number;
  boxesDrawn: ModelBox[];
}

interface IViewFormImageState{
  src: string;
  errored:boolean;
  mouseDown: boolean;
  boxesDrawn: ModelBox[];
  selectedBox?: BoxRequest;
  canvasRef:React.RefObject<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null;
  isBoxSelected: boolean;
  pageNumber: number;
  isCanvasRendered: boolean;
  formHeight: number;
  formWidth: number;
}

class ViewFormImage extends React.Component<IViewFormImageProps, IViewFormImageState> {

  state: IViewFormImageState = {
    src: this.props.src,
    errored: false,
    boxesDrawn: this.props.boxesDrawn,
    mouseDown: false,
    canvasRef: React.createRef(),
    ctx: null,
    isBoxSelected: false,
    pageNumber: this.props.pageNum,
    isCanvasRendered: false,
    formHeight: 0,
    formWidth: 0
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

            this.state.ctx!.stroke();
        }
    }
  }

  onNext = () => {
    this.props.pageChange(1, this.state.boxesDrawn);

  };

  onPrev = () => {
    this.props.pageChange(-1, this.state.boxesDrawn);
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
        {/* <Header style={{width: '100%', display: 'inline-flex' , position: 'relative'}}>
        <Row style={{width:'100%'}}>
        <Col span={24} style={{    display: 'flex', justifyContent: 'center'}}>
        <div style={{color: SignatureColors.white}}>
          Add Boxes to PDF
          </div>
          </Col>
        </Row>
        </Header> */}
        <div id = "PictureToWrap"style = {{position:'relative'}}>
                <canvas ref={this.state.canvasRef} 
                        style = {{ position: 'absolute', zIndex: 81}}
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
export default ViewFormImage;