import * as React from 'react';
import DashItem from '../../../Components/Dashboard/DashItem';
import '../../../Components/Dashboard/SearchHeader.css';
import { IFormHandler, FormHandler } from '../../../Handlers/FormHandler';
import { IUserHandler, UserHandler } from '../../../Handlers/UserHandler';
import UserEntity from '../../../Entities/UserEntity';
import UserResponseList from '../../../Entities/UserResponseList';
import FormResponseList from '../../../Entities/FormResponseList';
import FormEntity from '../../../Entities/FormEntity';
export interface IDashboardProps {
    formHandler?: IFormHandler; 
    userHandler?: IUserHandler;
    currentUser?: UserEntity;
}
 
export interface IDashboardState {
    tableData?: FormEntity[];
    users?: UserResponseList;
    selectedUsers?: number[]; 
    loading: boolean;
}
 
class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
    static defaultProps = {
        formHandler: new FormHandler(),
        userHandler: new UserHandler()
     };
     state: IDashboardState = {
         loading: true
     };
     async componentDidMount() {
       this.setState({
           tableData: this.getForms((await this.props.formHandler!.getAllByUser(1))),
           users: (await this.props.userHandler!.getAll()),
           selectedUsers: [],
           loading: false
       });
     }
   
     getForms = (forms: FormResponseList) : any[] => {
       return forms.collection;
     }
     renderForms = () =>{
         const {tableData, loading} = this.state;
        if (loading){
            return (<><h1 style={{margin:"auto", width:"100%", height:"100%", display:"block"}}>Loading!</h1></>);
        }else{
            if (tableData == null){
                return (<><h1 style={{margin:"auto", width:"100%", height:"100%"}}>Nothing Found!</h1></>);
            }else{
                let displayedForms = tableData;
                return displayedForms.map((comment, index) => (<DashItem key={index} formEntity={comment}/>));
            }
        }
     }
    render() { 
        return ( 
            <div className="Page">
                <div className="overlay">
                <img className="logo" src={'../../../Components/Dashboard/Logo2.png'}/>
                <div className="bar">
                <div className="customs">
                <select className="optionbar">
                    <option>All</option>
                    <option>Billing</option>
                    <option>Order</option>
                    <option>Business</option>
                </select>
                </div>
                <input placeholder="Order Summary, Purchase, etc" className="searchbar" type="text"/>
                <button style={{borderTopRightRadius: "8px", borderBottomRightRadius: "8px",borderTopLeftRadius: "0px",borderBottomLeftRadius: "0px", padding:"8.4px",boxShadow: "0 4px 6px -6px black"}}className="btn btn-info barbtn">Search</button>
                </div>
                </div>
                <div style={{backgroundColor: "#b1b4b5", margin: "auto", display: "inline-block", textAlign:"center"}}className="page-items">
                    {
                       this.renderForms() 
                    }
                </div>
          </div>
         );
    }
}
 
export default Dashboard;