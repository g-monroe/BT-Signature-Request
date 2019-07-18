import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
import * as routes from './Routing/routes';
import UserType from '../Util/Enums/UserTypes';
import MainPageUser from '../Entities/MainPageUser';
import WithUser from '../Components/WrapperComponents/WithUser';
import WithNavigation from '../Components/WrapperComponents/WithNavigation';
import ContextUserObject from '../Components/WrapperComponents/ContextUserObject';


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

    updateUser = (User: MainPageUser) =>{
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
                                    let WwithUser = WithUser(route.component);
                                    if(!route.hideNavBar){
                                        WwithUser = WithNavigation(WwithUser);
                                    }
                                    return (
                                    <Route 
                                    key={i} 
                                    path={route.path}
                                    exact
                                    breadcrumbName={route.breadcrumbName}
                                    render={(props:any)=><UserProvider value = {{user:this.state.user, formId: props.match.params.id, requestId: props.match.params.requestid,update:this.updateUser}}><WwithUser></WwithUser></UserProvider>}
                                     
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

export const UserContext = React.createContext<ContextUserObject>( new ContextUserObject())

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
