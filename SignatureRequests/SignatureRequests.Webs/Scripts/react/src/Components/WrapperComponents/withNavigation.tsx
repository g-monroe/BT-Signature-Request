import * as React from 'react';
import UserType from '../../Util/Enums/UserTypes';
import {Layout} from 'antd';
import Navigation from '../../Pages/Navigation';

export interface IwithNavigationProps {
    
}
 
export interface IwithNavigationState {
    type:UserType
}
 

const withNavigation = (Component: any) => {
    class withNavigation extends React.Component<IwithNavigationProps, IwithNavigationState> {
        
        state : IwithNavigationState = {  
            type:UserType.UNKNOWN
        }

        updateUserType = (data:UserType) =>{
            console.log("Update user type reached");
            this.setState({
                type:data
            })
        }




        render() { 
            const ContextProvider = React.createContext<UserType | null>(null).Provider;
            return ( 
               
                <ContextProvider value = {this.state.type}>
                <Layout>
                    <Layout.Header>
                        <Navigation userType = {this.state.type}></Navigation>
                    </Layout.Header>
                    <Layout.Content>
                        <Component {...this.props} updateUserType = {this.updateUserType}/>
                    </Layout.Content>
                </Layout>
                </ContextProvider>
               
             );
        }
    }
    return withNavigation;
}
 
export default withNavigation;