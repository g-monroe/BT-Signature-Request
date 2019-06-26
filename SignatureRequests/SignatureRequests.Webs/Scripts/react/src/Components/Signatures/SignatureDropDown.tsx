import * as React from 'react';
import { TypesOfBoxes, DropDownState } from './enums';
import { Menu, Dropdown, Icon, DatePicker, Button, Modal } from 'antd';
import SignatureBox from './SignatureBox';
import { manualInputTypes } from '../../Util/Enums/SelectTypes';

export interface ISignatureDropDownProps {
    type:TypesOfBoxes  
    existing?:boolean

}
 
export interface ISignatureDropDownState {
    status:DropDownState
    menuVisible:boolean
    modalVisible:boolean
    info:any
}
 
class SignatureDropDown extends React.Component<ISignatureDropDownProps, ISignatureDropDownState> {
    state : ISignatureDropDownState= { 
        status: DropDownState.Selecting,
        menuVisible:false,
        modalVisible:false,
        info:undefined
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
        console.log(data,"info change saved");
    }

    handleSubmitButton = () =>{
        this.setState({
            modalVisible:false,
            menuVisible:false
        })
    }

    handleCancel = () =>{
        this.setState({
            modalVisible:false,
            menuVisible:false,
            status:DropDownState.Selecting,
            info:undefined
        })
    }



    render() { 
        const menu = 
            <Menu>
                
                    {
                        this.props.type === TypesOfBoxes.Date ?
                            <Menu.Item key = {0} onClick = {()=> this.setState({status:DropDownState.Date, menuVisible:true})}>Select the date: {" "}
                                <DatePicker onChange = {this.handleInfoChange}></DatePicker> {" "}
                                {this.state.info ?
                                    <Button onClick = {this.handleSubmitButton}>Submit</Button> :
                                    <Button onClick = {this.handleSubmitButton} disabled>Submit</Button>
                                }
                            </Menu.Item> : <></>   
                    }
                    {
                        this.props.type === TypesOfBoxes.Initial ? 
                        [<Menu.Item key = {0} onClick = {()=> this.setState({status:DropDownState.NewInitial, modalVisible:true,menuVisible:false})}>Add new Initials</Menu.Item>,
                            this.props.existing ? 
                                <Menu.Item key = {1}>Use previous Initials</Menu.Item>: <></>]
                            : <></>   
                    }
                    {
                        this.props.type === TypesOfBoxes.Signature ? 
                        [<Menu.Item key = {0} onClick = {()=> this.setState({status:DropDownState.NewSignature, modalVisible:true,menuVisible:false})}>Add new Signature</Menu.Item>,
                            this.props.existing ? 
                                <Menu.Item key = {1}>Use previous Signature</Menu.Item>: <></>]
                            : <></>   
                    }
               
            </Menu>
         
        return ( 
            <div>
                <Dropdown overlay = {menu} trigger = {['click']} onVisibleChange = {this.handleVisChange} visible = {this.state.menuVisible}>
                    <a href = '#'>Fill in the Box {" "}
                        <Icon type="plus-circle"/>
                    </a>
                </Dropdown>
                {console.log(this.state.status)}
                {   
                    this.state.status === DropDownState.NewInitial ?
                        <Modal 
                            visible = {this.state.modalVisible}
                            title = "Draw your initials below"
                            onOk = {this.handleSubmitButton}
                            onCancel = {this.handleCancel}
                            footer = {[
                                <Button key = "back" onClick = {this.handleCancel}>Back</Button>,
                                <Button key = "submit" onClick = {this.handleSubmitButton} type = "primary">Submit</Button>
                            ]}
                        >
                            <SignatureBox signType = {manualInputTypes[1]}></SignatureBox>
                        </Modal>
                        : <></>
                }
                {   
                    this.state.status === DropDownState.NewSignature ?
                        <Modal
                            visible = {this.state.modalVisible}
                            title = "Draw your signature below"
                            onOk = {this.handleSubmitButton}
                            onCancel = {this.handleCancel}
                            footer = {[
                                <Button key = "back" onClick = {this.handleCancel}>Back</Button>,
                                <Button key = "submit" onClick = {this.handleSubmitButton} type = "primary">Submit</Button>
                            ]}
                        >
                            <SignatureBox signType = {manualInputTypes[0]}></SignatureBox>
                        </Modal>
                : <></>
                }
            </div>
            
         );
    }
}
 
export default SignatureDropDown;