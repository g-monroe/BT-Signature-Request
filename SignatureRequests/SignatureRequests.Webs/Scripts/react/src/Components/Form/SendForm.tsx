import * as React from "react";
import { Select, Table, Button, Layout, Typography, Icon, Divider, Drawer } from 'antd';
import { IFormHandler, FormHandler} from "../../Handlers/FormHandler";
import FormResponseList from "../../Entities/FormResponseList";
import { UserHandler, IUserHandler } from "../../Handlers/UserHandler";
import { RequestHandler, IRequestHandler } from "../../Handlers/RequestHandler";
import { GroupHandler, IGroupHandler } from "../../Handlers/GroupHandler";
import UserResponseList from "../../Entities/UserResponseList";
import RequestRequest from "../../Entities/RequestRequest";
import FormProgress from "../../Util/Enums/FormProgress";
import GroupRequest from "../../Entities/GroupRequest";
import GroupEntity from "../../Entities/GroupEntity";
import ContextUserObject from "../WrapperComponents/ContextUserObject";
import { RequestStatusSigning } from "../../Util/Enums/RequestStatus";
import  * as Routes from "../../Pages/Routing/routes";
import { Link } from "react-router-dom";
import Step2 from "../../Pages/Requester/Send/Step2";
import UserEntity from "../../Entities/UserEntity";
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
   onPressSend:(send: (title:string, desc:string, dueDate:Date)=>Promise<boolean>, preTitle:string, preDesc:string )=>void;
}

export interface ISendFormState {
    forms?: FormResponseList;
    tableData?: any[];
    users?: UserResponseList;
    selectedUsers?: number[]; //A collection of selected user ID's. Backend will use these to assign foreign keys of request objects.
    selectedForms?: number[] | string[]; 
    step2: boolean;
    isInfoVisible:boolean;
    isConfirmVisible:boolean;
}



export default class SendForm extends React.PureComponent<ISendFormProps, ISendFormState> {
  static defaultProps = {
     formHandler: new FormHandler(),
     userHandler: new UserHandler(),
     requestHandler: new RequestHandler(),
     groupHandler: new GroupHandler()
     
  };

  state: ISendFormState = {
    step2: false,
    isInfoVisible: false,
    isConfirmVisible: false
  };

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
            key: i,
            filePath: forms.collection[i].filePath,
            title: forms.collection[i].title,
            description: forms.collection[i].description ? forms.collection[i].description!.substring(0,15): "",
            createDate: new Date(forms.collection[i].createDate).toDateString()
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

  onSelectChange = async (selectedForms: number[] | string[]) => {
    this.setState({selectedForms: selectedForms});
    console.log();
  }
  onInfoClick = () =>{
    this.setState({
        isInfoVisible:true
    })
}
onCancel = () =>{
  this.setState({
      isConfirmVisible:false,
      isInfoVisible:false
  })
}
  onStep2 = () =>{
    this.setState({
      step2: !this.state.step2
    })
  }
  render() {
    if (!this.state.users) {
      return <div>Loading...</div>;
    }else{
      const rowSelection = {
        selectedRowKeys: this.state.selectedForms!,
        onChange : this.onSelectChange
      };

      const {selectedForms, step2 } = this.state;
      const {userObject} = this.props;
      let hide = <><p>Please Select a Form.</p></>;
      if (selectedForms !== null && selectedForms!.length !== 0 && selectedForms![0] !== null && !step2){
        hide = <>
        <Button onClick={this.onStep2} type={"primary"}>
        Send
      </Button></>
      }
      let display = <></>;
      if (step2){
        hide = <></>;
        let passUsers: UserEntity[] = [];
        this.state.users.collection.map((user) =>{
          this.state.selectedUsers!.map((index) => {
            if (user.id === Number(index)){
              passUsers.push(user);
            }
          })
        })
        display = <><Step2 userObject={userObject} form={this.state.forms!.collection[(this.state.selectedForms![0] as number)].id} users={passUsers}/></>;
      }else{
        display = <><div style={{maxWidth:"80%", margin:'auto'}}>
        <Layout.Header style = {{background:"inherit"}}>
                    <div id = "SendHeader">
                        <Typography.Title style={{float:"left"}} level = {1}>Request Form Completion</Typography.Title>
                        <Icon  type="info-circle" theme="twoTone" twoToneColor = "#604099" style = {{fontSize:'37px', margin:'5px', float:"right"}} onClick = {this.onInfoClick}/>
                    </div>

                </Layout.Header>
                <Drawer
                visible = {this.state.isInfoVisible}
                onClose = {this.onCancel}
                >
                <div id = "SendFormInfo">
                    <p>If no documents are shown on the page, upload a pdf</p>
                    <Link to="/request/create">
                        <Button> 
                          Upload
                        </Button>
                    </Link>
                    <Divider/>
                    <p>Instructions to complete the process of sending the form will be added here when the process is complete</p>
                </div>
            
                
            </Drawer>     
        <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Please select"
        onSelect={this.onSelect}
        onDeselect={this.onDeselect}>
        {this.createUserOptions()}
      </Select><Table rowSelection={rowSelection} columns={columns} dataSource={this.state.tableData}></Table>{hide}</div></>;
      }
      return (
        <>
          {display}
        </>
      );
    }
  }
}
