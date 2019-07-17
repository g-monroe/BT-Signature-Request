import * as React from 'react';
import SendForm from '../../../Components/Form/SendForm';

import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';
import { Layout, Typography, Modal, Form, Input, DatePicker, message, Button, Icon, Drawer, Divider } from 'antd';
import '../../../Components/LogIn-SignUp/Login-SignUp.css'
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import * as routes from '../../Routing/routes'
import { Link } from 'react-router-dom';

export interface ISendProps {
   userObject: ContextUserObject;
}
 
export interface ISendState {
    isInfoVisible:boolean;
    isConfirmVisible:boolean;
    sendFunction?:(title:string, desc:string, dueDate:Date)=>Promise<boolean>;
    title:string;
    description:string;
    date:Date;
    wasSuccess:boolean;
}
 
class Send extends React.Component<ISendProps, ISendState> {
    state : ISendState = {
        isInfoVisible:false,
        isConfirmVisible:false,
        title:"",
        description:"",
        date: new Date(),
        wasSuccess:false
    }

    userPressedSend = (send: (title:string, desc:string, dueDate:Date)=>Promise<boolean>, preTitle:string, preDesc:string)  =>{
        
        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(oneWeekFromNow.getDate()+7);
        
        this.setState({
            sendFunction:send,
            isConfirmVisible:true,
            title:preTitle,
            description:preDesc,
            date:oneWeekFromNow
        })
    }

    onCancel = () =>{
        this.setState({
            isConfirmVisible:false,
            isInfoVisible:false
        })
    }

    onSubmit = async () =>{
        await this.state.sendFunction!(this.state.title, this.state.description, this.state.date).then((isSuccess)=>{
            if(isSuccess){
                message.success("Form successfully sent!");
                this.setState({
                    wasSuccess:true
                })
            }else{
                message.error("Something went wrong");
            }
        })
    }

    onInfoClick = () =>{
        this.setState({
            isInfoVisible:true
        })
    }

    handleTitleChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        this.setState({
            title:e.target.value
        })
    }

    handleDescChange = (e : React.ChangeEvent<HTMLTextAreaElement>) =>{
        this.setState({
            description:e.target.value
        })
    }

    handleDateChange = (date: moment.Moment, dateString: string) =>{
        this.setState({
            date: date.toDate()
        })
    }

    render() { 
        return (  
            <>
            <Layout style = {{height:'100%'}}>
                <Layout.Header style = {{background:"inherit"}}>
                    <div id = "SendHeader">
                        <Typography.Title level = {1}>Request Form Completion</Typography.Title>
                        <Icon type="info-circle" theme="twoTone" twoToneColor = "#604099" style = {{fontSize:'37px', margin:'5px'}} onClick = {this.onInfoClick}/>
                    </div>

                </Layout.Header>.
                <Layout.Content id = "SendFormContent">
                    <div id = "SendForm">
                        <SendForm
                        userObject={this.props.userObject}
                        onPressSend = {this.userPressedSend}
                        >
                        </SendForm>
                    </div>

                </Layout.Content>
            </Layout>

            <Modal
                title = "Some Final Information"
                visible = {this.state.isConfirmVisible}
                onCancel = {this.onCancel}
                onOk = {this.onSubmit}
                closable = {false}
                footer = {this.state.wasSuccess ? 
                        null : undefined}
                >
                {
                    this.state.wasSuccess ?
                    <div id = "sentFormSuccess">
                        <Icon type="check-circle" theme="twoTone" twoToneColor = "#2ac73c" style = {{fontSize:'100px', margin:'20px'}}/>
                        <Link to = {routes.REQUESTER._Dashboard.path}>
                            <Button type = "primary">Back To Dashboard</Button>
                        </Link>
                    </div> :
                    <Form>
                        <Form.Item label = "Title">
                            <Input value = {this.state.title} placeholder = "Enter a brief title summarizing the document(s)" onChange = {this.handleTitleChange}/>
                        </Form.Item>
                        <Form.Item label = "Description">
                            <TextArea rows = {3} value = {this.state.description} placeholder = "Why are you sending the document(s)? Are there any special notes?" onChange = {this.handleDescChange}/>
                        </Form.Item>
                        <Form.Item label = "Due Date">
                            <DatePicker value = {moment(this.state.date)}onChange = {this.handleDateChange}></DatePicker>
                        </Form.Item>
                    </Form>
                }

            </Modal>
            <Drawer
                visible = {this.state.isInfoVisible}
                onClose = {this.onCancel}
                >
                <div id = "SendFormInfo">
                    <p>If no documents are shown on the page, upload a pdf</p>
                    <Link to="/request/create">
                        <Button> 
                          Upload
                        </Button>
                    </Link>
                    <Divider/>
                    <p>Instructions to complete the process of sending the form will be added here when the process is complete</p>
                </div>
            
                
            </Drawer>

            </>
        );
    }
}
 
export default Send;