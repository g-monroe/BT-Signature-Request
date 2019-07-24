import * as React from 'react';
import './Signing.css'
import { Icon , Typography, Progress, Tooltip, Drawer, Tag} from 'antd';
import RequestToCompleteEntity from '../../Entities/ToComplete/RequestToCompleteEntity';
import  { RequestStatusSigning } from '../../Util/Enums/RequestStatus';
import SimpleUser from '../../Entities/ToComplete/SimpleUser';
import BoxType from '../../Util/Enums/BoxType';
import { SignatureColors } from '../../Util/Enums/colors';


export interface ISignHeaderProps {
    data:RequestToCompleteEntity
    numComplete?:number
    sentBy:SimpleUser
    toNextSignature?:() => void
}
 
export interface ISignHeaderState {
    infoVisible:boolean
}
 
class SignHeader extends React.Component<ISignHeaderProps, ISignHeaderState> {
    state : ISignHeaderState = { 
        infoVisible:false
      }

    static defaultProps = {
        numComplete:0
    }

    changeInfoVisibility = (isVisible:boolean) => {
        this.setState({
            infoVisible:isVisible
        })
    } 

    skipToNext = ()=> {
        this.props.toNextSignature && 
        this.props.toNextSignature() 
    }

    getTagColor = () => {
        switch(this.props.data.status){
            case RequestStatusSigning.NOTSTARTED: return "red"
            case RequestStatusSigning.PENDING: return "gold"
            case RequestStatusSigning.COMPLETE:return "green"
        }
    }

    render() { 

        let numPercent = 0;
        this.props.data.boxes.count === 0 || !this.props.data.boxes ?
            numPercent = 100 : 
            numPercent = (this.props.data.boxes.count/this.props.numComplete!)*100;

        return ( 
            <>
            <div id = 'header'>
                <Tooltip title = "More Information" placement = "bottomLeft" arrowPointAtCenter>
                    <Icon type="info-circle" theme="twoTone" twoToneColor = "#604099" style = {{fontSize:'25px'}} onClick = {()=>this.changeInfoVisibility(true)}/>
                </Tooltip>
                <div id = "SignHeaderContent">
                    <Typography.Title level = {3}>{this.props.data.title || "Sign the Document"}</Typography.Title>
                    <Tooltip title = {this.props.numComplete +" out of " + this.props.data.boxes.count + " completed"} placement = 'bottomRight'>
                        <Progress percent = {numPercent} style = {{width:'100%'}}></Progress>
                    </Tooltip>
                </div>
                <Tooltip title = "Skip to Next Signature" placement = "bottomRight" arrowPointAtCenter>
                    <Icon type="right-circle" theme="twoTone" twoToneColor = "#604099" style = {{fontSize:'25px'}} onClick = {this.skipToNext}/>
                </Tooltip>
                
            </div>
            <Drawer visible ={this.state.infoVisible} onClose = {()=>this.changeInfoVisibility(false)} placement = "left" >  
                    <div id = "drawerContents">
                            <Typography.Title level = {4}>{this.props.data.title}
                        
                            <Tag style = {{marginLeft:'2%'}}color = {this.getTagColor()}>{this.props.data.status}</Tag>
                            </Typography.Title>
                    
                        <b id = "drawerHeaders">Sent by: </b>
                        <p id = "drawerText">{this.props.sentBy.name}</p>
                        <b id = "drawerHeaders">Description: </b>
                        <p id = "drawerText">{this.props.data.description}</p>
                    
                        <div id = "drawerDates">
                            <p><b id = "drawerHeaders">{"Sent on: "}</b>{new Date(this.props.data.sentDate).toDateString()}</p>
                            <p><b id = "drawerHeaders">{"Due Date: "}</b>{new Date(this.props.data.dueDate).toDateString()}</p>
                        </div>
                        <b id = "drawerHeaders">Key: </b>
                        <div id = "keyTags">
                            <Tag style = {{marginLeft:'2%'}}color = {SignatureColors.signature}>{BoxType.SIGNATURE}</Tag>
                            <Tag style = {{marginLeft:'2%'}}color = {SignatureColors.initial}>{BoxType.INITIAL}</Tag>
                            <Tag style = {{marginLeft:'2%'}}color = {SignatureColors.date}>{BoxType.DATE}</Tag>
                            <Tag style = {{marginLeft:'2%'}}color = {SignatureColors.text}>{BoxType.TEXT}</Tag>
                        </div>

                        <p>{"Contact "+ this.props.sentBy.name + " at " + this.props.sentBy.email + " for more information."}</p>
                    
                    </div>


            </Drawer>
            </>
         );
    }
}
 
export default SignHeader;