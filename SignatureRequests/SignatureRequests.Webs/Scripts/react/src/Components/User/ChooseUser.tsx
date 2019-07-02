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


    render() { 
        return (
            <div id = 'flex-container'>
                <Card id = 'categoryBox'  title = 'Login'>
                    <p>This is a temp login. You will not log in as a specific user</p>
                    <Button  id = 'Button' onClick = {() =>this.props.changeUser(UserType.REGISTERED)}>
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