import React from "react";
import { Select, Table, Button } from 'antd';
import "antd/dist/antd.css";
import { IFormHandler, FormHandler} from "../../Handlers/FormHandler";
import UserEntity from "../../Entities/UserEntity";

const { Option } = Select;


export interface IImageProps {

}

export interface IImageState {
    
}



export default class ImageForm extends React.PureComponent<IImageProps, IImageState> {
 
  state: IImageState = {};
  async componentDidMount() {
    this.setState({
        
    });
  }

  
 

  render() {
    
      return (
        <>
        <img src='../../../../../../../591a517c5057d.jpg'></img>
          </>
      );
    
  }
}
