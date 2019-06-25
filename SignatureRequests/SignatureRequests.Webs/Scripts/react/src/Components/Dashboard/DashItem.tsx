import * as React from 'react';
import './DashItem.css';
import './bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons'
export interface IDashItemProps {
  
}
 
export interface IDashItemState {
    checked:boolean;
}
 
class DashItem extends React.Component<IDashItemProps, IDashItemState> {
   state:IDashItemState = {
     checked: false
   }
  
   handleMultiSelect = (e: any) =>{
      this.setState({
        checked: !this.state.checked
      });
   }
  render() {
    const { checked } = this.state;
    let iconCheck = faSquare;
    if (checked){
      iconCheck = faCheckSquare;
    }
    return (
      <div style={{display: "inline-block"}} className="DashItem">
        <div className="activity-block">
        
        <div className="preview">
            <img className="preview-doc" src="https://assets.cdn.thewebconsole.com/ZWEB5519/product-item/591a517c5057d.jpg" alt = "Preview"/>
        </div>
        <div className="activity-content header-item">
        <label className="ribbon right success "><span>Billing</span></label>
        <h5 className="block-head">Billing Order Section W5-0988</h5>
        <div className="content-left">
        <p className="description">This is awesome product and, I am very happy with delivery &amp; product packaging. Overall experience is good &amp; I prefer to buy it again from this portals and like more orders.</p>
        </div>
        <div className="content-right">
            <button style={{color:'#222'}} className="btn-success action-btn"><FontAwesomeIcon icon={faPencilAlt} /></button>
            <button style={{color:'#222'}} className="btn-danger action-btn"><FontAwesomeIcon icon={faTrashAlt} /></button>
            <button style={{color:'#222'}} onClick={this.handleMultiSelect} className="btn-primary action-btn"><FontAwesomeIcon icon={ iconCheck } /></button>
        </div>
        <ul className="tag-list">
            <li><span className="badge badge-success ml">Signed: 0/5</span></li>
            <li><span className="badge badge-warning ml">Signed: 0/5</span></li>
        </ul>
        </div>
        </div>
      </div>
    );
   
  }
}

export default DashItem;
