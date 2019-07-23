import * as React from 'react';
import {  DropDownState } from '../../Util/Enums/SignatureDropDown';
import { Menu, Dropdown, Icon, DatePicker, Button, Drawer, Input } from 'antd';
import SignatureBox from './SignatureBox';
import {manualInputTypeEnum } from '../../Util/Enums/SelectTypes';
import { ISignatureHandler, SignatureHandler } from '../../Handlers/SignatureHandler';
import ContextUserObject from '../WrapperComponents/ContextUserObject';
import './DrawTest.css'
import BoxType from '../../Util/Enums/BoxType';


export interface ISignatureDropDownProps {
    type:BoxType  
    sigHandler?:ISignatureHandler
    userObject?:ContextUserObject
    dataAdded?:(data: any) => void
    startVisible?:boolean

}
 
export interface ISignatureDropDownState {
    status:DropDownState
    menuVisible:boolean
    modalVisible:boolean
    info:any
    existing?:boolean
    text:string
}
 
class SignatureDropDown extends React.Component<ISignatureDropDownProps, ISignatureDropDownState> {
    state : ISignatureDropDownState= { 
        status: DropDownState.Selecting,
        menuVisible:this.props.startVisible ? true : false,
        modalVisible:false,
        info:null,
        existing:false,
        text:""
     }

     static defaultProps = {
        sigHandler: new SignatureHandler(),
        userObject: new ContextUserObject(),
        startVisible:false
     }

    handleVisChange = (bool: boolean) =>{
        this.setState({
            menuVisible:bool
        })
    }

    handleInfoChange = (data:any) =>{
        this.setState({
            info:data
        })
    }

    handleSubmitButton = () =>{
        this.setState({
            modalVisible:false,
            menuVisible:false
        })
        this.updateHasSig();
    }

    handleCancel = () =>{
        this.setState({
            modalVisible:false,
            menuVisible:false,
            status:DropDownState.Selecting,
            info:undefined
        })
    }

    onClickChangeState = (newstatus: DropDownState, modalVis:boolean, menuVis:boolean) =>{
        this.setState({
            status:newstatus,
            modalVisible:modalVis,
            menuVisible:menuVis
        })
    }

    updateHasSig = async () => {
        let isExisting = false;
        if(this.props.userObject!.user.id && this.props.userObject!.user.id > 0){
            this.props.type === BoxType.SIGNATURE ? 
                isExisting = await this.props.sigHandler!.signatureExists(this.props.userObject!.user.id) :
                isExisting = await this.props.sigHandler!.initialExists(this.props.userObject!.user.id)
        }
        this.setState({
            existing:isExisting
        })
    }

    
    handleTextChange = (e : React.ChangeEvent<HTMLTextAreaElement>) =>{
        this.setState({
            text:e.target.value
        })
    }

    render() { 
        const menu = 
            <Menu>
                    {
                        this.props.type === BoxType.DATE &&
                            <Menu.Item key = {0} onClick = {()=> this.onClickChangeState(DropDownState.Date,false,true)}>Select the date: {" "}
                                <DatePicker onChange = {this.handleInfoChange} format = {['DD/MM/YYYY', 'DD/MM/YY']}></DatePicker> {" "}
                                {this.state.info ?
                                    <Button onClick = {this.handleSubmitButton}type = "primary">Submit</Button> :
                                    <Button onClick = {this.handleSubmitButton} disabled>Submit</Button>
                                }
                            </Menu.Item>  
                    }
                    {
                        this.props.type === BoxType.TEXT && 
                            <Menu.Item key = {0}>
                                <div id = "TextAreaInMenu">
                                <Input.TextArea value = {this.state.text} onChange = {this.handleTextChange}></Input.TextArea>
                                <Button onClick = {this.handleSubmitButton} type = "primary" style = {{marginTop:"5px"}}>Submit</Button>
                                </div>
                            </Menu.Item>
                    }
                    {
                        (this.props.type === BoxType.INITIAL  || this.props.type === BoxType.SIGNATURE) && 
                        [<Menu.Item key = {0} onClick = {()=> this.props.type === BoxType.INITIAL ?
                                this.onClickChangeState(DropDownState.NewInitial,true,false) : 
                                this.onClickChangeState(DropDownState.NewSignature,true,false)}> Add new
                                    {this.props.type === BoxType.INITIAL ? " Initials" : " Signature"}
                                </Menu.Item>,
                            this.state.existing && 
                                <Menu.Item key = {1}> Use previous
                                    {this.props.type === BoxType.INITIAL ? " Initials" : " Signature"}   
                                </Menu.Item>]   
                    }
            </Menu>
      
        return ( 
            <>
                <Dropdown overlay = {menu} trigger = {['click']} onVisibleChange = {this.handleVisChange} visible = {this.state.menuVisible}>
                    {
                        this.props.startVisible  ? <div/> :  
                        <Button href = '#' size = "small"> {this.props.type}? {" "}
                            <Icon type="plus-circle"/>
                        </Button>
                    }
                </Dropdown>
                {   
                    this.state.status === DropDownState.NewInitial  || this.state.status === DropDownState.NewSignature ?
                        <Drawer 
                            visible = {this.state.modalVisible}
                            title = {this.state.status === DropDownState.NewInitial ? "Draw your initials below" : "Draw your signature below"}
                            onClose = {this.handleCancel}
                            placement = "bottom"
                            height = "60%"
                            
                        >
                            <SignatureBox sigSaved = {this.handleSubmitButton} signType = {this.state.status === DropDownState.NewInitial ? manualInputTypeEnum.Initial : manualInputTypeEnum.Signature} userObject = {this.props.userObject}></SignatureBox>
                        </Drawer>
                        : <></>
                }
            </>
            
         );
    }

    async componentDidMount () {
        await this.updateHasSig();
    }
}
 
export default SignatureDropDown;