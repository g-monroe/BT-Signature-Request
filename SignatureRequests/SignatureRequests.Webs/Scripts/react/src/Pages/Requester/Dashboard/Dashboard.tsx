import * as React from 'react';
import DashItem from '../../../Components/Dashboard/DashItem';
import '../../../Components/Dashboard/SearchHeader.css';
import { IFormHandler, FormHandler } from '../../../Handlers/FormHandler';
import FormResponseList from '../../../Entities/FormResponseList';
import FormEntity from '../../../Entities/FormEntity';
import {Select, Tabs, Drawer, Button} from 'antd';
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
    userObject: ContextUserObject;
}
 
export interface IDashboardState {
    tableData?: FormEntity[];
    requestData?: FormEntity[];
    loading: boolean;
    searchTerm: string;
    selectedItems: DashItem[];
    sideBar: boolean;
    itemsSelected: boolean;
}
 
class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
    static defaultProps = {
        formHandler: new FormHandler(),
        groupHandler: new GroupHandler()
     };
     state: IDashboardState = {
         loading: true,
         searchTerm: "",
         selectedItems:[],
         sideBar: false,
         itemsSelected: false,
     };
     async componentDidMount() {
         const table = (await this.props.formHandler!.getAllByUser(this.props.userObject.user.id!)).collection
         const request = (await this.props.formHandler!.getAllRequested(this.props.userObject.user.id!)).collection
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
            }else{//Found forms
                if (searchTerm.length > 2 && !loading){//Searching
                    return tableData.map((form) => {
                        if (form.groups.count !== 0){
                            return form.groups.collection.map((group, index) =>{
                                if (group.title.toLowerCase().includes(searchTerm) || group.description!.toLowerCase().includes(searchTerm)){
                                    return <DashItem key={index} groupEntity={group} isOwner={true} parent={this}/>
                                }
                            })
                        }
                    });
                }else{//Not searching.
                    return tableData.map((form) => {
                        if (form.groups.count !== 0){
                            return form.groups.collection.map((group, index) =>{
                                if (group.requests.count !== 0){
                                   return <DashItem key={index} groupEntity={group} isOwner={true} parent={this}/>
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
            if (requestData == null){
                return (<><h1 style={{margin:"auto", width:"100%", height:"100%", display:"block"}}>Nothing found!</h1></>);
            }else{
                if (searchTerm.length > 2 && !loading){//Searching
                   return requestData.map((form) => {
                        if (form.groups.count !== 0){
                            return form.groups.collection.map((group, index) =>{
                                if (group.title.toLowerCase().includes(searchTerm) || group.description!.toLowerCase().includes(searchTerm)){
                                   return <DashItem key={index} groupEntity={group} isOwner={true} parent={this}/>
                                }
                            })
                        }
                    });
                }else{//Not Searching
                    return requestData.map((form) => {
                        if (form.groups.count !== 0){
                            return form.groups.collection.map((group) =>{
                                if (group.requests.count !== 0){
                                   return group.requests.collection.map((request, index) =>{
                                        if (request.status !== "Done"){
                                            return <DashItem key={index} groupEntity={group} isOwner={false} parent={this}/>
                                        }
                                    }) 
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
     onClose = (e: any) =>{
         this.setState({
             sideBar: false
         })
     }
     openDraw = (e:any) =>{
         let side = !this.state.sideBar;
        this.setState({
            sideBar: side
        })
     }

     addSelected = (dash: DashItem) => {
        let { selectedItems } = this.state;
        let beforeRemoved = selectedItems.length;
        
        selectedItems = selectedItems.filter(item => item != dash);
        if (beforeRemoved === selectedItems.length){ //If it wasn't removed, then add it.
            selectedItems.push(dash);
        }
        if (selectedItems.length > 0){
            this.setState({
                itemsSelected: true,
                selectedItems: selectedItems
            })
        }else{
            this.setState({
                itemsSelected: false,
                selectedItems: selectedItems
            })
        }
     }
     renderEditDashItems = () => {
         const { selectedItems } = this.state;
         if (selectedItems.length !== 0){
             return selectedItems.map((dash) =>(
                <p><span style={{fontWeight:"bold", color:"#ccc"}}>></span> {dash.props.groupEntity.title}</p>
             ));
         }else{
             return <h1>No Items Selected</h1>;
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
         let sideButton = (
            <Button onClick={this.openDraw} type="primary" shape="circle" icon="edit" className="editButton"/>
         );
         if (!this.state.itemsSelected){
            sideButton = <></>;
         }
        return ( 
           
            <div className="Page">
                 <Drawer title="Selected Groups" width={720} onClose={this.onClose} visible={this.state.sideBar}>
                    {
                        this.renderEditDashItems()
                    }
                </Drawer>

                {sideButton}
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