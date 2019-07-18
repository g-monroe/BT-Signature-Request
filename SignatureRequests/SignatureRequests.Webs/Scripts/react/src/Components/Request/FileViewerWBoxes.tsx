import React from "react";
import { Button} from 'antd';
import "antd/dist/antd.css";
import ContextUserObject from "../WrapperComponents/ContextUserObject";
import FormImage from "./FormImageWBoxes";
import SimpleFormEntity from '../../Entities/ToComplete/SimpleFormEntity';

export interface IFileViewerProps {
    userObject:ContextUserObject;
    file:SimpleFormEntity
}
 
export interface IFileViewerState {
    fileUploaded: boolean;
    page: number;
    images: JSX.Element[];
    clearPage: boolean;
}
 
class FileViewer extends React.Component<IFileViewerProps, IFileViewerState> {

    state: IFileViewerState = {
        fileUploaded: false,
        page: 0,
        images: [],
        clearPage: true
    };
    
    async componentDidMount() {
        let file = this.props.file;
        let items = [];
        let form = file.filePath.split('.');
        let formName = form.slice(0, form.length-1);
        for(let i = 0; i<file.numPages; i++){
            let newItem = <FormImage pageNum={i} src={`../../../../../assets/v1/documents/${formName}/${i}.png`} failedSrc={"https://assets.cdn.thewebconsole.com/ZWEB5519/product-item/591a517c5057d.jpg"}/>;
            items.push(newItem);
        }
        this.setState({
            fileUploaded: true,
            images: items
        });
    };
    
    onNext = () => {
        this.setState({
            page: this.state.page+1,
            clearPage: true
        });
    };

    onPrev = () => {
        this.setState({
            page: this.state.page-1,
            clearPage: true
        })
    };

    clearPage = () : JSX.Element => {
        return <></>;
    };

    renderpage = (): JSX.Element =>{
        if(this.state.clearPage){
            this.setState({
                clearPage: false
            });
            return <></>;
        }
        const {page, images} = this.state;
        for(let i=0; i<images.length; i++){
            if(images[i].props.pageNum == page){
                return images[i];
            }
        }
        return images[0];
    }

    render() { 
        if(!this.state.fileUploaded){
            return <div>Loading...</div>;
        } else{
            
        return (
            <div id = "FileViewerWBoxes"> 
                {this.clearPage()}
                {this.renderpage()}
                <div
                style={{
                    borderTopLeftRadius: "11px",
                    borderBottomLeftRadius: "11px",
                    padding: "0px",
                    margin: "auto",
                    paddingRight: "5px",
                    display: "block",
                    textAlign: "center"
                }}
                >
                    <Button 
                        disabled={this.state.page==0}
                        onClick={this.onPrev}>
                        Prev
                    </Button>
                      Page {this.state.page+1} of {this.props.file.numPages}  
                    <Button 
                        disabled={this.state.page==this.props.file.numPages-1}
                        onClick={this.onNext}>
                        Next
                    </Button>
                </div>
            </div>
         );
        }
        
    };
}
 
export default FileViewer;