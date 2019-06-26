import * as React from 'react';
import DashItem from '../../../Components/Dashboard/DashItem';
import '../../../Components/Dashboard/SearchHeader.css';
import { IFormHandler, FormHandler } from '../../../Handlers/FormHandler';
import FormResponseList from '../../../Entities/FormResponseList';
import FormEntity from '../../../Entities/FormEntity';
import { Input, Select, Icon, Button } from 'antd';
import Search from 'antd/lib/input/Search';
const { Option } = Select;
export interface IDashboardProps {
    formHandler?: IFormHandler; 
}
 
export interface IDashboardState {
    tableData?: FormEntity[];
    loading: boolean;
}
 
class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
    static defaultProps = {
        formHandler: new FormHandler()
     };
     state: IDashboardState = {
         loading: true
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
         const {tableData, loading} = this.state;
        if (loading){
            return (<><h1 style={{margin:"auto", width:"100%", height:"100%", display:"block"}}>Loading!</h1></>);
        }else{
            if (tableData == null){
                return (<><h1 style={{margin:"auto", width:"100%", height:"100%"}}>Nothing Found!</h1></>);
            }else{
                let displayedForms = tableData;
                console.log(tableData);
                return displayedForms.map((comment, index) => (<DashItem key={index} formEntity={comment}/>));
            }
        }
     }
    render() { 
        const selectBefore = (
            <Select defaultValue="Http://">
              <Option value="Http://">Http://</Option>
              <Option value="Https://">Https://</Option>
            </Select>
          );
        return ( 
            <div className="Page">
                <div className="overlay">
                <img className="logo" src={require("../../../../src/Components/Dashboard/Logo2.png")}/>
                <div className="bar">
                <div style={{ marginBottom: 16 }}>
                    <Search style={{maxWidth: "none", width:"100%"}} addonBefore={selectBefore} enterButton defaultValue="mysite" />
                    </div>
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