import React from "react";
import { Button} from 'antd';
import "antd/dist/antd.css";
import ContextUserObject from "../WrapperComponents/ContextUserObject";
import FormImageWBoxes, { IFormImageWBoxesProps } from "./FormImageWBoxes";
import SimpleFormEntity from '../../Entities/ToComplete/SimpleFormEntity';
import ModelBoxList from "../../Entities/ToComplete/ModelBoxList";
import { REQUESTER } from "../../Pages/Routing/routes";
import { Link } from "react-router-dom";

export interface IFileViewerProps {
    userObject:ContextUserObject;
    file:SimpleFormEntity
    boxes:ModelBoxList
    nextSig:(toNextSig:()=>void) => void
}
 
export interface IFileViewerState {
    page: number;
    shouldClearPage: boolean;
    currentSignature:number;
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
            return (<FormImageWBoxes    src = {`../../../../../assets/v1/documents/${formName}/${this.state.page}.png`} 
            pageNum = {this.state.page} failedSrc ={"https://assets.cdn.thewebconsole.com/ZWEB5519/product-item/591a517c5057d.jpg"} 
            boxes = {this.props.boxes.collection.filter((box)=>(box.pageNumber === this.state.page))}
            selectedBox = {this.props.boxes.collection[this.state.currentSignature].id}
            userObject = {this.props.userObject}/>);

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
        const nextSig = (this.state.currentSignature === this.props.boxes.count -1) ? 0 : this.state.currentSignature +1;
        const newPageNum = this.props.boxes.collection[nextSig].pageNumber

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
                    bottom:"1%"
                }}
                >
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
                </div>
            </div>
         );    
    };

    async componentDidMount() {
        this.props.nextSig(this.toNextSignature);
    };
}
 
export default FileViewerWBoxes;