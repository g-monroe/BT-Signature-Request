import React from 'react';
import '../Request/Signing.css'

interface IFormImageProps{
    src: string;
    pageNum: number;
    failedSrc:string;
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

  drawBox = () =>{

  }

  render() {
    const { src } = this.state;

    return (
      <div id = "DivWCanvasAndImage">
        <canvas id = "SimpleCanvas"
                ref = {this.state.canvasRef}
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
    },100)
  }
}
export default FormImageWBoxes;