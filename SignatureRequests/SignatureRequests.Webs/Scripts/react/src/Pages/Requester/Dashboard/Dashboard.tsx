import * as React from 'react';
import DashItem from '../../../Components/Dashboard/DashItem';
import '../../../Components/Dashboard/SearchHeader.css';
import { IFormHandler, FormHandler } from '../../../Handlers/FormHandler';
import FormResponseList from '../../../Entities/FormResponseList';
import FormEntity from '../../../Entities/FormEntity';
import { Input, Select, Icon, Button } from 'antd';
import Search from 'antd/lib/input/Search';
import { format } from 'path';
const { Option } = Select;
export interface IDashboardProps {
    formHandler?: IFormHandler; 
}
 
export interface IDashboardState {
    tableData?: FormEntity[];
    loading: boolean;
    searchTerm: string;
}
 
class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
    static defaultProps = {
        formHandler: new FormHandler()
     };
     state: IDashboardState = {
         loading: true,
         searchTerm: ""
     };
     async componentDidMount() {
       this.setState({
           tableData: this.getForms((await this.props.formHandler!.getAllByUser(1))),
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
                    for(var i = 0; i<displayedForms.length-1; i++){
                        if (displayedForms[i].title.toLowerCase().includes(searchTerm) || displayedForms[i].description!.toLowerCase().includes(searchTerm)){
                            filteredForms.push(displayedForms[i]);
                        }
                    }
                     return filteredForms.map((form, index) => (
                          <DashItem key={index} formEntity={form}/>
                ));
                }else{
                    return displayedForms.map((form, index) => 
                            (<DashItem key={index} formEntity={form}/>));
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
                <img className="logo" src={require("../../../../src/Components/Dashboard/Logo2.png")}/>
                <div className="bar">
                <div style={{ marginBottom: 16 }}>
                    <Search onSearch={value => this.save(value)} style={{maxWidth: "none", width:"100%"}} addonBefore={selectBefore} enterButton defaultValue="mysite" />
                    </div>
               </div>
                </div>
                <div style={{backgroundColor: "#b1b4b5", margin: "auto", display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", textAlign:"center"}}className="page-items">
                    {
                       this.renderForms() 
                    }
                </div>
          </div>
         );
    }
}
 
export default Dashboard;