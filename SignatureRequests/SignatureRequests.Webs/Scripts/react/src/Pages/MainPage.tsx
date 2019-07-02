import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
import * as routes from './Routing/routes';
import Navigation from './Navigation';
import UserType from '../Util/Enums/UserTypes';
import MainPageUser from '../Entities/MainPageUser';
import withUser from '../Components/WrapperComponents/withUser';
import withNavigation from '../Components/WrapperComponents/withNavigation';


export interface MainPageProps {
    
}
 
export interface MainPageState {
    user: MainPageUser
}
const ALL_ROUTES = routes.All;

class MainPage extends React.Component<MainPageProps, MainPageState> {
    state : MainPageState= { 
        user: new MainPageUser({
            id: -1,
            role:"" ,
            name:"" ,
            email:"" ,
            type:UserType.UNKNOWN,
        })
    }

    changeUser = (User: MainPageUser) =>{
        this.setState({
            user:User
        })
    }



    render() { 
        return ( 
            <Router >
                <Layout style = {{height:'100%'}}>
                   <Layout.Content>
                        {
                                <Switch>
                                {
                                ALL_ROUTES.map((route,i) => {
                                    const WithUser = withUser(route.component);
                                    const withNav = withNavigation(WithUser);
                                    return (
                                    <Route 
                                    key={i} 
                                    path={route.path} 
                                    exact 
                                    breadcrumbName={route.breadcrumbName}
                                    component={WithUser} 
                                    />
                                    )
                                })
                                }
                                </Switch> 
                        }
                                                  
                   </Layout.Content>
                </Layout>
            </Router>


         );
    }
}
 
export default MainPage;