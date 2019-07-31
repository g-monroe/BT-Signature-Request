import * as React from 'react';
import {SignatureColors} from '../../Util/Enums/colors';
import CanvasDraw from 'react-canvas-draw';
import './DrawTest.css'
import { manualInputTypeEnum } from '../../Util/Enums/SelectTypes';

export interface IDrawCanvasProps {
    color?:SignatureColors
    type: manualInputTypeEnum
    getCanvas:(canvas:any) => void
    
}
 
export interface IDrawCanvasState {
    width:string
}
 
class DrawCanvas extends React.Component<IDrawCanvasProps, IDrawCanvasState> {
    static defaultProps = {
        color: SignatureColors.blue
    }
    canvasRef: any;
    constructor(props: IDrawCanvasProps) {
        super(props);
        this.canvasRef = React.createRef()
        this.state = {
            width:'70vw'
        }
    }
    

    determineWidth = () =>{
        const width = (this.props.type === manualInputTypeEnum.Signature) ? //Equal to signature
            '70vw' : '25vw';
        this.clearCanvas();
        return width
    }

    clearCanvas = () =>{
        const can = this.canvasRef.current;
        if(can){
            can.clear();
        }
    }


    render() { 
        return (
            <>
                <CanvasDraw
                    ref = {this.canvasRef}
                    lazyRadius = {2}
                    brushRadius = {1}
                    brushColor = {this.props.color}
                    catenaryColor = '#FFFFFF'
                    canvasWidth = {'100%'}
                    canvasHeight = {'25vh'}
                    hideGrid = {true}
                    >
                </CanvasDraw>
            </> 
         );
    }
    componentDidMount(){
        this.props.getCanvas(this.canvasRef);
    }
}
 
export default DrawCanvas;