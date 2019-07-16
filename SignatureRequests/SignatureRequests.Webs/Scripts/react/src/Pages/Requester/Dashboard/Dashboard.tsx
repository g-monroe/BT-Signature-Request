import * as React from 'react';
import DashItem from '../../../Components/Dashboard/DashItem';
import '../../../Components/Dashboard/SearchHeader.css';
import { IFormHandler, FormHandler } from '../../../Handlers/FormHandler';
import FormResponseList from '../../../Entities/FormResponseList';
import FormEntity from '../../../Entities/FormEntity';
import {Select, Tabs, Drawer, Button} from 'antd';
import Search from 'antd/lib/input/Search';
import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';
import { GroupHandler } from '../../../Handlers/GroupHandler';
const { Option } = Select;
const { TabPane } = Tabs;
export interface IDashboardProps {
    formHandler?: IFormHandler; 
    userObject: ContextUserObject;
}
 
export interface IDashboardState {
    tableData?: FormEntity[];
    requestData?: FormEntity[];
    loading: boolean;
    searchTerm: string;
}
 
class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
    static defaultProps = {
        formHandler: new FormHandler(),
        groupHandler: new GroupHandler()
     };
     state: IDashboardState = {
         loading: true,
         searchTerm: ""
     };
     async componentDidMount() {
       this.setState({
           tableData: this.getForms((await this.props.formHandler!.getAllByUser(1))),
           requestData: this.getForms((await this.props.formHandler!.getAllRequested(1))),
           loading: false
       });
     }
     getForms = (forms: FormResponseList) : any[] => {
       return forms.collection;
     }
     renderForms = () =>{
         const {tableData, loading, searchTerm} = this.state;
        if (loading){
            return (<><h1 style={{margin:"auto", width:"100%", height:"100%", display:"block"}}>Loading!</h1></>);
        }else{
            if (tableData!.length == 0 || tableData == null){
                return (<><h1 style={{margin:"auto", width:"100%", height:"100%"}}>Nothing Found!</h1></>);
            }else{//Found forms
                let count = 0;
                tableData.map((form) => {
                    if (form.groups.count !== 0){
                        count++;
                    }
                });
                if (count == 0){
                    return <><h1>Nothing found!</h1></>
                }
                if (searchTerm.length > 2 && !loading){//Searching
                    return tableData.map((form) => {
                        if (form.groups.count !== 0){
                            return form.groups.collection.map((group, index) =>{
                                if (group.title.toLowerCase().includes(searchTerm) || group.description!.toLowerCase().includes(searchTerm)){
                                    return <DashItem key={index} groupEntity={group} isOwner={true}/>
                                }
                            })
                        }
                    });
                }else{//Not searching.
                    return tableData.map((form) => {
                        if (form.groups.count !== 0){
                            return form.groups.collection.map((group, index) =>{
                                if (group.requests.count !== 0){
                                   return <DashItem key={index} groupEntity={group} isOwner={true}/>
                                }
                            })
                        }
                    });
                   
                }
            }
        } 
     }
     renderRequests = () =>{
        const {requestData, loading, searchTerm} = this.state;
        if (loading){
            return (<><h1 style={{margin:"auto", width:"100%", height:"100%", display:"block"}}>Loading!</h1></>);
        }else{
            if (requestData!.length == 0 || requestData == null){
                return (<><h1 style={{margin:"auto", width:"100%", height:"100%", display:"block"}}>Nothing found!</h1></>);
            }else{ 
                if (searchTerm.length > 2 && !loading){//Searching
                   return requestData.map((form) => {
                        if (form.groups.count !== 0){
                            return form.groups.collection.map((group, index) =>{
                                if (group.title.toLowerCase().includes(searchTerm) || group.description!.toLowerCase().includes(searchTerm)){
                                   return <DashItem key={index} groupEntity={group} isOwner={true}/>
                                }
                            })
                        }
                    });
                }else{//Not Searching 
                    return requestData.map((form) => {
                        if (form.groups.count !== 0){
                            return form.groups.collection.map((group, index) =>{
                                if (group.requests.count !== 0){
                                   let items = 0;
                                   group.requests.collection.map((request) =>{
                                        if (request.status !== "Done"){
                                            items = 1;
                                        }
                                    })
                                    if (items == 1){
                                        return <DashItem key={index} groupEntity={group} isOwner={false}/> 
                                    }
                                } 
                            })
                        }
                    });
                }
            }
        }
     }
     save  = ( target:any ) => {
        if (target.length > 2){
            this.setState({
                searchTerm: target.toLowerCase()
            })
        }else{
            this.setState({
                searchTerm: ""
            })
        }
        
     }
    render() { 
        const selectBefore = (
            <Select defaultValue="completed">
              <Option value="completed">Completed</Option>
              <Option value="pending">Pending</Option>
              <Option value="refused">Refused</Option>
            </Select>
          );
        return ( 
           
            <div className="Page">
                <div className="overlay">
                <img className="logo" src={require("../../../../src/Components/Dashboard/Logo2.png")} alt = "logo"/>
                <div className="bar">
                <div style={{ marginBottom: 16 }}>
                    <Search onSearch={value => this.save(value)} style={{maxWidth: "none", width:"100%"}} addonBefore={selectBefore} enterButton defaultValue="mysite" />
                    </div>
               </div>
                </div>
                <div style={{backgroundColor: "#b1b4b5", margin: "auto", display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", textAlign:"center"}}className="page-items">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Requested" key="1">
                    {
                       this.renderForms() 
                    }
                    </TabPane>
                    <TabPane tab="Needs Signed" key="2">
                        {
                            this.renderRequests()
                        }
                    </TabPane>
                    </Tabs>
                </div>
          </div>
         );
    }
}
 
export default Dashboard;