import * as React from 'react';

export interface IDashboardProps {
    
}
 
export interface IDashboardState {
    
}
 
class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
    state : IDashboardState= {  }
    render() { 
        return ( 
            <h1  id = 'HeaderText'>View DashBoard here</h1>
         );
    }
}
 
export default Dashboard;