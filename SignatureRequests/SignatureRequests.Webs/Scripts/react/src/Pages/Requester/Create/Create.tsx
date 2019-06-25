import * as React from 'react';
import { CreateForm } from '../../../Components/Form/CreateForm';
import UserEntity from '../../../Entities/UserEntity';
import { FormHandler, IFormHandler } from '../../../Handlers/FormHandler';
import FormRequest from '../../../Entities/FormRequest';
import FormEntity from '../../../Entities/FormEntity';

export interface ICreateProps {
    currentUser?: UserEntity;
    formHandler?: IFormHandler;
}
 
export interface ICreateState {
    form?: FormRequest
}
 
class Create extends React.Component<ICreateProps, ICreateState> {
    static defaultProps = {
        formHandler: new FormHandler(),
        currentUser: new UserEntity ({
            Id: 1,
            Role: "role",
            Name: "name",
            Email: "email",
            Password: "password"
          })
     };
     state: ICreateState = {
         form: new FormRequest({
            filePath: "",
            title: "",
            description: "",
            createDate: "",
            userId: 1
        })
     };
    async componentDidMount() {
        this.setState({
            form: new FormRequest({
                filePath: "",
                title: "",
                description: "",
                createDate: "",
                userId: 1
            })
        })
    };

    handleSave = async (data: FormRequest) : Promise<FormEntity> => {
        return (await this.props.formHandler!.createForm(data));
    };
    handleDelete = async () => {

    };

    render() { 
        if (!this.state.form!) {
            return <div>Loading...</div>;
          }else{
        return (
            
            <> 
            <h1  id = 'HeaderText'>test</h1>
                <CreateForm
                handleSave={this.handleSave}
                currentUser={this.props.currentUser!}
                />

            </>
         );
        }
    }
}
 
export default Create;