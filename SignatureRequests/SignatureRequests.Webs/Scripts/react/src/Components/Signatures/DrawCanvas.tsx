import * as React from 'react';
import {SignatureColors} from '../../Util/Enums/colors';
import CanvasDraw from 'react-canvas-draw';
import './DrawTest.css'
import { manualInputTypes } from '../../Util/Enums/SelectTypes';
import { Button } from 'antd';

export interface IDrawCanvasProps {
    color?:SignatureColors
    type: String
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
        const width = (this.props.type === manualInputTypes[0]) ? //Equal to signature
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
            <div>
                <CanvasDraw
                    ref = {this.canvasRef}
                    lazyRadius = {2}
                    brushRadius = {1}
                    brushColor = {this.props.color}
                    catenaryColor = '#FFFFFF'
                    canvasWidth = {this.determineWidth()}
                    canvasHeight = {'25vh'}
                    hideGrid = {true}
                    >
                </CanvasDraw>
            </div> 
         );
    }
    componentDidMount(){
        this.props.getCanvas(this.canvasRef);
    }
}
 
export default DrawCanvas;