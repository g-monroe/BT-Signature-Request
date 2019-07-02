import * as React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import * as routes from '../Routing/routes';

export interface IWelcomeProps {
    
}
 
export interface IWelcomeState {
    
}
 
class Welcome extends React.Component<IWelcomeProps, IWelcomeState> {
    state : IWelcomeState = { 

    }

    render() { 
        return ( 
            <>
                <h1>Welcome to Signatues!</h1>
                <Button>
                    <Link to = {routes.COMMON._Login.link}>
                        Login
                    </Link>
                </Button>
                <h4>or</h4>
                <Button>
                    <Link to = {routes.COMMON._Signup.link}>
                        Signup
                    </Link>
                </Button>
            </>
         );
    }
}
 
export default Welcome;