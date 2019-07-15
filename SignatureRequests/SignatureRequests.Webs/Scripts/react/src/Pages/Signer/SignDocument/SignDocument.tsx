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

export interface ISignDocumentProps {
    userHandler?:IUserHandler
    requestHandler?:IRequestHandler
    userObject:ContextUserObject
    requestID:number
}
 
export interface ISignDocumentState {
    requestData?:RequestToCompleteEntity,
    sender?: SimpleUser,
    numViewing?:number
}
 
class SignDocument extends React.Component<ISignDocumentProps, ISignDocumentState> {

    static defaultProps = {
        userHandler: new UserHandler(),
        requestHandler: new RequestHandler()
    }
    
    render() { 
        if(!this.state.requestData || !this.state.sender){
            return(
                <Spin size = "large"></Spin>
            );
        }else if (this.props.userObject.user.id != this.state.requestData.signerId){
            return (
                <>
                 <Typography.Title level = {1}>Sorry, an error occured</Typography.Title>
                 <Button>
                     <Link to = {routes.REQUESTER._Dashboard.link}>
                     Back To Dashboard
                     </Link>
                </Button>
                </>
            )
        }else{
            return(
                <SignHeader data = {this.state.requestData} sentBy = {this.state.sender}/>
            );
        }
    }

    async componentDidMount(){
       
        const request = await this.props.requestHandler!.getRequestByRequestId(this.props.requestID);
        const user = await this.props.userHandler!.getUser(request.requestorId);
       
        this.setState({
            requestData:request,
            sender:user
        })

    }
}
 
export default SignDocument;