import * as React from 'react';
import MainPageUser from '../../Entities/MainPageUser';
import UserType from '../../Util/Enums/UserTypes';

export interface IwithUserProps {
    
}
 
export interface IwithUserState {
    user:MainPageUser
}
 
const withUser = (Component: any) => {
    class withUser extends React.Component<IwithUserProps, IwithUserState> {
        state = { 
            user: new MainPageUser({
                id: -1,
                role:"" ,
                name:"" ,
                email:"" ,
                type:UserType.UNKNOWN,
            })
          }

        userUpdated = (data:MainPageUser) =>{
            this.setState({
                user:data
            })
        }


        render() { 
            const ContextProvider = React.createContext<MainPageUser | null>(null).Provider;
            return ( 
               
                <ContextProvider value = {this.state.user}>
                    <Component {...this.props} User = {this.state.user} updateUser = {this.userUpdated}/>
                </ContextProvider>
               
             );
        }
    }

    return withUser;
}

 
export default withUser;