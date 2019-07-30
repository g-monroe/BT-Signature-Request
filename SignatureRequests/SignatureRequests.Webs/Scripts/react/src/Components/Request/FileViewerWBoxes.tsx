import React from "react";
import { Button, Tooltip} from 'antd';
import "antd/dist/antd.css";
import ContextUserObject from "../WrapperComponents/ContextUserObject";
import FormImageWBoxes from "./FormImageWBoxes";
import SimpleFormEntity from '../../Entities/ToComplete/SimpleFormEntity';
import ModelBoxList from "../../Entities/ToComplete/ModelBoxList";
import { REQUESTER } from "../../Pages/Routing/routes";
import { Link } from "react-router-dom";
import ModelBox from "../../Entities/ToComplete/ModelBox";

export interface IFileViewerProps {
    userObject:ContextUserObject;
    file:SimpleFormEntity
    boxes:ModelBoxList
    unCompleteBoxes:ModelBox[]
    nextSig:(toNextSig:()=>void) => void
    boxFilledOut: (box:ModelBox, data:any) =>void
}
 
export interface IFileViewerState {
    page: number;
    shouldClearPage: boolean;
    currentSignature:number; //The index of the current signature
}
 
class FileViewerWBoxes extends React.Component<IFileViewerProps, IFileViewerState> {

    state: IFileViewerState = {
        page: 0,
        shouldClearPage: true,
        currentSignature:0
    };
    
    onNext = () => {
        this.setState({
            page: this.state.page+1,
            shouldClearPage: true
        });
    };

    onPrev = () => {
        this.setState({
            page: this.state.page-1,
            shouldClearPage: true
        })
    };
    
    renderpage = (): JSX.Element =>{
        if(this.state.shouldClearPage){
            this.setState({
                shouldClearPage: false
            });
            return <></>;
        }
        const form = this.props.file.filePath.split('.');
        const formName = form.slice(0, form.length-1);

        try{
            return (<FormImageWBoxes    src = {`../../../../../assets/v1/documents/${this.props.userObject.user.id}/${formName}/${this.state.page}.png`} 
            pageNum = {this.state.page} failedSrc ={"https://assets.cdn.thewebconsole.com/ZWEB5519/product-item/591a517c5057d.jpg"} 
            boxes = {this.props.boxes.collection.filter((box)=>(box.pageNumber === this.state.page))}
            selectedBox = {this.props.unCompleteBoxes[this.state.currentSignature] ? this.props.unCompleteBoxes[this.state.currentSignature].id : undefined}
            userObject = {this.props.userObject}
            boxFilledOutData = {this.props.boxFilledOut}/>);

        }catch{
            return(
                <>An Error Occurred
                <Button type = "primary">
                    <Link to = {REQUESTER._Dashboard.path}>
                        Back to Dashboard
                    </Link>
                </Button> 
                </>
            )
        }
    }

    toNextSignature = () =>{

        const nextSig = (this.state.currentSignature >= this.props.unCompleteBoxes.length -1) ? 0 : this.state.currentSignature +1;
        const newPageNum = this.props.unCompleteBoxes[nextSig].pageNumber
        
        
        this.setState({
            currentSignature: nextSig,
            page: newPageNum,
            shouldClearPage: true
        })
    }

    render() {   
        return (
            <div id = "FileViewerWBoxes"> 
                {
                        this.renderpage()
                }
                <div
                style={{
                    padding: "0px",
                    margin: "auto",
                    paddingRight: "5px",
                    textAlign: "center",
                    width:"100%",
                    position:"fixed",
                    bottom:"1%",
                    display:"flex"
                }}
                >

                            <Tooltip title = "All Progress is Saved" placement = "topLeft" >
                                <Button >
                                    Back to Dashboard
                                </Button>
                            </Tooltip>
  
                            <Button 
                                disabled={this.state.page===0}
                                onClick={this.onPrev}
                                style = {{marginRight:"2%"}}>
                                Prev
                            </Button>
                              Page {this.state.page+1} of {this.props.file.numPages}  
                            <Button 
                                disabled={this.state.page===this.props.file.numPages-1}
                                onClick={this.onNext}
                                style = {{marginLeft:"2%"}}>
                                Next
                            </Button>

                            <Tooltip title = {this.props.unCompleteBoxes.length !== 0 ? "Not all boxes are complete":"Finish document"}placement = "topRight" >
                                <Button disabled = {this.props.unCompleteBoxes.length !== 0} type = "primary">
                                    Finalize
                                </Button>
                            </Tooltip>

                </div>
            </div>
         );    
    };

    async componentDidMount() {
        this.props.nextSig(this.toNextSignature);
    };
}
 
export default FileViewerWBoxes;