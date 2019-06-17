import * as React from 'react';
import { Menu} from '../node_modules/antd/dist/antd';
import * as routes from './Routing/routes';
import { NavLink, withRouter, RouteComponentProps } from '../node_modules/react-router-dom/index';
import UserType from '../Util/Enums/UserTypes'

export interface INavigationProps {
    userType:UserType
}
 
export interface INavigationState {
    
}
 
class Navigation extends React.Component<RouteComponentProps<{}> &INavigationProps, INavigationState> {
    state : INavigationState = {   }

    
    render() { 

        const {
            location,
            userType
        } = this.props;


        let currRoutes:Array<any> = [];
        let userHome:any;
        switch(userType){
            case UserType.UNKNOWN:
                currRoutes = routes.LoggedOut;
                userHome = routes.COMMON._Login;
                break;
            case UserType.SENDER:
                currRoutes = routes.Request;
                userHome = routes.REQUESTER._Dashboard;
                break;
            case UserType.SIGNER:
                currRoutes = routes.Response;
                userHome = routes.SIGNER._Dashboard;
                break;
        }

        return (  
            <div className="navigation">
                <Menu
                    className="navigation__menu"
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: '64px' }}
                >
                    {
                    currRoutes.map((e) => e.hasNavBar ? 
                    <Menu.Item key={e.path} className="menuItem" style={(location.pathname === e.path) ? {backgroundColor: "#1890ff"} : {backgroundColor: "inherit"}}>
                            <NavLink to={e.link}>
                             {e.breadcrumbName}
                            </NavLink>
                        </Menu.Item>
                    : <div></div>
                    )
                    }

                </Menu>
                <NavLink to = {userHome.link}> <div id="logo"/></NavLink>
            </div>




        );
    }
}
 
export default withRouter(Navigation);