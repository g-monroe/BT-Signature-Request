import * as React from 'react';
import {Layout} from 'antd';
import Navigation from '../../Pages/Navigation';
import {UserConsumer} from '../../Pages/MainPage'

export interface IwithNavigationProps {
    
}
 
export interface IwithNavigationState {

}

const withNavigation = (Component: any) => {
    class withNavigation extends React.Component<IwithNavigationProps, IwithNavigationState> {
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