import * as React from 'react';
import {UserConsumer} from '../../Pages/MainPage';

export interface IwithUserProps {

}
 
export interface IwithUserState {

}
 
const withUser = (Component: any) => {
    class withUser extends React.Component<IwithUserProps, IwithUserState> {
        render() { 
            return ( 
                <UserConsumer>
                    {(user) =>{
                        return <Component {...this.props} UserObject = {user}/> 
                    }}
                </UserConsumer>
               
             );
        }
    }
    return withUser;
}

export default withUser;