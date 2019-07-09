import * as React from 'react';
import DashItem from '../../../Components/Dashboard/DashItem';
import '../../../Components/Dashboard/SearchHeader.css';
import { IFormHandler, FormHandler } from '../../../Handlers/FormHandler';
import FormResponseList from '../../../Entities/FormResponseList';
import FormEntity from '../../../Entities/FormEntity';
import {Select, Tabs} from 'antd';
import Search from 'antd/lib/input/Search';
import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';
import { request } from 'http';
import { IGroupHandler, GroupHandler } from '../../../Handlers/GroupHandler';
import GroupEntity from '../../../Entities/GroupEntity';
import GroupResponseList from '../../../Entities/GroupResponseList';
import { format } from 'path';
const { Option } = Select;
const { TabPane } = Tabs;
export interface IDashboardProps {
    formHandler?: IFormHandler; 
    UserObject: ContextUserObject;
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
            if (tableData == null){
                return (<><h1 style={{margin:"auto", width:"100%", height:"100%"}}>Nothing Found!</h1></>);
            }else{
                let displayedForms = tableData;
                if (searchTerm.length > 2 && !loading){
                    let filteredForms = [];
                    for(var i = 0; i<displayedForms.length; i++){
                        if (displayedForms[i].title.toLowerCase().includes(searchTerm) || displayedForms[i].description!.toLowerCase().includes(searchTerm)){
                            filteredForms.push(displayedForms[i]);
                        }
                    }
                     return filteredForms.map((form, index) => (
                          <DashItem key={index} formEntity={form} isOwner={true}/>
                ));
                }else{
                    let filteredForms = [];
                    for(var i = 0; i<tableData.length; i++){
                        if (tableData[i].groups.count != 0){
                            let filteredGroups = tableData[i].groups.collection;
                            for(var inn = 0; inn<filteredGroups.length; inn++){
                                if (filteredGroups[inn].requests !== null){
                                    filteredForms.push(tableData[i]);
                                }
                            }
                        }
                    }
                    
                    return filteredForms.map((form, index) =>

                            (<DashItem key={index} formEntity={form} isOwner={true}/>
                           ));
                }
            }
        }
     }
     renderRequests = () =>{
        const {requestData, loading, searchTerm} = this.state;
        if (loading){
            return (<><h1 style={{margin:"auto", width:"100%", height:"100%", display:"block"}}>Loading!</h1></>);
        }else{
            if (requestData == null){
                return (<><h1 style={{margin:"auto", width:"100%", height:"100%", display:"block"}}>Nothing found!</h1></>);
            }else{
                let displayedForms = requestData;
                if (searchTerm.length > 2 && !loading){
                    let filteredForms = [];
                    for(var i = 0; i<displayedForms.length; i++){
                        if (displayedForms[i].title.toLowerCase().includes(searchTerm) || displayedForms[i].description!.toLowerCase().includes(searchTerm)){
                            filteredForms.push(displayedForms[i]);
                        }
                    }
                     return filteredForms.map((form, index) => (
                          <DashItem key={index} formEntity={form} isOwner={false}/>
                ));
                }else{
                    let filteredForms = [];
                    for(var i = 0; i<requestData.length; i++){
                        if (requestData[i].groups.count != 0){
                            let filteredGroups = requestData[i].groups.collection;
                            for(var inn = 0; inn<filteredGroups.length; inn++){
                                if (filteredGroups[inn].requests != null){
                                    filteredForms.push(requestData[i]);
                                }
                            }
                        }
                    }
                    
                    return filteredForms.map((form, index) =>

                            (<DashItem key={index} formEntity={form} isOwner={true}/>
                           ));
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