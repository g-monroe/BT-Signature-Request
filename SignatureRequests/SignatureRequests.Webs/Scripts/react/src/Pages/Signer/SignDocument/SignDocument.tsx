import * as React from 'react';
import RequestToCompleteEntity from '../../../Entities/ToComplete/RequestToCompleteEntity';
import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';
import { IUserHandler, UserHandler } from '../../../Handlers/UserHandler';
import { IRequestHandler, RequestHandler } from '../../../Handlers/RequestHandler';
import { Spin, Typography, Button, message } from 'antd';
import SimpleUser from '../../../Entities/ToComplete/SimpleUser';
import { Link } from 'react-router-dom';
import * as routes from '../../Routing/routes';
import SignHeader from '../../../Components/Request/SignHeader';
import FileViewerWBoxes from '../../../Components/Request/FileViewerWBoxes';
import ModelBoxList from '../../../Entities/ToComplete/ModelBoxList';
import { IBoxHandler, BoxHandler } from '../../../Handlers/BoxHandler';
import ModelBox from '../../../Entities/ToComplete/ModelBox';
import BoxType from '../../../Util/Enums/BoxType';
import SignedStatus from '../../../Util/Enums/SignedStatus';
import SignedBoxRequest from '../../../Entities/SignedBoxRequest';

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
    boxesToFinish?:ModelBox[],
    skipToNextSignature?:()=>void,
    numComplete:number
}
 
class SignDocument extends React.Component<ISignDocumentProps, ISignDocumentState> {

    state : ISignDocumentState = {
        numComplete:0
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

    connectActionToBox = async (box:ModelBox, data:any) =>{
        let newBox = new SignedBoxRequest(box)
        switch(box.type){
            case BoxType.DATE:
                newBox.date = data
                newBox.signedStatus = SignedStatus.SIGNED
            break;
            case BoxType.INITIAL:
                try{
                    const newId = (await this.props.userHandler!.getUsersInitialId(this.props.userObject.user.id)).num

                    if (newId <=0 ){
                         message.error("Something went wrong");
                    }else{
                        newBox.signatureId = newId
                        newBox.signedStatus = SignedStatus.SIGNED
                    }
                }catch(e){
                    message.error("Something went wrong");
                }
                
            break;
            case BoxType.SIGNATURE:
                try{
                  
                    const newId = (await this.props.userHandler!.getUsersSigId(this.props.userObject.user.id)).num

                    if (newId <=0 ){
                         message.error("Something went wrong");
                    }else{
                        newBox.signatureId = newId
                        newBox.signedStatus = SignedStatus.SIGNED
                    }
                }catch(e){
                    message.error("Something went wrong");
                }
            break;
            case BoxType.TEXT:
                newBox.text = data
                newBox.signedStatus = SignedStatus.SIGNED
            break;
        }
        const form = this.state.requestData!.form.filePath.split('.');
        const formName = form.slice(0, form.length-1);

        newBox.filePath = `${this.state.requestData!.requestorId}\\${formName}\\${this.state.requestData!.groupId}\\${formName}.pdf`
        const num = await this.props.boxHandler.addSignatureToBox(newBox);

        if(num.num < 0){
            message.error("Something went wrong");
        }

        this.updateBoxes();
        const newNum = this.state.numComplete + 1;
        
        this.setState({
            numComplete: newNum,
        });
    }
    updateBoxes = async () =>{
        try{
            const box = await this.props.boxHandler!.getBoxesOfRequest(this.state.requestData!.id);
            const notFinishedBoxes = box.collection.filter((b) => b.signedStatus !== SignedStatus.SIGNED);
           
    
            this.setState({
                boxes: box,
                boxesToFinish:notFinishedBoxes
            })
        }catch(e){
            this.setState({
                boxes:undefined,
                boxesToFinish:undefined
            })
           }
    
    }

    render() { 
        if(!this.state.requestData || !this.state.sender || ! this.state.boxes || !this.state.boxesToFinish){
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
                    <SignHeader  boxes = {this.state.boxes.collection} data = {this.state.requestData} sentBy = {this.state.sender} toNextSignature = {this.state.skipToNextSignature}/> 

                }
                <FileViewerWBoxes unCompleteBoxes = {this.state.boxesToFinish} boxFilledOut = {this.connectActionToBox} userObject = {this.props.userObject} file = {this.state.requestData.form} boxes = {this.state.boxes} nextSig = {this.saveToNextSig}></FileViewerWBoxes>
                </>

            );
        }
    }

    async componentDidMount(){
       try{
        const request = await this.props.requestHandler!.getRequestByRequestId(this.props.userObject.requestId);
        const user = await this.props.userHandler!.getUser(request.requestorId);
        const box = await this.props.boxHandler!.getBoxesOfRequest(request.id);
        const notFinishedBoxes = box.collection.filter((b) => b.signedStatus !== SignedStatus.SIGNED);
       
        this.setState({
            requestData:request,
            sender:user,
            boxes: box,
            boxesToFinish:notFinishedBoxes
        })
       }catch(e){
        this.setState({
            requestData:undefined,
            sender:undefined,
            boxes:undefined,
            boxesToFinish:undefined
        })
       }

    }
}
 
export default SignDocument;