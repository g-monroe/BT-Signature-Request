import * as React from 'react';

export interface IDashboardProps {
    
}
 
export interface IDashboardState {
    
}
 
class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
    state : IDashboardState= {  }
    render() { 
        return ( 
            <h3>View DashBoard here</h3>
         );
    }
}
 
export default Dashboard;