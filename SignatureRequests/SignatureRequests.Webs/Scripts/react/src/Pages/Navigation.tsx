import * as React from 'react';
import { Menu} from 'antd';
import * as routes from './Routing/routes';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
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
            case UserType.REGISTERED:
                currRoutes = routes.Registered;
                userHome = routes.REQUESTER._Dashboard;
                break;
        }

        const menuObjects = currRoutes.map((e) => e.hasNavBar ? 
            <Menu.Item key={e.path} className="menuItem" style={(location.pathname === e.path) ? {backgroundColor: "#1890ff"} : {backgroundColor: "inherit"}}>
                <NavLink to={e.path}>
                    {e.breadcrumbName}
                </NavLink>
            </Menu.Item>
            
        : undefined

        )

        return (  
           
            <div className="navigation">
            
               {
                   menuObjects ?
                   <Menu
                        className="navigation__menu"
                        theme="dark"
                        mode="horizontal"
                        style={{ lineHeight: '64px' }}
                    >
                    {menuObjects} 
                   </Menu> :
                   <div></div>
               }
                <NavLink to = {userHome.path}> <div id="logo"/></NavLink>
            
            </div>




        );
    }
}
 
export default withRouter(Navigation);