import React from 'react';
import '../Request/Signing.css'
import ModelBox from '../../Entities/ToComplete/ModelBox';
import BoxType from '../../Util/Enums/BoxType';
import SignatureDropDown, { ISignatureDropDownProps } from '../Signatures/SignatureDropDown';
import ContextUserObject from '../WrapperComponents/ContextUserObject';
import { SignatureColors } from '../../Util/Enums/colors';

interface SigDropDownXY extends ISignatureDropDownProps{
  x:number,
  y:number
}

export interface IFormImageWBoxesProps{
    src: string;
    pageNum: number;
    failedSrc:string;
    boxes:ModelBox[];
    selectedBox:number;
    userObject:ContextUserObject;
    boxFilledOutData: (data:any) =>void;
}

interface IFormImageWBoxesState{
    src: string;
    errored:boolean;
    canvasRef:React.RefObject<HTMLCanvasElement>
    dropDown?:SigDropDownXY
}

class FormImageWBoxes extends React.Component<IFormImageWBoxesProps, IFormImageWBoxesState> {

    state:IFormImageWBoxesState = {
      src: this.props.src,
      errored: false,
      canvasRef: React.createRef()
    };

  onError = () => {
    if (!this.state.errored) {
      this.setState({
        src: this.props.failedSrc,
        errored: true,
      });
    }
  }

  selectedBoxSigned = (data: any) =>{
      this.props.boxFilledOutData(data);
  }

  fitCanvasToContainer = (rect:any) =>{
    this.state.canvasRef.current!.style.width = '100%';
    this.state.canvasRef.current!.style.height = '100%';
    this.state.canvasRef.current!.width =  rect.width;
    this.state.canvasRef.current!.height =  rect.height;
  }

  drawBoxes = () =>{
    this.props.boxes.forEach((box)=>this.drawBox(box)); //TODO Check if its signed and if so draw the signature instead 
  }

  drawBox = (data: ModelBox) =>{ 
    const canBox = document.getElementById('SimpleCanvas')!.getBoundingClientRect();
    const can = this.state.canvasRef.current;
    const ctx = can!.getContext('2d');
    if(ctx){ 
      const scaleX = canBox.width / data.formWidth;
      const scaleY = canBox.height / data.formHeight;
      
      switch(data.type){
        case BoxType.SIGNATURE: ctx.fillStyle = SignatureColors.signature; ctx.strokeStyle = SignatureColors.signature;break;
        case BoxType.INITIAL: ctx.fillStyle = SignatureColors.initial; ctx.strokeStyle = SignatureColors.initial; break;
        case BoxType.DATE: ctx.fillStyle = SignatureColors.date; ctx.strokeStyle = SignatureColors.date; break;
        case BoxType.TEXT: ctx.fillStyle = SignatureColors.text; ctx.strokeStyle = SignatureColors.text; break;
        default: ctx.fillStyle = SignatureColors.black; ctx.fillStyle = SignatureColors.black; break; 
      }

      if(data.id === this.props.selectedBox){
        ctx.globalAlpha = 1;
        ctx.lineWidth = 5;
        ctx.rect(scaleX * data.x, scaleY * data.y, scaleX * data.width, scaleY * data.height);   
        ctx.stroke();
      }

      ctx.globalAlpha = .2;
      
     
      ctx.fillRect(scaleX * data.x, scaleY * data.y, scaleX * data.width, scaleY * data.height);
      ctx.stroke();
    }
  }

  boxClicked = async (box: ModelBox, event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) =>{
    await this.setState({
      dropDown: undefined
    })

    this.setState({
      dropDown: {
        type:box.type,
        x:event.pageX,
        y:event.pageY
      }
    })
  }

  canvasClicked = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) =>{
      const can = document.getElementById('SimpleCanvas')!.getBoundingClientRect();
      const X = event.clientX - can!.left;
      const Y = event.clientY - can!.top;
      event.persist()
      
      this.props.boxes.forEach((box)=>{
        if( box.pageNumber === this.props.pageNum && ((X >= box.x && X <= box.x+box.width && Y >= box.y && Y <= box.y+box.height) ||
          (X >= box.x && X <= box.x+box.width && Y <= box.y && Y >= box.y+box.height) ||
          (X <= box.x && X >= box.x+box.width && Y >= box.y && Y <= box.y+box.height) ||
          (X <= box.x && X >= box.x+box.width && Y <= box.y && Y >= box.y+box.height) ) ){
            this.boxClicked(box, event);
          }else{
            this.setState({
              dropDown: undefined
            })
          }
      })

  }

  imageLoaded = () =>{
    let rect = document.getElementById('DivWCanvasAndImage')!.getBoundingClientRect();
    this.fitCanvasToContainer(rect);
    if(this.props.boxes.length >0){
      this.drawBoxes();
    }
  }

  render() {
    const { src } = this.state;

    return (
      <>
      {
        this.state.dropDown && 
        
          <div id = 'this'style = {{position: "fixed",top:`${this.state.dropDown.y}px`, left:`${this.state.dropDown.x}px`, zIndex:85}}>
            <SignatureDropDown userObject = {this.props.userObject} type = {this.state.dropDown.type} startVisible = {true} dataAdded = {this.selectedBoxSigned}/>
          </div>
      }
      <div id = "DivWCanvasAndImage">
        <canvas id = "SimpleCanvas"
                ref = {this.state.canvasRef}
                onClick = {this.canvasClicked}
        ></canvas>
        <img 
          src={src}
          onError={this.onError}
          onLoad = {this.imageLoaded}
          style={{
            borderTopLeftRadius: "5px",
            borderBottomLeftRadius: "5px",
            borderBottomRightRadius:'5px',
            borderTopRightRadius:'5px',
            padding: "0px",
            margin: "auto",
            display: "block",
            userSelect: "none",
            outline: "none"
            }}
        />
      </div>
      </>
    );
  }
}
export default FormImageWBoxes;