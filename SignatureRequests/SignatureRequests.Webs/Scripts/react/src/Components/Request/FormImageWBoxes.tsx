import React from 'react';
import '../Request/Signing.css'
import ModelBox from '../../Entities/ToComplete/ModelBox';
import BoxType from '../../Util/Enums/BoxType';
import SignatureDropDown, { ISignatureDropDownProps } from '../Signatures/SignatureDropDown';
import ContextUserObject from '../WrapperComponents/ContextUserObject';
import { SignatureColors } from '../../Util/Enums/colors';
import SignedStatus from '../../Util/Enums/SignedStatus';
import moment from 'moment';

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
    const normalizedBox = this.normalizeBoxCoords(this.state.boxClicked!);
    const scaleX = canBox.width / normalizedBox.formWidth;
    const scaleY = canBox.height / normalizedBox.formHeight;
   
    if(ctx){
      ctx.clearRect(scaleX*(normalizedBox.x)-5,scaleY*(normalizedBox.y)-5,scaleX*(normalizedBox.width)+10,scaleY*(normalizedBox.height)+10)
      switch(normalizedBox.type){
        case BoxType.INITIAL: 
        case BoxType.SIGNATURE: this.drawImage(normalizedBox);break;
        case BoxType.DATE:
        case BoxType.TEXT: this.drawText(normalizedBox, data);break;

      }
    }
    this.props.boxFilledOutData(normalizedBox, data);
  }

  fitCanvasToContainer = (rect:any) =>{
    this.state.canvasRef.current!.style.width = '100%';
    this.state.canvasRef.current!.style.height = '100%';
    this.state.canvasRef.current!.width =  rect.width;
    this.state.canvasRef.current!.height =  rect.height;
  }

  drawBoxes = () =>{
    this.props.boxes.forEach((box)=>{
      const normalizedBox = this.normalizeBoxCoords(box);
  
      if(box.signedStatus !== SignedStatus.SIGNED){
        this.drawBox(normalizedBox);
      }else if(box.type === BoxType.SIGNATURE || box.type === BoxType.INITIAL){
        this.drawImage(normalizedBox);
      }else{
        this.drawText(normalizedBox);
      }
    });
  }

  drawText = (data: ModelBox, text?: string) =>{
    const canBox = document.getElementById('SimpleCanvas')!.getBoundingClientRect();
    const scaleX = canBox.width / data.formWidth;
    const scaleY = canBox.height / data.formHeight;
    const can = this.state.canvasRef.current;
    const ctx = can!.getContext('2d');
    const widthOfText = 8;
    const heightOfText = 15;
    const textMargin = .1;

    if(ctx){
      ctx.font = "15px Arial"
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "white"
      ctx.fillStyle = "black"
      const writtenText = (data.type === BoxType.TEXT ? (data.text || text) :  moment(data.date || new Date()).format("MMM Do YYYY")) || " ";
      const numCharactersPerLine = Math.floor((data.width * scaleX)/widthOfText)
      const re = new RegExp(`.{1,${numCharactersPerLine}}`,'g');
      const lines = writtenText.match(re);
      let start = ((scaleY *data.y) + .5* data.height) - heightOfText * Math.floor(lines!.length/2);

      lines!.forEach((line, index)=>{
        ctx.strokeText(line || "", (scaleX * data.x) + textMargin * data.width, start + heightOfText * (index + 1), data.width * (1 - 2 * textMargin))
        ctx.fillText(line || "", (scaleX * data.x) + textMargin * data.width, start + heightOfText * (index + 1), data.width * (1 - 2 * textMargin))
      })
    }
  }

  normalizeBoxCoords = (data: ModelBox) =>{
    if(data.width < 0){
      data.x = data.x + data.width;
      data.width = -1 * data.width;
    }
    if(data.height < 0){
      data.y = data.y + data.height;
      data.height = -1 * data.height;
    }
    return data;
  }

  drawImage = (data: ModelBox) =>{
    const canBox = document.getElementById('SimpleCanvas')!.getBoundingClientRect();
    const scaleX = canBox.width / data.formWidth;
    const scaleY = canBox.height / data.formHeight;
    const boxWidth = scaleX * data.width;
    const boxHeight = scaleY * data.height;

    const image = new Image();
    image.src = `../../../../../assets/v1/images/${data.type === BoxType.SIGNATURE ? "signatures" : "initials"}/${this.props.userObject.user.id}.png`;
    image.onload = () =>{
      const diffHeight = (boxHeight / image.height);
      const diffWidth =  (boxWidth / image.width);
 
      const imageHeightWidthratio = image.height / image.width;
      let newWidth;
      let newHeight;
      let newX = data.x *scaleX;
      let newY = data.y *scaleY;
      
      if(diffHeight > 1 && diffWidth > 1){ //Image is too small
        if(diffWidth< diffHeight){ //Grow to box width
          newWidth = boxWidth;
          newHeight = imageHeightWidthratio * newWidth;
          newY = newY + (.5 * (boxHeight - newHeight));
        }else{ //Grow to box height
          newHeight = boxHeight;
          newWidth = (1.0/imageHeightWidthratio) * newHeight;
          newX = newX + (.5*(boxWidth - newWidth))
        }
      }else if (diffHeight > 1 && diffWidth < 1){ //Image is too wide
          newWidth = boxWidth;
          newHeight = imageHeightWidthratio * newWidth;
          newY = newY + (.5 * (boxHeight - newHeight));
      }else if (diffHeight < 1 && diffWidth > 1) { // Image is too tall
          newHeight = boxHeight;
          newWidth = (1.0/imageHeightWidthratio) * newHeight;
          newX = newX + (.5*(boxWidth - newWidth))
      }else { //Image is too big overall
        if(diffHeight < diffWidth){
          newHeight = boxHeight;
          newWidth = (1.0/imageHeightWidthratio) * newHeight;
          newX = newX + (.5*(boxWidth - newWidth))
        }else {
          newWidth = boxWidth;
          newHeight = imageHeightWidthratio * newWidth;
          newY = newY + (.5 * (boxHeight - newHeight));

        }
      }

      const can = this.state.canvasRef.current;
      const ctx = can!.getContext('2d');
      if(ctx){
        ctx.globalAlpha = 1;
        ctx.drawImage(image, newX, newY, newWidth, newHeight)
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
      ctx.globalAlpha = 1;
      switch(data.type){
        case BoxType.SIGNATURE: ctx.fillStyle = SignatureColors.signature; ctx.strokeStyle = SignatureColors.signature;break;
        case BoxType.INITIAL: ctx.fillStyle = SignatureColors.initial; ctx.strokeStyle = SignatureColors.initial; break;
        case BoxType.DATE: ctx.fillStyle = SignatureColors.date; ctx.strokeStyle = SignatureColors.date; break;
        case BoxType.TEXT: ctx.fillStyle = SignatureColors.text; ctx.strokeStyle = SignatureColors.text; break;
        default: ctx.fillStyle = SignatureColors.black; ctx.strokeStyle = SignatureColors.black; break; 
      }
      if(this.props.selectedBox && data.id === this.props.selectedBox){
        
        ctx.lineWidth = 5;
        ctx.rect(scaleX * data.x, scaleY * data.y, scaleX * data.width, scaleY * data.height);   
        ctx.stroke();
      }

      ctx.globalAlpha = .2;
      ctx.fillRect(scaleX * data.x, scaleY * data.y, scaleX * data.width, scaleY * data.height);
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