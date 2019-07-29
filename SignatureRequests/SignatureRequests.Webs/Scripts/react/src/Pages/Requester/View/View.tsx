 import * as React from 'react';
import { Table, Tag, Row, Col, Layout } from 'antd';
import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';
import { IGroupHandler, GroupHandler } from '../../../Handlers/GroupHandler';
import GroupResponseList from '../../../Entities/GroupResponseList';
import FormResponseList from '../../../Entities/FormResponseList';
import { IFormHandler, FormHandler } from '../../../Handlers/FormHandler';
import { RequestStatusSigning } from '../../../Util/Enums/RequestStatus';
import { REQUESTER } from '../../Routing/routes';
import { Link } from 'react-router-dom';
import FormEntity from '../../../Entities/FormEntity';

const { Header, Content } = Layout;

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
    }
 ]

 export interface IViewProps {
    userObject: ContextUserObject;
    formHandler?: IFormHandler;
    groupHandler?: IGroupHandler;
 }
  
 export interface IViewState {
    forms?: FormResponseList;
    tableData?: any[];
    isLoaded: boolean;
 }
  
 class View extends React.Component<IViewProps, IViewState> {
    static defaultProps = {
        groupHandler: new GroupHandler(),
        formHandler: new FormHandler()
     };

    state: IViewState = {
        isLoaded: false
    };

    async componentDidMount() {
        this.setState({
            forms: (await this.props.formHandler!.getAllByUser(this.props.userObject.user.id)),
            tableData: this.getForms(await this.props.formHandler!.getAllByUser(this.props.userObject.user.id)),
            isLoaded: true
        });
    }

    getForms = (forms: FormResponseList) : any[] => {
        const data = [];

        for(let i=0; i<forms.count; i++){
            data.push({
                form: forms.collection[i],
                title: forms.collection[i].title,
                description: forms.collection[i].description ? forms.collection[i].description!.substring(0,15): "",
                numPages: forms.collection[i].numPages,
                activeCopies: forms.collection[i].groups.collection.filter(group => group.status !== RequestStatusSigning.COMPLETE).length,
                creationDate: new Date(forms.collection[i].createDate).toDateString()
            });
        }
        return data;
      }

     render() { 
        if (!this.state.isLoaded) {
            return <div>Loading...</div>;
        }else{
            return (  
                <>
                <h1  id = 'HeaderText'>View a Form</h1>
                <div style={{width: '100%', justifyContent: 'center', display: 'flex'}}>
                <Table style={{width: '80%'}} columns={columns} dataSource={this.state.tableData!}/>
                </div>
                </>
            );
        }
     }
 }
  
 export default View;