 import * as React from 'react';
import { Table } from 'antd';
import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';
import { IGroupHandler, GroupHandler } from '../../../Handlers/GroupHandler';
import GroupResponseList from '../../../Entities/GroupResponseList';
import FormResponseList from '../../../Entities/FormResponseList';
import { IFormHandler, FormHandler } from '../../../Handlers/FormHandler';

 const columns  = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        //render link to pdf file viewer 
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description'
    },
    {
        title: 'Form',
        dataIndex: 'form',
        key: 'form'
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status'
    },
    {
        title: 'Creation Date',
        dataIndex: 'creationDate',
        key: 'creationDate'
    },
    {
        title: 'Due Date',
        dataIndex: 'dueDate',
        key: 'dueDate'
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
 }
  
 class View extends React.Component<IViewProps, IViewState> {
    static defaultProps = {
        groupHandler: new GroupHandler(),
        formHandler: new FormHandler()
     };

    async componentDidMount() {
        this.setState({
            forms: (await this.props.formHandler!.getAllByUser(this.props.userObject.user.id)),
            tableData: this.getForms(await this.props.formHandler!.getAllByUser(this.props.userObject.user.id))
        });
    }

    getForms = (forms: FormResponseList) : any[] => {
        const data = [];

        for(let i=0; i<forms.count; i++){
            for(let j=0; j<forms.collection[i].groups.count; j++){
                data.push({
                    title: forms.collection[i].groups.collection[j].title,
                    description: forms.collection[i].groups.collection[j].description ? forms.collection[i].groups.collection[j].description!.substring(0,15): "",
                    form: forms.collection[i].title,
                    status: forms.collection[i].groups.collection[j].status,
                    creationDate: new Date(forms.collection[i].groups.collection[j].createDate).toDateString(),
                    dueDate: new Date(forms.collection[i].groups.collection[j].dueDate)
                });
            }
        }
        return data;
      }

     render() { 
         return (  
            <>
            <h1  id = 'HeaderText'>View a Form</h1>
            <Table columns={columns} dataSource={this.state.tableData!}/>
            </>
         );
     }
 }
  
 export default View;