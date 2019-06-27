import * as React from 'react';
import './DashItem.css';
import './bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faCheckSquare, faSquare} from '@fortawesome/free-solid-svg-icons'
import FormEntity from '../../Entities/FormEntity';
import { Tabs, Progress, Tag } from 'antd';
import '../../../node_modules/antd/dist/antd.css';
const TabPane = Tabs.TabPane;

export interface IDashItemProps {
    formEntity: FormEntity;
}
 
export interface IDashItemState {
    checked:boolean;
    isAdmin: boolean;
}
export class TagItem{
  data:string[];
  constructor(data:string[]){
    this.data = data;
  }
}
class DashItem extends React.Component<IDashItemProps, IDashItemState> {
   state:IDashItemState = {
     checked: false,
     isAdmin: true
   }
  
   handleMultiSelect = (e: any) =>{
      this.setState({
        checked: !this.state.checked
      });
   }
   renderTags = (e:TagItem[]) =>{
    return e.map((tag, index) =>
      (<li key={index}>
        <span style={{color:tag.data[1], backgroundColor:tag.data[2]}} className="badge badge-success ml">
          {tag.data[0]}
        </span>
      </li>)
    );
  }
  render() {
    const { checked } = this.state;
    const {formEntity} = this.props;
    let iconCheck = faSquare;
    let tags = [];

    if (checked){
      iconCheck = faCheckSquare;
    }
    if (formEntity.requests.count === 0){
      let newTag = new TagItem(["No Requests found.", "#fff", "#000"])
      tags.push(newTag);
    }else{
      formEntity.requests.collection.map((request, index) => {
        const newTag = new TagItem([request.status, "#fff", "#000"]);
        tags.push(newTag);
      })
    }
    console.log(tags, "--", this.props.formEntity.requests, "--", this.state);
    return (
      <div style={{display: "inline-block"}} className="DashItem">
        <div className="activity-block">
        
        <div className="preview">
            <img className="preview-doc" src="https://assets.cdn.thewebconsole.com/ZWEB5519/product-item/591a517c5057d.jpg" alt = "Preview"/>
        </div>
        <div className="activity-content header-item">
        <label className="ribbon right success"><span>Billing</span></label>
        <h5 style={{marginBottom:"0px"}} className="block-head">{formEntity.title}</h5>
        <div className="content-left">

        <Tabs defaultActiveKey="1">
          <TabPane tab="Description" key="1">
          {formEntity.description}
          </TabPane>
          <TabPane tab="Details" key="2">
          <ul className="tag-list">
            {
                this.renderTags(tags)
            }
        </ul>
          </TabPane>
        </Tabs>
        <Progress width={70} type="dashboard" percent={75} />
        </div>
        <div className="content-right">
            <button style={{color:'#222'}} className="btn-success action-btn"><FontAwesomeIcon icon={faPencilAlt} /></button>
            <button style={{color:'#222'}} className="btn-danger action-btn"><FontAwesomeIcon icon={faTrashAlt} /></button>
            <button style={{color:'#222'}} onClick={this.handleMultiSelect} className="btn-primary action-btn"><FontAwesomeIcon icon={ iconCheck } /></button>
        </div>
        </div>
        </div>
      </div>
    );
   
  }
}

export default DashItem;
