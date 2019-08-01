 import * as React from 'react';
import { Table, Tag, Row, Col, Layout, Tabs, Button } from 'antd';
import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';
import { IGroupHandler, GroupHandler } from '../../../Handlers/GroupHandler';
import GroupResponseList from '../../../Entities/GroupResponseList';
import FormResponseList from '../../../Entities/FormResponseList';
import { IFormHandler, FormHandler } from '../../../Handlers/FormHandler';
import RequestStatus, { RequestStatusSigning } from '../../../Util/Enums/RequestStatus';
import { REQUESTER } from '../../Routing/routes';
import { Link } from 'react-router-dom';
import FormEntity from '../../../Entities/FormEntity';
import { RequestHandler, IRequestHandler } from '../../../Handlers/RequestHandler';
import RequestResponseList from '../../../Entities/RequestResponseList';
import GroupEntity from '../../../Entities/GroupEntity';

const { Header, Content } = Layout;
const { TabPane } = Tabs;
 const columns  = [
    {
        title: 'Filepath',
        dataIndex: 'form',
        key: 'form',
        render: (form: FormEntity) => {
            return <Link to = {REQUESTER._FormView.link(form.id)}>{form.filePath}</Link>
        }
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
        title: 'Number of Pages',
        dataIndex: 'numPages',
    },
    {
        title: 'Active Copies',
        dataIndex: 'activeCopies'
    },
    {
        title: 'Creation Date',
        dataIndex: 'creationDate'
    },
 ]

 const signedColumns = [
     {
         title: 'Filepath',
         dataIndex: 'groups',
         key: 'groups',
         render: (groups: GroupEntity) => {
             return groups.form.filePath;
         }
     },
     {
         title: 'Group',
         dataIndex: 'group'
     },
     {
         title: 'Group Description',
         dataIndex: 'description'
     },
     {
         title: 'Assign Date',
         dataIndex: 'assignDate'
     },
     {
         title: 'Due Date',
         dataIndex: 'dueDate'
     }
 ]

 const requestColumns = [
    {
        title: 'Filepath',
        dataIndex: 'groups',
        key: 'groups',
        render: (groups: GroupEntity) => {
            return groups.form.filePath;
        }
    },
    {
        title: 'Group',
        dataIndex: 'group'
    },
    {
        title: 'Group Description',
        dataIndex: 'description'
    },
    {
        title: 'Assign Date',
        dataIndex: 'assignDate'
    },
    {
        title: 'Due Date',
        dataIndex: 'dueDate'
    },
    {
        title: 'Request Status',
        dataIndex: 'requestStatus',
        key: 'requestStatus',
        render: (requestStatus: string) => {
            return <Tag color={requestStatus === RequestStatus.NOTSIGNED? "volcano" : "green"}>{requestStatus}</Tag>
        }
    },
    {
        title: 'Group Status',
        dataIndex: 'groupStatus',
        key: 'groupStatus',
        render: (groupStatus: string) => {
            return <Tag color={groupStatus === RequestStatusSigning.NOTSTARTED? "volcano" : "geekblue"}>{groupStatus}</Tag>
        }
    }
]

 export interface IViewProps {
    userObject: ContextUserObject;
    formHandler?: IFormHandler;
    groupHandler?: IGroupHandler;
    requestHandler?: IRequestHandler;
 }
  
 export interface IViewState {
  
    tableData?: any[];
    signedData? : any[];
    requestData?: any[];
    isLoaded: boolean;
    selectedRowKeys: any[];
 }
  
 class View extends React.Component<IViewProps, IViewState> {
    static defaultProps = {
        groupHandler: new GroupHandler(),
        formHandler: new FormHandler(),
        requestHandler: new RequestHandler()
     };

    state: IViewState = {
        isLoaded: false,
        selectedRowKeys: []
    };

    async componentDidMount() {
        this.setState({
            
            tableData: this.getForms(await this.props.formHandler!.getAllByUser(this.props.userObject.user.id)),
            signedData: this.getSigned(await this.props.requestHandler!.getRequestBySignerId(this.props.userObject.user.id)),
            requestData: this.getRequests(await this.props.requestHandler!.getRequestBySignerId(this.props.userObject.user.id)),
            isLoaded: true
        });
    }

    getRequests = (requests: RequestResponseList) : any[] => {
        const data = [];
        for(let i=0; i<requests.count; i++){
            if(requests!.collection[i].group!.status === RequestStatusSigning.PENDING || requests!.collection[i].group!.status === RequestStatusSigning.NOTSTARTED){ 
                data.push({

                    groups: requests!.collection[i].group!,
                    group: requests!.collection[i].group!.title,
                    description: requests!.collection[i].group!.description,
                    assignDate: new Date (requests!.collection[i].group!.createDate).toDateString(),
                    dueDate: new Date(requests!.collection[i].group!.dueDate).toDateString(),
                    requestStatus: requests.collection[i].status,
                    groupStatus: requests.collection[i].group!.status
                });
            }
        }
        
        return data;
    }

    getSigned = (requests: RequestResponseList) : any[] => {
        const data = [];

        for(let i=0; i<requests.count; i++){
            if(requests!.collection[i].group!.status === RequestStatusSigning.COMPLETE){
                data.push({

                    groups: requests!.collection[i].group!,
                    group: requests!.collection[i].group!.title,
                    description: requests!.collection[i].group!.description,
                    assignDate: new Date (requests!.collection[i].group!.createDate).toDateString(),
                    dueDate: new Date(requests!.collection[i].group!.dueDate).toDateString()
                });
            }
        }
        
        return data;
    }

    getForms = (forms: FormResponseList) : any[] => {
        const data = [];

        for(let i=0; i<forms.count; i++){
            data.push({
                key: i,
                id: forms.collection[i].id,
                form: forms.collection[i],
                title: forms.collection[i].title,
                description: forms.collection[i].description ? forms.collection[i].description!.substring(0,15): "",
                numPages: forms.collection[i].numPages,
                activeCopies: forms.collection[i].groups!.collection.filter(group => group.status !== RequestStatusSigning.COMPLETE).length,
                creationDate: new Date(forms.collection[i].createDate).toDateString()
            });
        }
        return data;
      }

    onSelectChange = (selectedRowKeys: any[]) => {
        this.setState({
            selectedRowKeys
        });
    }

    handleDelete = async () => {
        for(let i=0; i<this.state.selectedRowKeys.length; i++){
            (await this.props.formHandler!.deleteForm(this.state.tableData![this.state.selectedRowKeys[i]].id));
        }
        let forms = this.state.tableData!.filter(form => this.state.selectedRowKeys.includes(form));
        this.setState({
            tableData: forms
        });
    }

     render() { 
        if (!this.state.isLoaded) {
            return <div>Loading...</div>;
        }else{
            const { selectedRowKeys } = this.state;
            const rowSelection = {
                selectedRowKeys, 
                onChange: this.onSelectChange
            }
            const hasSelected = selectedRowKeys.length > 0;
            return (  
                <>
                <h1  id = 'HeaderText'>View a Form</h1>
                <div style={{width: '100%', justifyContent: 'center', display: 'flex'}}>
                <Tabs defaultActiveKey="1" style={{width: '80%'}}>
                    <TabPane tab="Model Forms" key="1" style={{display: 'flex', justifyContent: 'center'}}>
                        <Table style={{width: '100%'}} rowSelection={rowSelection}  columns={columns} dataSource={this.state.tableData!}/>
                        <Button icon="delete" type="danger" disabled={!hasSelected} onClick={this.handleDelete}/>
                    </TabPane>
                    <TabPane tab="Completed Forms" key="2" style={{display: 'flex', justifyContent: 'center'}}>
                        <Table style={{width: '100%'}} columns={signedColumns} dataSource={this.state.signedData!}/>
                    </TabPane>
                    <TabPane tab="Active Forms" key="3" style={{display: 'flex', justifyContent: 'center'}}>
                        <Table style={{width: '100%'}} columns={requestColumns} dataSource={this.state.requestData!}/>
                    </TabPane>

                </Tabs>
                
                </div>
                </>
            );
        }
     }
 }
  
 export default View;