import React from 'react';
import '../Request/Signing.css'
import ModelBox from '../../Entities/ToComplete/ModelBox';

export interface IFormImageWBoxesProps{
    src: string;
    pageNum: number;
    failedSrc:string;
    boxes:ModelBox[];
}
interface IFormImageWBoxesState{
    src: string;
    errored:boolean;
    canvasRef:React.RefObject<HTMLCanvasElement>
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

  fitCanvasToContainer = (rect:any) =>{
    this.state.canvasRef.current!.style.width = '100%';
    this.state.canvasRef.current!.style.height = '100%';
    this.state.canvasRef.current!.width =  rect.width;
    this.state.canvasRef.current!.height =  rect.height;
  }

  drawBoxes = () =>{
    this.props.boxes.forEach((box)=>this.drawBox(box));
  }

  drawBox = (data: ModelBox) =>{
    const canBox = document.getElementById('SimpleCanvas')!.getBoundingClientRect();
    const can = this.state.canvasRef.current;
    const ctx = can!.getContext('2d');
    if(ctx){ 
      const scaleX = canBox.width / data.formWidth;
      const scaleY = canBox.height / data.formHeight;

      ctx.rect(scaleX * data.x, scaleY * data.y, scaleX * data.width, scaleY * data.height);
      ctx.stroke();
    }
  }

  boxClicked = (box: ModelBox, event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) =>{
    //TODO on other branch
  }

  canvasClicked = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) =>{
      const can = document.getElementById('SimpleCanvas')!.getBoundingClientRect();
      const X = event.clientX - can!.left;
      const Y = event.clientY - can!.top;

      this.props.boxes.forEach((box)=>{

        if( box.pageNumber === this.props.pageNum && ((X >= box.x && X <= box.x+box.width && Y >= box.y && Y <= box.y+box.height) ||
          (X >= box.x && X <= box.x+box.width && Y <= box.y && Y >= box.y+box.height) ||
          (X <= box.x && X >= box.x+box.width && Y >= box.y && Y <= box.y+box.height) ||
          (X <= box.x && X >= box.x+box.width && Y <= box.y && Y >= box.y+box.height) ) ){
            this.boxClicked(box, event);
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
            display: "block"
            }}
        />
      </div>
    );
  }
}
export default FormImageWBoxes;