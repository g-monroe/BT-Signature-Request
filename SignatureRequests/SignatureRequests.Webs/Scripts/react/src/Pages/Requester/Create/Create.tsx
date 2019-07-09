import * as React from 'react';
import { CreateForm } from '../../../Components/Form/CreateForm';
import UserEntity from '../../../Entities/UserEntity';
import { FormHandler, IFormHandler } from '../../../Handlers/FormHandler';
import FormRequest from '../../../Entities/FormRequest';
import FormEntity from '../../../Entities/FormEntity';
import { resolve } from 'path';
import GroupResponseList from '../../../Entities/GroupResponseList';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { REQUESTER } from "../../../Pages/Routing/routes";

export interface ICreateProps {
    currentUser?: UserEntity;
    formHandler?: IFormHandler;
}
 
export interface ICreateState {
    form?: FormRequest;
    uploaded?: FormEntity;
    isUploaded?: Boolean;
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
        }),
        isUploaded: false
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
        
        let response = (await this.props.formHandler!.createForm(request));
        this.setState({
            uploaded: response,
            isUploaded: true
        });
        this.props.formHandler!.uploadForm(form);
    };

    render() { 
        if (!this.state.form!) {
            return <div>Loading...</div>;
          }
        else if (!this.state.isUploaded!){
            return (
                <> 
            <h1  id = 'HeaderText'>Create a Form</h1>
                <CreateForm
                handleSave={this.handleSave}
                currentUser={this.props.currentUser!}
                />
            <Button disabled={!this.state.isUploaded}>
                Continue
                </Button>
            </>
            );
        }  
          else{
        return (
            
            <> 
            <h1  id = 'HeaderText'>Create a Form</h1>
                <CreateForm
                handleSave={this.handleSave}
                currentUser={this.props.currentUser!}
                />
            <Link to = {REQUESTER._Edit.link(this.state.uploaded!.id)}>
            <Button disabled={!this.state.isUploaded}>
                Continue
                </Button>
                </Link>
            </>

         );
        }
    }
}
 
export default Create;