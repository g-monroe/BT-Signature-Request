import * as React from "react";
import { Select, Table, Button } from 'antd';
import { IFormHandler, FormHandler} from "../../Handlers/FormHandler";
import UserEntity from "../../Entities/UserEntity";
import FormResponseList from "../../Entities/FormResponseList";
import { UserHandler, IUserHandler } from "../../Handlers/UserHandler";
import { RequestHandler, IRequestHandler } from "../../Handlers/RequestHandler";
import UserResponseList from "../../Entities/UserResponseList";
import RequestRequest from "../../Entities/RequestRequest";
import BoxResponseList from "../../Entities/BoxResponseList";
const { Option } = Select;
const columns = [
    {
        title: 'FilePath',
        dataIndex: 'filePath'
    },
    {
        title: 'Title',
        dataIndex: 'title'
    },
    {
        title: 'Description',
        dataIndex: 'description'
    },
    {
        title: 'Creation Date',
        dataIndex: 'createDate'
    }
]

export interface ISendFormProps {
   formHandler?: IFormHandler; 
   userHandler?: IUserHandler;
   requestHandler?: IRequestHandler;
   currentUser?: UserEntity;
}

export interface ISendFormState {
    tableData?: any[];
    users?: UserResponseList;
    selectedUsers?: number[]; //A collection of selected user ID's. Backend will use these to assign foreign keys of request objects. 
}



export default class SendForm extends React.PureComponent<ISendFormProps, ISendFormState> {
  static defaultProps = {
     formHandler: new FormHandler(),
     userHandler: new UserHandler(),
     requestHandler: new RequestHandler()
  };
  state: ISendFormState = {};
  async componentDidMount() {
    this.setState({
        tableData: this.getForms((await this.props.formHandler!.getAllByUser(1))), //change to current user
        users: (await this.props.userHandler!.getAll()),
        selectedUsers: []
    });
  }

  getForms = (forms: FormResponseList) : any[] => {
    const data = [];
    for(let i=0; i<forms.count; i++){
        data.push({
            filePath: forms.collection[i].filePath,
            title: forms.collection[i].title,
            description: forms.collection[i].description,
            createDate: forms.collection[i].createDate
        });
    }
    return data;
  }

  createUserOptions = () : any[] => {
    const data = [];
    for(let i=0; i<this.state.users!.count; i++){
      data.push(<Option key={this.state.users!.collection[i].id}>{this.state.users!.collection[i].name}</Option>)
    }
    return data;
  }

  onSelect = (value: any) => {
    let newSelected = this.state.selectedUsers!;
    newSelected.push(value);
    this.setState({
      selectedUsers: newSelected
    });
  }

  onDeselect = async (value: any) => {
    let newSelected = this.state.selectedUsers!.filter(function(id){
      return id !== value;
    });
    (await this.setState({
      selectedUsers: newSelected
    }));
  }

  onSend = async () => {
    this.state.selectedUsers!.map(x => {
      let request: RequestRequest = {signerId: x, requestorId: 1, formId: 1, status: "Waiting", sentDate: new Date(), boxes: new BoxResponseList({}) };
      this.props.requestHandler!.createRequest(request); 
    
    }) //change to current user, change to selected form
  }

  render() {
    if (!this.state.users) {
      return <div>Loading...</div>;
    }else{
      return (
        <>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            onSelect={this.onSelect}
            onDeselect={this.onDeselect}>
            {this.createUserOptions()}
          </Select>
          
          <Table columns={columns} dataSource={this.state.tableData}></Table>

          <Button
            type={"primary"}
            onClick={this.onSend}>
            Send
          </Button>
        </>
      );
    }
  }
}
