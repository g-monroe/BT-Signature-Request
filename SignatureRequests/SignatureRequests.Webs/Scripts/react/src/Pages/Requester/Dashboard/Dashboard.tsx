import * as React from 'react';
import DashItem from '../../../Components/Dashboard/DashItem';
import '../../../Components/Dashboard/SearchHeader.css';
import { IFormHandler, FormHandler } from '../../../Handlers/FormHandler';
import FormEntity from '../../../Entities/FormEntity';
import {Select, Tabs} from 'antd';
import Search from 'antd/lib/input/Search';
import ContextUserObject from '../../../Components/WrapperComponents/ContextUserObject';
import { GroupHandler } from '../../../Handlers/GroupHandler';
const { Option } = Select;
const { TabPane } = Tabs;

export interface IDashboardProps {
    formHandler?: IFormHandler; 
    userObject: ContextUserObject;
    UserObject:ContextUserObject;
}
 
export interface IDashboardState {
    tableData?: FormEntity[];
    requestData?: FormEntity[];
    loading: boolean;
    searchTerm: string;
    contentState: ViewingState;
}

export enum ViewingState {
    OutGoingRequests,
    IncomingRequests
}
 
class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
    
    static defaultProps = {
        formHandler: new FormHandler(),
        groupHandler: new GroupHandler()
     };

     state: IDashboardState = {
         loading: true,
         searchTerm: "",
         contentState: ViewingState.OutGoingRequests
     };

     async componentDidMount() {
         const table = (await this.props.formHandler!.getAllByUser(this.props.UserObject.user.id!)).collection
         const request = (await this.props.formHandler!.getAllRequested(this.props.UserObject.user.id!)).collection
        console.log(table, "Table data");
        console.log(request, "request data");
       this.setState({
           tableData: table,
           requestData: request,
           loading: false
       });
     }

    private renderContent = (data: FormEntity[] | undefined) => {
        console.log(data, "Into render Content");
        const {loading} = this.state;
        if(loading){
            return (<h1 style={{margin:"auto", width:"100%", height:"100%", display:"block"}}>Loading Forms</h1>);
        }else{ //Content has been loaded in (If it exists)
            if(data){
                let formsToDisplay = this.findFormsWithSeachTerms(data);
                if(formsToDisplay.length === 0 ){
                    data.forEach((form) => {
                        form.groups.collection.forEach((group) => {
                            if(group.requests){
                                formsToDisplay.push(form)
                            }
                        })
                    })
                }
                return formsToDisplay.map((form, index) =>
                    <DashItem key = {index} formEntity = {form} isOwner = {this.state.contentState == ViewingState.IncomingRequests}></DashItem>
                );
            }
            else { //Request data doesn't exist. Show an empty symbol
                return (<h1 style={{margin:"auto", width:"100%", height:"100%", display:"block"}}>You haven't sent a form yet.</h1>);
            }
        }

    }

    private findFormsWithSeachTerms = (data: FormEntity[]) =>{
        const { searchTerm} = this.state;
        let filteredForms = [];
        if (searchTerm.length > 2 && data){
            
            for(var i = 0; i<data.length; i++){
                if (data[i].title.toLowerCase().includes(searchTerm) || data[i].description!.toLowerCase().includes(searchTerm)){
                    filteredForms.push(data[i]);
                }
            }
        }
            return filteredForms;
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

    private changeViewingState = (key:string, event: any) => {
        console.log(ViewingState[parseInt(key)]);
     }
     
    render() { 
        const selectBefore = (
            <Select defaultValue="pending">
              <Option value="pending">Pending</Option>
              <Option value="completed">Completed</Option>
              <Option value="refused">Refused</Option>
            </Select>
          );
        
        return ( 
            <div className="Page">
                <div className="overlay">
                <img className="logo" src={require("../../../../src/Components/Dashboard/Logo2.png")} alt = "logo"/>
                <div className="bar">
                <div style={{ marginBottom: 16 }}>
                    <Search onSearch={value => this.save(value)} style={{maxWidth: "none", width:"100%"}} addonBefore={selectBefore} enterButton defaultValue="" />
                    </div>
               </div>
                </div>
                <div style={{backgroundColor: "#b1b4b5", margin: "auto", display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", textAlign:"center"}}className="page-items">
                    <Tabs defaultActiveKey="1" onTabClick = {this.changeViewingState}>
                        <TabPane tab="Requested" key="0">
                            {
                                this.renderContent(this.state.tableData) 
                            }
                        </TabPane>
                        <TabPane tab="Needs Signed" key="1">
                            {
                                this.renderContent(this.state.requestData)
                            }
                        </TabPane>
                    </Tabs>
                </div>
          </div>
         );
    }
}
 
export default Dashboard;
