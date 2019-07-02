import * as React from 'react';
import UserType from '../../Util/Enums/UserTypes';
import {Layout} from 'antd';
import Navigation from '../../Pages/Navigation';
import {UserConsumer} from '../../Pages/MainPage'
export interface IwithNavigationProps {
    
}
 
export interface IwithNavigationState {
    type:any
}
 

const withNavigation = (Component: any) => {
    class withNavigation extends React.Component<IwithNavigationProps, IwithNavigationState> {
        
        state : IwithNavigationState = {  
            type:UserType.UNKNOWN
        }

        updateUser = (data:UserType) =>{
            console.log("Update user type reached");
            this.setState({
                type:data
            })
        }




        render() { 
    
            return (  

                    <Layout>
                        <Layout.Header>
                            <UserConsumer>
                                {user => <Navigation userType = {user.user.type}></Navigation>}
                            </UserConsumer>
                            
                        </Layout.Header>
                        <Layout.Content>
                            <Component/>
                        </Layout.Content>
                    </Layout>  
 
             );
        }
    }
    return withNavigation;
}
 
export default withNavigation;