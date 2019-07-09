import * as React from 'react';
import {UserConsumer} from '../../Pages/MainPage';

export interface IWithUserProps {
}
 
export interface IWithUserState {

}
 
const WithUser = (Component: any) => {
    class WithUser extends React.Component<IWithUserProps, IWithUserState> {
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
    return WithUser;
}

export default WithUser;