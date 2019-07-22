import React from 'react';
import '../Request/Signing.css'
import ModelBox from '../../Entities/ToComplete/ModelBox';
import { StackingContext } from 'html2canvas/dist/types/render/stacking-context';
import { element } from 'prop-types';

interface IFormImageProps{
    src: string;
    pageNum: number;
    failedSrc:string;
    boxes:ModelBox[];
}
interface IFormImageState{
    src: string;
    errored:boolean;
    canvasRef:React.RefObject<HTMLCanvasElement>
}
class FormImageWBoxes extends React.Component<IFormImageProps, IFormImageState> {

    state:IFormImageState = {
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
    const can = this.state.canvasRef.current;
    const ctx = can!.getContext('2d');
    if(ctx){ //Do somemath to scale
      ctx.rect(data.x, data.y, data.width, data.height);
      ctx.stroke();
    }
  }

  boxClicked = (box: ModelBox, event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) =>{
    console.log(box, event, "Box clicked!")
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

  componentDidMount(){
    setTimeout(()=>{
      let rect = document.getElementById('DivWCanvasAndImage')!.getBoundingClientRect();
      this.fitCanvasToContainer(rect);
      if(this.props.boxes.length >0){
        this.drawBoxes();
      }
    },100)
  }
}
export default FormImageWBoxes;