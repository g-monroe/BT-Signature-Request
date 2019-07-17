import * as React from "react";
import { Select, Table, Button, Form, Input } from 'antd';
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
import ContextUserObject from "../WrapperComponents/ContextUserObject";
import TextArea from "antd/lib/input/TextArea";
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
   userObject: ContextUserObject;
   onPressSend:(send: (title:string, desc:string)=>void, preTitle:string, preDesc:string )=>void;
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
        forms: (await this.props.formHandler!.getAllByUser(this.props.userObject.user.id!)),
        tableData: this.getForms((await this.props.formHandler!.getAllByUser(this.props.userObject.user.id!))), //change to current user
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
            createDate: forms.collection[i].createDate.toDateString
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


  onPressSend = async () => {
    let title = "";
    let description = "";

    if(this.state.selectedForms!.length === 1){
      title = this.state.forms!.collection[(this.state.selectedForms![0] as number)].title || "";
      description = this.state.forms!.collection[(this.state.selectedForms![0] as number)].description || "";
    }
     this.props.onPressSend(this.onSend, title, description)
  }

  onSend = async (title:string, desc:string) => {
    for(let i=0; i<this.state.selectedForms!.length; i++){
      let group: GroupEntity = (await this.props.groupHandler!.createGroup(new GroupRequest({FormId: this.state.forms!.collection[(this.state.selectedForms![i] as number)].id})));
      for(let j=0; j<this.state.selectedUsers!.length; j++){ 
        let request: RequestRequest = ({
          signerId: this.state.selectedUsers![j], 
          groupId: group.id,
          requestorId: this.props.userObject.user.id!, 
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
            onClick={this.onPressSend}>
            Send
          </Button>
         
        </>
      );
    }
  }
}
