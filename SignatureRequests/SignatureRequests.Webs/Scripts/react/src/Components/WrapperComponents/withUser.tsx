import * as React from 'react';
import MainPageUser from '../../Entities/MainPageUser';
import UserType from '../../Util/Enums/UserTypes';
import {UserConsumer} from '../../Pages/MainPage';

export interface IwithUserProps {
    updateUserType: (data:UserType) => void
}
 
export interface IwithUserState {
    user:MainPageUser
}
 
const withUser = (Component: any) => {
    class withUser extends React.Component<IwithUserProps, IwithUserState> {
        state = { 
            user: this.context
          }

        userUpdated = (data:MainPageUser) =>{
            this.props.updateUserType(data.type);
            this.setState({
                user:data
            })
        }


        render() { 
    
            return ( 
                
                <UserConsumer>
                    {(user) =>{
                        console.log(user);
                        return <Component {...this.props} UserObject = {user}/> 
                        }}
                </UserConsumer>
               
             );
        }
    }

    return withUser;
}


 
export default withUser;