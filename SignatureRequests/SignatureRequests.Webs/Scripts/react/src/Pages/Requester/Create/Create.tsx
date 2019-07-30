import * as React from 'react';
import { CreateForm } from '../../../Components/Form/CreateForm';
import UserEntity from '../../../Entities/UserEntity';
import { FormHandler, IFormHandler } from '../../../Handlers/FormHandler';
import FormRequest from '../../../Entities/FormRequest';
import FormEntity from '../../../Entities/FormEntity';
import { Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { REQUESTER } from "../../../Pages/Routing/routes";
import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';

export interface ICreateProps {
    formHandler?: IFormHandler;
    userObject:ContextUserObject;
}
 
export interface ICreateState {
    form?: FormRequest;
    uploaded?: FormEntity;
    isUploaded: boolean;
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
            UserId: this.props.userObject.user.id
        });

        let form = new FormData();
        form.append('file', new File([data.FileList.originFileObj], data.FileList.name, {type: "application/pdf"}) );
        
        let uploadRequest = this.props.formHandler!.uploadForm(form, this.props.userObject.user.id);
        uploadRequest.addEventListener("load", async () => {
            request.numPages = parseInt(uploadRequest.response);
            let response = (await this.props.formHandler!.createForm(request));
            this.setState({
            uploaded: response,
            isUploaded: true
            });
            message.success('File uploaded successfully', 2);
        });

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
                userObject={this.props.userObject}
                />
                <div style={{width: '50%', display:'flex', paddingLeft: '25%'}}>
            <Button disabled={!this.state.isUploaded}>
                Continue
                </Button>
                </div>
            </>
            );
        }  
        else{
            return (
                <> 
                <h1  id = 'HeaderText'>Create a Form</h1>
                    <CreateForm
                    handleSave={this.handleSave}
                    userObject={this.props.userObject}
                    />
                    
                    <Link to = {REQUESTER._Edit.link(this.state.uploaded!.id)}>
                    <div style={{width: '50%', display:'flex', paddingLeft: '25%'}}>
                        <Button type={"default"} disabled={!this.state.isUploaded}>
                            Continue
                         </Button>
                         </div>
                     </Link>
                     
                </>
            );
        }
    }
}
 
export default Create;