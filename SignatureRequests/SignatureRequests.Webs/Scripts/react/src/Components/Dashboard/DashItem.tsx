import * as React from 'react';
import './DashItem.css';
import './bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faCheckSquare, faSquare} from '@fortawesome/free-solid-svg-icons'
import FormEntity from '../../Entities/FormEntity';
import TagItem from './TagItem';
import { Tabs, Progress } from 'antd';
import RequestStatus from '../../Util/Enums/RequestStatus';
import '../../../node_modules/antd/dist/antd.css';
const TabPane = Tabs.TabPane;

export interface IDashItemProps {
    formEntity: FormEntity;
    isOwner: boolean;
}
 
export interface IDashItemState {
    checked:boolean;
    progressBar:number;
    tags: TagItem[];
}

class DashItem extends React.Component<IDashItemProps, IDashItemState> {
   state:IDashItemState = {
     checked: false,
     progressBar: 0,
     tags: []
   }
  
   handleMultiSelect = (e: any) =>{
      this.setState({
        checked: !this.state.checked
      });
   }
   componentDidMount(){
    const {formEntity} = this.props;
    const { tags } = this.state;
    if (formEntity.groups.count === 0){
      const newTag = new TagItem("#000", "#fff", "Nothing found!");
      tags.push(newTag);
    }else{
      let totalRequests = 0;
      let totalDoneRequests = 0;
      formEntity.groups.collection.map((group) => {
        totalRequests = group.requests.count;
        group.requests.collection.map((request) => {

          let tagText = `${request.signer.name}: ${request.status}(${request.sentDate.toString()})`;
          let color = "#fff";
          if (request.status == RequestStatus.DONE){
            color = "#3CB371";
            totalDoneRequests += 1;
          }
          if (request.boxes.count != 0){
            tagText = `${request.signer.name}: ${request.boxes.count} - ${request.status} (${request.sentDate.toString()})`
          }
          const newTag = new TagItem("#000", color, tagText);
          tags.push(newTag);
        })
      })
      this.setState({
        progressBar: (totalDoneRequests / totalRequests) * 100
      })
    }
   }
   renderTags = (e:TagItem[]) =>{
    return e.map((tag, index) =>
      (<li key={index}>
        <span style={{color:tag.color, backgroundColor:tag.backgroundColor}} className="badge badge-success ml">
          {tag.text}
        </span>
      </li>)
    );
  }
  render() {
    const { checked } = this.state;
    const { formEntity, isOwner } = this.props;
      
    
    let iconCheck = faSquare; 
    if (checked){
      iconCheck = faCheckSquare;
    }
    let options = <>
    <button style={{color:'#222'}} className="btn-success action-btn"><FontAwesomeIcon icon={faPencilAlt} /></button>
    <button style={{color:'#222'}} className="btn-danger action-btn"><FontAwesomeIcon icon={faTrashAlt} /></button>
    <button style={{color:'#222'}} onClick={this.handleMultiSelect} className="btn-primary action-btn"><FontAwesomeIcon icon={ iconCheck } /></button></>;
    if (!isOwner){
      options = <><button style={{color:'#222'}} className="btn-success action-btn"><FontAwesomeIcon icon={faPencilAlt} /></button></>
    }
    return (
      <div style={{display: "inline-block"}} className="DashItem">
        <div className="activity-block">
        
        <div className="preview">
            <img className="preview-doc" src={"../../../../../assets/v1/documents/" + formEntity.filePath + ".png"} alt = "Preview"/>
        </div>
        <div className="activity-content header-item">
        <label className="ribbon right success"><span>{formEntity.createDate}</span></label>
        <h5 style={{marginBottom:"0px"}} className="block-head">{formEntity.title}</h5>
        <div className="content-left">

        <Tabs defaultActiveKey="1">
          <TabPane tab="Description" key="1">
          {formEntity.description}
          </TabPane>
          <TabPane tab="Details" key="2">
          <ul className="tag-list">
            {
              this.renderTags(this.state.tags)
            }
        </ul>
          </TabPane>
        </Tabs>
        <Progress width={70} type="dashboard" percent={this.state.progressBar} />
        </div>
        <div className="content-right">
            {options}
          </div>
        </div>
        </div>
      </div>
    );
   }
}

export default DashItem;
