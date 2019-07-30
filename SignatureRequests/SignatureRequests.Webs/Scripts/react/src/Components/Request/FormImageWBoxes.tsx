import React from 'react';
import '../Request/Signing.css'
import ModelBox from '../../Entities/ToComplete/ModelBox';
import BoxType from '../../Util/Enums/BoxType';
import SignatureDropDown, { ISignatureDropDownProps } from '../Signatures/SignatureDropDown';
import ContextUserObject from '../WrapperComponents/ContextUserObject';
import { SignatureColors } from '../../Util/Enums/colors';
import SignedStatus from '../../Util/Enums/SignedStatus';

interface SigDropDownXY extends ISignatureDropDownProps{
  x:number,
  y:number
}

export interface IFormImageWBoxesProps{
    src: string;
    pageNum: number;
    failedSrc:string;
    boxes:ModelBox[];
    selectedBox?:number; //The id of the selected box
    userObject:ContextUserObject;
    boxFilledOutData: (box:ModelBox, data:any) =>void;
}

interface IFormImageWBoxesState{
    src: string;
    errored:boolean;
    canvasRef:React.RefObject<HTMLCanvasElement>
    dropDown?:SigDropDownXY
    boxClicked?:ModelBox
}

class FormImageWBoxes extends React.Component<IFormImageWBoxesProps, IFormImageWBoxesState> {

    state:IFormImageWBoxesState = {
      src: this.props.src,
      errored: false,
      canvasRef: React.createRef(),
      boxClicked:undefined
    };

  onError = () => {
    if (!this.state.errored) {
      this.setState({
        src: this.props.failedSrc,
        errored: true,
      });
    }
  }

  clickedBoxSigned = (data: any) =>{
    const can = this.state.canvasRef.current;
    const ctx = can!.getContext('2d');
    const canBox = document.getElementById('SimpleCanvas')!.getBoundingClientRect();
    const scaleX = canBox.width / data.formWidth;
    const scaleY = canBox.height / data.formHeight;

    if(ctx){
      ctx.clearRect(scaleX*(this.state.boxClicked!.x)-5,scaleY*(this.state.boxClicked!.y)-5,scaleX*(this.state.boxClicked!.width)+10,scaleY*(this.state.boxClicked!.height)+10)
      switch(this.state.boxClicked!.type){
        case BoxType.INITIAL: 
        case BoxType.SIGNATURE: this.drawImage(this.state.boxClicked!);break;
        case BoxType.DATE:
        case BoxType.TEXT: this.drawText(this.state.boxClicked!);break;

      }
    }
    this.props.boxFilledOutData(this.state.boxClicked!, data);
  }

  fitCanvasToContainer = (rect:any) =>{
    this.state.canvasRef.current!.style.width = '100%';
    this.state.canvasRef.current!.style.height = '100%';
    this.state.canvasRef.current!.width =  rect.width;
    this.state.canvasRef.current!.height =  rect.height;
  }

  drawBoxes = () =>{
    this.props.boxes.forEach((box)=>{
      if(box.signedStatus !== SignedStatus.SIGNED){
        this.drawBox(box);
      }else if(box.type === BoxType.SIGNATURE || box.type === BoxType.INITIAL){
        this.drawImage(box);
      }else{
        this.drawText(box);
      }
    });
  }
  drawText = (data: ModelBox) =>{
    const canBox = document.getElementById('SimpleCanvas')!.getBoundingClientRect();
    const scaleX = canBox.width / data.formWidth;
    const scaleY = canBox.height / data.formHeight;

    const can = this.state.canvasRef.current;
    const ctx = can!.getContext('2d');
    if(ctx){
      ctx.globalAlpha = 1;
      ctx.fillText(data.text || (data.date && new Date(data.date!).toDateString()) || "", scaleX * (data.x + (.5 * data.width)), scaleY * (data.y + (.5 * data.height), data.width))
    }
  }

  drawImage = (data: ModelBox) =>{
    const canBox = document.getElementById('SimpleCanvas')!.getBoundingClientRect();
    const scaleX = canBox.width / data.formWidth;
    const scaleY = canBox.height / data.formHeight;

    const image = new Image();
    image.src = `../../../../../assets/v1/images/${data.type === BoxType.SIGNATURE ? "signatures" : "initials"}/${this.props.userObject.user.id}.png`;
    image.onload = () =>{
      const can = this.state.canvasRef.current;
      const ctx = can!.getContext('2d');
      if(ctx){
        ctx.globalAlpha = 1;
        ctx.drawImage(image, scaleX * data.x, scaleY* data.y, scaleX * data.width, scaleY * data.height)
      }
    }
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

      if(this.props.selectedBox && data.id === this.props.selectedBox){
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
      dropDown: undefined,
      boxClicked:box
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
        const scaleX = can.width / box.formWidth;
        const scaleY = can.height / box.formHeight;

        const scaledX = box.x * scaleX;
        const scaledY = box.y * scaleY;
        const scaledWidth = box.width * scaleX;
        const scaledHeight = box.height * scaleY;

        if( box.signedStatus !== SignedStatus.SIGNED && box.pageNumber === this.props.pageNum && ((X >= scaledX && X <= scaledX+scaledWidth && Y >= scaledY && Y <= scaledY+scaledHeight) ||
          (X >= scaledX && X <= scaledX+scaledWidth && Y <= scaledY && Y >= scaledY+scaledHeight) ||
          (X <= scaledX && X >= scaledX+scaledWidth && Y >= scaledY && Y <= scaledY+scaledHeight) ||
          (X <= scaledX && X >= scaledX+scaledWidth && Y <= scaledY && Y >= scaledY+scaledHeight) ) ){
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
            <SignatureDropDown userObject = {this.props.userObject} type = {this.state.dropDown.type} startVisible = {true} dataAdded = {this.clickedBoxSigned}/>
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