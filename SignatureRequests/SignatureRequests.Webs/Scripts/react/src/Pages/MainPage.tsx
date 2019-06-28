import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
import * as routes from './Routing/routes';
import Navigation from './Navigation';
import UserType from '../Util/Enums/UserTypes';
import Login from './login/Login';


export interface MainPageProps {
    
}
 
export interface MainPageState {
    user: UserType
}
const ALL_ROUTES = routes.All;

class MainPage extends React.Component<MainPageProps, MainPageState> {
    state : MainPageState= { 
        user: UserType.UNKNOWN
    }

    changeUser = (User: UserType) =>{
        this.setState({
            user:User
        })
    }



    render() { 
        return ( 
            <Router >
                <Layout>
                    <Layout.Header>
                        <Navigation userType = {this.state.user}></Navigation>
                    </Layout.Header>
                   <Layout.Content>
                        {
                            ((this.state.user === UserType.UNKNOWN) ?
                            <Login userSelected = {this.changeUser}></Login>
                            :
                                <Switch>
                                {
                                ALL_ROUTES.map((route,i) => {
                                    return (
                                    <Route 
                                    key={i} 
                                    path={route.path} 
                                    exact 
                                    breadcrumbName={route.breadcrumbName}
                                    component={route.component} 
                                    />
                                    )
                                })
                                }
                                </Switch> 
                            )
                        }
                   </Layout.Content>
                </Layout>
            </Router>


         );
    }
}
 
export default MainPage;