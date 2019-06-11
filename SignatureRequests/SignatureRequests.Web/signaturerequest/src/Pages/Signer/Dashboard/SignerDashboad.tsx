import * as React from 'react';

export interface ISignerDashboardProps {
    
}
 
export interface ISignerDashboardState {
    
}
 
class SignerDashboard extends React.Component<ISignerDashboardProps, ISignerDashboardState> {
    state :ISignerDashboardState= {  }
    render() { 
        return (  
            <h1  id = 'HeaderText'>Dashboard</h1>
        );
    }
}
 
export default SignerDashboard;