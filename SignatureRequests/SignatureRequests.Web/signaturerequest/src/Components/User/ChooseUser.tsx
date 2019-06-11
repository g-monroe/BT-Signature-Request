import * as React from 'react';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import UserType from '../../Util/Enums/UserTypes';

export interface ChooseUserProps {
    changeUser:(newUser: UserType) => void
}
 
export interface ChooseUserState {
    
}
 
class ChooseUser extends React.Component<ChooseUserProps, ChooseUserState> {
    state = {   }

    chooseUserType = (newUser: UserType) =>{
        this.props.changeUser(newUser)
    }


    render() { 
        return (
            <div>
                <Card title = 'Requester'>
                    <p>Choose this option to view the app as a user able to send out documents</p>
                    <Button onClick = {() =>this.chooseUserType(UserType.SENDER)}>
                        Select
                    </Button>
                </Card>
                <Card title = 'Signer'>
                    <p>Choose this option to view the app as a user able to receive/sign the documents</p>
                    <Button onClick = {() =>this.chooseUserType(UserType.SIGNER)}>
                        Select
                    </Button>
                </Card>


            </div>

          );
    }
}
 
export default ChooseUser;