import * as React from 'react';
import './DashItem.css';
import './bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faCheckSquare, faSquare} from '@fortawesome/free-solid-svg-icons'

import TagItem from './TagItem';
import { Tabs, Progress } from 'antd';
import RequestStatus from '../../Util/Enums/RequestStatus';
import '../../../node_modules/antd/dist/antd.css';
import Image from './Image';

import { IGroupHandler, GroupHandler } from '../../Handlers/GroupHandler';
import Dashboard from '../../Pages/Requester/Dashboard/Dashboard';
import Moment from 'react-moment';
import GroupEntity from '../../Entities/GroupEntity';
import * as Routes from '../../Pages/Routing/routes';
import { Link } from 'react-router-dom';

const TabPane = Tabs.TabPane;

export interface IDashItemProps {
    groupEntity: GroupEntity;
    isOwner: boolean;
    groupHandler?: IGroupHandler;
    parent: Dashboard;
}
 
export interface IDashItemState {
    checked:boolean;
    progressBar:number;
    tags: TagItem[];
    requestSign?: number;
}

class DashItem extends React.Component<IDashItemProps, IDashItemState> {
  static defaultProps = {
    groupHandler: new GroupHandler
  }
   state:IDashItemState = {
     checked: false,
     progressBar: 0,
     tags: []
   }
   handleDelete = (e:any) => {
    if (this.props.isOwner){
      //Send request and get the response
      //Then demount the component
      this.props.groupHandler!.deleteGroup(this.props.groupEntity.id);
    }
   }
   handleMultiSelect = (e: any) =>{
      this.setState({
        checked: !this.state.checked
      });
     this.props.parent.addSelected(this);
   }
   componentDidMount(){
    const {groupEntity} = this.props;
    const { tags } = this.state;
    if (groupEntity.requests.count === 0){
      const newTag = new TagItem("#000", "#fff", "Nothing found!");
      tags.push(newTag);
    }else{
      let totalRequests = 0;
      let totalDoneRequests = 0;
        totalRequests = groupEntity.requests.count;
        let requestNum = undefined;
        groupEntity.requests.collection.map((request) => {

          let tagText = `${request.signer.name}: ${request.status}(${request.sentDate.toString()})`;
          let color = "#CDCDCD";
          if (request.status === RequestStatus.DONE){
            color = "#3CB371";
            totalDoneRequests += 1;
          }else{
            requestNum = request.id;
          }
          if (request.boxes.count !== 0){
            let signedBoxes = 0;
            request.boxes.collection.map((box) => {
              if (box.signedStatus === RequestStatus.SIGNED){
                signedBoxes += 1;
              }
            })
            tagText = `${request.signer.name}: ${signedBoxes}/${request.boxes.count} - ${request.status} (${request.sentDate.toString()})`
          }
          const newTag = new TagItem("#000", color, tagText);
          tags.push(newTag);
        })
      this.setState({
        progressBar: (totalDoneRequests / totalRequests) * 100,
        requestSign: requestNum
      })
    }
   }
   renderTags = (e:TagItem[]) =>{
    return e.map((tag, index) =>
      (<li key={index}>
        <span style={{color:tag.color, backgroundColor:tag.backgroundColor, display:"block",float:"left"}} className="badge badge-success ml">
          {tag.text}
        </span>
      </li>)
    );
  }
  render() {
    const { checked } = this.state;
    const { groupEntity, isOwner } = this.props;
      
    
    let iconCheck = faSquare; 
    if (checked){
      iconCheck = faCheckSquare;
    }
    let options = <>
    <Link to={Routes.REQUESTER._Edit.link(this.props.groupEntity.formId)}><button style={{color:'#222'}} className="btn-success action-btn"><FontAwesomeIcon icon={faPencilAlt} /></button></Link>
    <button style={{color:'#222'}} onClick={this.handleDelete} className="btn-danger action-btn"><FontAwesomeIcon icon={faTrashAlt} /></button>
    <button style={{color:'#222'}} onClick={this.handleMultiSelect} className="btn-primary action-btn"><FontAwesomeIcon icon={ iconCheck } /></button></>;
     if (!isOwner && this.state.requestSign){
       options = <><Link to={Routes.SIGNER._SignDocument.link(this.state.requestSign)}><button style={{color:'#222'}} className="btn-success action-btn"><FontAwesomeIcon icon={faPencilAlt} /></button></Link></>
     }
    return (
      <div style={{display: "inline-block"}} className="DashItem">
        <div className="activity-block">
        
        <div className="preview">
          <Image src={"../../../../../assets/v1/documents/" + groupEntity.form.filePath + ".png"} failedSrc={"https://assets.cdn.thewebconsole.com/ZWEB5519/product-item/591a517c5057d.jpg"}/>
        </div>
        <div className="activity-content header-item">
        <label className="ribbon right success"><span>{groupEntity.status}</span></label>
        <h5 style={{marginBottom:"0px"}} className="block-head">{groupEntity.title}</h5>
        <div className="content-left">

        <Tabs defaultActiveKey="1">
          <TabPane tab="Description" key="1">
            <span className="badge budge-success ml">Due: <Moment>{groupEntity.dueDate.toString()}</Moment></span><br/>
          {groupEntity.description}
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
