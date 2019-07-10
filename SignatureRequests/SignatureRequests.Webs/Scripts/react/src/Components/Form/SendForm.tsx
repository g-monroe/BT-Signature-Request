import * as React from "react";
import { Select, Table, Button } from 'antd';
import { IFormHandler, FormHandler} from "../../Handlers/FormHandler";
import FormResponseList from "../../Entities/FormResponseList";
import { UserHandler, IUserHandler } from "../../Handlers/UserHandler";
import { RequestHandler, IRequestHandler } from "../../Handlers/RequestHandler";
import { GroupHandler, IGroupHandler } from "../../Handlers/GroupHandler";
import UserResponseList from "../../Entities/UserResponseList";
import RequestRequest from "../../Entities/RequestRequest";
import { Link } from "react-router-dom";
import FormProgress from "../../Util/Enums/FormProgress";
import GroupRequest from "../../Entities/GroupRequest";
import GroupEntity from "../../Entities/GroupEntity";
import MainPageUser from "../../Entities/MainPageUser";
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
   groupHandler?: IGroupHandler;
   currentUser?: MainPageUser;
}

export interface ISendFormState {
    forms?: FormResponseList;
    tableData?: any[];
    users?: UserResponseList;
    selectedUsers?: number[]; //A collection of selected user ID's. Backend will use these to assign foreign keys of request objects.
    selectedForms?: number[] | string[]; 
}



export default class SendForm extends React.PureComponent<ISendFormProps, ISendFormState> {
  static defaultProps = {
     formHandler: new FormHandler(),
     userHandler: new UserHandler(),
     requestHandler: new RequestHandler(),
     groupHandler: new GroupHandler()
     
  };
  state: ISendFormState = {};
  async componentDidMount() {
    this.setState({
        forms: (await this.props.formHandler!.getAllByUser(this.props.currentUser!.id!)),
        tableData: this.getForms((await this.props.formHandler!.getAllByUser(this.props.currentUser!.id!))), //change to current user
        users: (await this.props.userHandler!.getAll()),
        selectedUsers: [],
        selectedForms: []
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
    
    for(let i=0; i<this.state.selectedForms!.length; i++){
      let group: GroupEntity = (await this.props.groupHandler!.createGroup(new GroupRequest({FormId: this.state.forms!.collection[(this.state.selectedForms![i] as number)].id})));
      for(let j=0; j<this.state.selectedUsers!.length; j++){ 
        let request: RequestRequest = ({
          signerId: this.state.selectedUsers![j], 
          groupId: group.id,
          requestorId: this.props.currentUser!.id!, 
          status: FormProgress.PENDING, 
          sentDate: new Date() });
        this.props.requestHandler!.createRequest(request);
      }
    }
  }

  onSelectChange = async (selectedForms: number[] | string[]) => {
    this.setState({selectedForms: selectedForms});
  }

  render() {
    if (!this.state.users) {
      return <div>Loading...</div>;
    }else{
      const rowSelection = {
        selectedRowKeys: this.state.selectedForms!,
        onChange : this.onSelectChange
      };
      
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

          <Link to="/request/create">
            <Button> 
              Create
            </Button>
          </Link>
          
          <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.tableData}></Table>

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
