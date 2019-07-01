import * as React from 'react';
import { IUserHandler } from '../../Handlers/UserHandler';
import {withFormik} from 'formik';
import {InjectedFormikProps} from 'formik';
import * as yup from 'yup';
import { Form, Input, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import * as routes from '../../Pages/Routing/routes'

export interface ILoginFormProps {
    handler:IUserHandler
}
 
export interface ILoginFormState {
    userName:string
    password:string
}

const yupValidation = yup.object().shape<ILoginFormState>({
    userName: yup.string().required("You must provide a username").label("Username").typeError("This is a required field") ,
    password: yup.string().required().label("Password").typeError("This is a required field"),
});
 
class LoginForm extends React.Component<InjectedFormikProps<ILoginFormProps, ILoginFormState>> {
    state : ILoginFormState = {
        userName: "",
        password: ""
    }

    getValidateStatus = (Value:any)=>{
        return !! Value ?  'error' : 'success'
    }
    
    render() { 

        const {values,errors,handleChange,handleSubmit,isSubmitting,touched} = this.props;

        return ( 
            <Form className = "LogInForm" onSubmitCapture = {handleSubmit}>
                <Form.Item required hasFeedback help = {errors.userName}
                validateStatus = {this.getValidateStatus(touched.userName && errors.userName)}>
                    <Input autoFocus
                    name = "userName"
                    prefix = {<Icon type = "user" className = "loginFormIcons"/>}
                    defaultValue = {this.state.userName}
                    value = {values.userName}
                    onChange = {handleChange}
                    >
                    </Input>
                </Form.Item>

                <Form.Item required hasFeedback help = {errors.password}
                validateStatus = {this.getValidateStatus(touched.password && errors.password)}>
                    <Input autoFocus
                    name = "userName"
                    prefix = {<Icon type = "lock" className = "loginFormIcons"/>}
                    defaultValue = {this.state.password}
                    value = {values.password}
                    onChange = {handleChange}
                    >
                    </Input>
                </Form.Item>
                <Form.Item>
                    <div id = "SignUpButtons">
                        <Button>
                            <Link to = {routes.COMMON._Login.link}>
                                New? Signup!
                            </Link>
                            </Button>
                        <Button htmlType = "submit" loading = {isSubmitting} type = "primary">Log In</Button>
                    </div>
                </Form.Item>
            </Form>
         );
    }
}
 
export default LoginForm;