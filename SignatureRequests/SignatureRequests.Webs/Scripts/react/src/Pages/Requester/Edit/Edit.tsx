import * as React from 'react';
import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';
import FileViewer from '../../../Components/Form/FileViewer';
import { Stage, Layer, Rect,} from 'react-konva';
import BoxRequest from '../../../Entities/BoxRequest';
import '../../../Components/Signatures/DrawTest.css'
import { relative } from 'path';
import BoxEntity from '../../../Entities/BoxEntity';
import SignedStatus from "../../../Util/Enums/SignedStatus";

export interface IEditProps {
   userObject: ContextUserObject;
}
 
export interface IEditState {
    mouseDown: boolean;
    boxesDrawn: BoxRequest[];
    drawnBox?: BoxRequest;
    xVal: number;
    yVal: number;
    height: number;
    width: number;
    type?: string;
    signerType?: string;
    canvasRef:React.RefObject<HTMLCanvasElement>;
    ctx: CanvasRenderingContext2D | null;
    //boolean for type and signer type
    isTypeSelected: boolean;
    isSignerTypeSelected: boolean;
    pageNumber: number;

}
 
class Edit extends React.Component<IEditProps, IEditState> {

    state: IEditState = {
        boxesDrawn: [],
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
        isTypeSelected: false,
        isSignerTypeSelected: false,
        pageNumber: 1
    };

    onMouseDown = (event:any) => {
        this.setState({
            xVal: event.clientX,
            yVal: event.clientY ,
            height: 0,
            width: 0,
            mouseDown: true
        });
    };


    onMouseUp = (event:any) => {
        let boxes = this.state.boxesDrawn;
        let box = new BoxRequest({
            Width: this.state.width,
            Height: this.state.height,
            X: this.state.xVal,
            Y: this.state.yVal,
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

        console.log(boxes);
    };

    drawBoxes = () => {
        let i=0;
        for(i=0; i<this.state.boxesDrawn.length; i++){
            if(this.state.boxesDrawn[i].pageNumber == this.state.pageNumber){
                this.state.ctx!.beginPath();
                this.state.ctx!.fillStyle = "#E3E1DF";
                this.state.ctx!.fillRect(this.state.boxesDrawn[i].xVal, this.state.boxesDrawn[i].yVal, this.state.boxesDrawn[i].width, this.state.boxesDrawn[i].height);
                this.state.ctx!.stroke();
            }
        }
    }

    onMouseMove = (event:any) => {
        
        if(this.state.mouseDown==true){
            this.setState({
                height: event.clientY - this.state.yVal,
                width: event.clientX - this.state.xVal
            });
            this.state.ctx!.clearRect(0,0,this.state.canvasRef.current!.width,this.state.canvasRef.current!.height);
            this.drawBoxes();
            this.state.ctx!.beginPath();
            this.state.ctx!.fillStyle = "#E3E1DF";
            this.state.ctx!.fillRect(this.state.xVal, this.state.yVal, this.state.width, this.state.height);
            this.state.ctx!.stroke();
        
        }
    }

    fitCanvasToContainer = () =>{
    
        this.state.canvasRef.current!.style.width = '100%';
        this.state.canvasRef.current!.style.height = '100%';
    
        this.state.canvasRef.current!.width =  this.state.canvasRef.current!.offsetWidth;
        this.state.canvasRef.current!.height =  this.state.canvasRef.current!.offsetHeight;
    }
    
    componentDidMount() {
        this.setState({
            ctx : this.state.canvasRef.current!.getContext("2d")
        });
        this.fitCanvasToContainer();
    };

    pageChange = (num: number) => {
        this.setState({
            pageNumber: this.state.pageNumber+num
        });
        this.state.ctx!.clearRect(0,0,this.state.canvasRef.current!.width,this.state.canvasRef.current!.height);
        this.drawBoxes();
    }

    render() { 
        return (  
            <>
                <div style = {{     display: "flex",
                            position: "relative",
                            border: "5px black",
                            height:'100%',
                            width:'100%',
                            flexDirection:'column',
                            justifyContent:'space-around',
                            alignItems:'center'}}>
                <canvas ref={this.state.canvasRef} 
                        width={window.innerWidth}
                        height={window.innerHeight}
                        style = {{ position: 'absolute', zIndex: 81, borderColor: "yellow" }} 
                        onMouseDown={this.onMouseDown}
                        onMouseMove={this.onMouseMove}
                        onMouseUp={this.onMouseUp}
        />
                
                <FileViewer
                    userObject={this.props.userObject}
                    pageChange={this.pageChange}
                >
                </FileViewer>
                </div>
            </>
        );
    }
}
 
export default Edit;