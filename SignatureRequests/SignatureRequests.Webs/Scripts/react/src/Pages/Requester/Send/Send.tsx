import * as React from 'react';
import SendForm from '../../../Components/Form/SendForm';

import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';
import { Layout, Typography, Modal, Form, Input, DatePicker } from 'antd';
import '../../../Components/LogIn-SignUp/Login-SignUp.css'
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';

export interface ISendProps {
   userObject: ContextUserObject;
}
 
export interface ISendState {
    isInfoVisible:boolean;
    isConfirmVisible:boolean;
    sendFunction?:(title:string, desc:string)=>void;
    title:string;
    description:string;
    date:Date;
}
 
class Send extends React.Component<ISendProps, ISendState> {
    state : ISendState = {
        isInfoVisible:false,
        isConfirmVisible:false,
        title:"",
        description:"",
        date: new Date()
    }

    userPressedSend = (send: (title:string, desc:string)=>void, preTitle:string, preDesc:string)  =>{
        
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
                    <Typography.Title level = {1}>Request Form Completion</Typography.Title>
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
                title = "Some Final Checks"
                visible = {this.state.isConfirmVisible}
                onCancel = {this.onCancel}
                onOk = {() => this.state.sendFunction!(this.state.title, this.state.description)}
                >
        <div id = "sendFormForm">
          
          <Form>
              <Form.Item label = "Title">
                  <Input value = {this.state.title} placeholder = "Enter a brief title summarizing the document(s)" onChange = {this.handleTitleChange}/>
              </Form.Item>
              <Form.Item label = "Description">
                  <TextArea rows = {3} value = {this.state.description} placeholder = "Why are you sending the document(s)? Are there any special notes?" onChange = {this.handleDescChange}/>
              </Form.Item>
              <Form.Item>
                  <DatePicker value = {moment(this.state.date)}onChange = {this.handleDateChange}></DatePicker>
              </Form.Item>
          </Form>
        </div>
            </Modal>

            </>
        );
    }
}
 
export default Send;