import * as React from 'react';
import RequestToCompleteEntity from '../../../Entities/ToComplete/RequestToCompleteEntity';
import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';
import { IUserHandler, UserHandler } from '../../../Handlers/UserHandler';
import { IRequestHandler, RequestHandler } from '../../../Handlers/RequestHandler';
import { Spin, Typography, Button } from 'antd';
import SimpleUser from '../../../Entities/ToComplete/SimpleUser';
import { Link } from 'react-router-dom';
import * as routes from '../../Routing/routes';
import SignHeader from '../../../Components/Request/SignHeader';
import FileViewerWBoxes from '../../../Components/Request/FileViewerWBoxes';
import ModelBoxList from '../../../Entities/ToComplete/ModelBoxList';
import { IBoxHandler, BoxHandler } from '../../../Handlers/BoxHandler';

export interface ISignDocumentProps {
    userHandler?:IUserHandler
    requestHandler?:IRequestHandler
    userObject:ContextUserObject
    boxHandler:IBoxHandler
}
 
export interface ISignDocumentState {
    requestData?:RequestToCompleteEntity,
    sender?: SimpleUser,
    numViewing?:number,
    boxes?:ModelBoxList //This is a temp state. Gavin is working to add the boxes to the requestData
    skipToNextSignature?:()=>void
}
 
class SignDocument extends React.Component<ISignDocumentProps, ISignDocumentState> {

    state : ISignDocumentState = {
        
    }

    static defaultProps = {
        userHandler: new UserHandler(),
        requestHandler: new RequestHandler(),
        boxHandler:new BoxHandler()
    }

    saveToNextSig = (toNextSig:()=>void) =>{
        this.setState({
            skipToNextSignature:toNextSig
        })
    }

    render() { 
        if(!this.state.requestData || !this.state.sender || ! this.state.boxes){
            return(
                <Spin size = "large"></Spin>
            );
        }else if (this.props.userObject.user.id != this.state.requestData.signerId){
            return (
                <>
                 <Typography.Title level = {1}>Sorry, an error occured</Typography.Title>
                 <Button>
                     <Link to = {routes.REQUESTER._Dashboard.path}>
                     Back To Dashboard
                     </Link>
                </Button>
                </>
            )
        }else{
            return(
                <>
                {
                    this.state.skipToNextSignature && 
                    <SignHeader data = {this.state.requestData} sentBy = {this.state.sender} toNextSignature = {this.state.skipToNextSignature}/> 

                }
                <FileViewerWBoxes userObject = {this.props.userObject} file = {this.state.requestData.form} boxes = {this.state.boxes} NextSig = {this.saveToNextSig}></FileViewerWBoxes>
                </>

            );
        }
    }

    async componentDidMount(){
       try{
        const request = await this.props.requestHandler!.getRequestByRequestId(this.props.userObject.requestId);
        const user = await this.props.userHandler!.getUser(request.requestorId);
        const box = await this.props.boxHandler!.getModelBoxes(this.props.userObject.requestId);
       
        this.setState({
            requestData:request,
            sender:user,
            boxes: box
        })
       }catch(e){
        this.setState({
            requestData:undefined,
            sender:undefined,
            boxes:undefined
        })
       }

    }
}
 
export default SignDocument;