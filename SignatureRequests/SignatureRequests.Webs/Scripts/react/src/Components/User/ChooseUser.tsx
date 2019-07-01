import * as React from 'react';
import { Card, Button } from 'antd';
import UserType from '../../Util/Enums/UserTypes';
import * as routes from '../../Pages/Routing/routes'
import { Link } from 'react-router-dom';


export interface IChooseUserProps {
    changeUser:(newUser: UserType) => void
}
 
export interface IChooseUserState {
    
}
 
class ChooseUser extends React.Component<IChooseUserProps, IChooseUserState> {

    chooseUserType = (newUser: UserType) =>{
        this.props.changeUser(newUser)
    }


    render() { 
        return (
            <div id = 'flex-container'>
                <Card id = 'categoryBox' title = 'Signer'>
                    <p>Choose this option to view the app </p>
                    <Button id = 'Button' onClick = {() =>this.chooseUserType(UserType.REGISTERED)}>
                        <Link to = {routes.REQUESTER._Dashboard.link}> 
                            Select
                        </Link>
                    </Button>
                </Card>


            </div>

          );
    }
}
 
export default ChooseUser;