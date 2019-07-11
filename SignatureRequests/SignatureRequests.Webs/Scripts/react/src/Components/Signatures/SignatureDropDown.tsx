import * as React from 'react';
import { TypesOfBoxes, DropDownState } from '../../Util/Enums/SignatureDropDown';
import { Menu, Dropdown, Icon, DatePicker, Button, Modal, Drawer } from 'antd';
import SignatureBox from './SignatureBox';
import {manualInputTypeEnum } from '../../Util/Enums/SelectTypes';
import { ISignatureHandler, SignatureHandler } from '../../Handlers/SignatureHandler';
import ContextUserObject from '../WrapperComponents/ContextUserObject';
import './DrawTest.css'


export interface ISignatureDropDownProps {
    type:TypesOfBoxes  
    sigHandler?:ISignatureHandler
    UserObject?:ContextUserObject
    dataAdded?:(data: any) => void
}
 
export interface ISignatureDropDownState {
    status:DropDownState
    menuVisible:boolean
    modalVisible:boolean
    info:any
    existing?:boolean
}
 
class SignatureDropDown extends React.Component<ISignatureDropDownProps, ISignatureDropDownState> {
    state : ISignatureDropDownState= { 
        status: DropDownState.Selecting,
        menuVisible:false,
        modalVisible:false,
        info:null,
        existing:false
     }

     static defaultProps = {
        sigHandler: new SignatureHandler(),
        UserObject: new ContextUserObject()
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
        let bool = false;
        if(this.props.UserObject!.user.id && this.props.UserObject!.user.id > 0){
            this.props.type === TypesOfBoxes.Signature ? 
                bool = await this.props.sigHandler!.signatureExists(this.props.UserObject!.user.id) :
                bool = await this.props.sigHandler!.initialExists(this.props.UserObject!.user.id)
        }

        this.setState({
            existing:bool
        })
    }

    render() { 
        const menu = 
            <Menu>
                
                    {
                        this.props.type === TypesOfBoxes.Date ?
                            <Menu.Item key = {0} onClick = {()=> this.onClickChangeState(DropDownState.Date,false,true)}>Select the date: {" "}
                                <DatePicker onChange = {this.handleInfoChange} format = {['DD/MM/YYYY', 'DD/MM/YY']}></DatePicker> {" "}
                                {this.state.info ?
                                    <Button onClick = {this.handleSubmitButton}>Submit</Button> :
                                    <Button onClick = {this.handleSubmitButton} disabled>Submit</Button>
                                }
                            </Menu.Item> : <></>   
                    }
                    {
                        this.props.type === TypesOfBoxes.Initial  || this.props.type === TypesOfBoxes.Signature? 
                        [<Menu.Item key = {0} onClick = {()=> this.props.type === TypesOfBoxes.Initial ?
                                this.onClickChangeState(DropDownState.NewInitial,true,false) : 
                                this.onClickChangeState(DropDownState.NewSignature,true,false)}> Add new
                                    {this.props.type === TypesOfBoxes.Initial ? " Initials" : " Signature"}
                                </Menu.Item>,
                            this.state.existing ? 
                                <Menu.Item key = {1}> Use previous
                                    {this.props.type === TypesOfBoxes.Initial ? " Initials" : " Signature"}   
                                </Menu.Item>: <></>]
                            : <></>   
                        }
            </Menu>
         
        return ( 
            <>
                <Dropdown overlay = {menu} trigger = {['click']} onVisibleChange = {this.handleVisChange} visible = {this.state.menuVisible}>
                    <Button href = '#' size = "small"> {TypesOfBoxes[this.props.type]}? {" "}
                        <Icon type="plus-circle"/>
                    </Button>
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
                            <SignatureBox SigSaved = {this.handleSubmitButton} signType = {this.state.status === DropDownState.NewInitial ? manualInputTypeEnum.Initial : manualInputTypeEnum.Signature} UserObject = {this.props.UserObject}></SignatureBox>
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