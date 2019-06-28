import * as React from 'react';
import { CreateForm } from '../../../Components/Form/CreateForm';
import UserEntity from '../../../Entities/UserEntity';
import { FormHandler, IFormHandler } from '../../../Handlers/FormHandler';
import FormRequest from '../../../Entities/FormRequest';
import FormEntity from '../../../Entities/FormEntity';
import { resolve } from 'path';

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

    handleSave = async (data: any) : Promise<void> => {
        let request= new FormRequest({
            FilePath: data.FilePath,
            Title: data.Title,
            Description: data.Description,
            CreateDate: data.CreateDate,
            UserId: data.UserId
        });
        let form = new FormData();
        form.append('file', new File([data.FileList.originFileObj], data.FileList.name, {type: "application/pdf"}) );
        
        this.props.formHandler!.createForm(request);
        this.props.formHandler!.uploadForm(form);
    };

    render() { 
        if (!this.state.form!) {
            return <div>Loading...</div>;
          }else{
        return (
            
            <> 
            <h1  id = 'HeaderText'>Create a Form</h1>
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